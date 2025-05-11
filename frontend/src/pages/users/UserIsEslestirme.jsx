import React, { useState } from "react";
import Navigation from "../../components/Navigation";

function UserIsEslestirme() {
  const [skills, setSkills] = useState(""); // Optional
  const [experience, setExperience] = useState(""); // Optional
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitPrompt = async () => {
    // En az bir veri alanı dolu olmalı (skills veya experience)
    if (!skills.trim() && !experience.trim()) {
      setError("Lütfen en az becerilerinizi veya deneyiminizi girin.");
      return;
    }

    setIsLoading(true);
    setResponse("");
    setError("");

    try {
      // Retrieve Firebase ID token from localStorage
      const firebaseIdToken = localStorage.getItem("firebaseIdToken");

      const headers = {
        "Content-Type": "application/json",
      };

      if (firebaseIdToken) {
        headers["Authorization"] = `Bearer ${firebaseIdToken}`;
      } else {
        console.warn("Firebase ID token not found in localStorage. API calls may fail if authentication is required.");
      }

      const payload = {
        prompt: "Becerilerim ve deneyimlerime göre uygun iş önerileri ve firmalar öner.",
        // language: 'en' // Optional
      };
      if (skills.trim()) {
        payload.skills = skills.trim();
      }
      if (experience.trim()) {
        payload.experience = experience.trim();
      }

      const apiResponse = await fetch("/api/skill-match", {
        // Assuming backend is served on the same origin
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      const data = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(data.error || data.message || `API error: ${apiResponse.status}`);
      }

      if (data.success && data.response) {
        setResponse(data.response);
      } else {
        throw new Error(data.error || "Received an unexpected response from the server.");
      }
    } catch (err) {
      console.error("Error fetching job matching info:", err);
      setError(`Üzgünüm, iş eşleştirme bilgilerini alamadım: ${err.message}`);
      setResponse("");
    } finally {
      setIsLoading(false);
    }
  };

  // Custom component to render formatted text with styled elements
  const FormattedText = ({ text }) => {
    if (!text) return null;

    // Split the text by lines to handle different formatting per line
    const lines = text.split("\n");

    return (
      <div className="formatted-response">
        {lines.map((line, index) => {
          // Handle headers (lines starting with ##)
          if (line.trim().startsWith("##")) {
            return (
              <h3 key={index} style={{ color: "#e53e3e", marginTop: "15px", marginBottom: "8px" }}>
                {line.replace(/^##\s*/, "")}
              </h3>
            );
          }

          // Handle bold text and keywords
          let processedLine = line;

          // Highlight keywords with colons (for example: "Programlama:")
          const keywordMatch = line.match(/^([A-Za-zçğıöşüÇĞİÖŞÜ]+):\s/);
          if (keywordMatch) {
            const keyword = keywordMatch[1];
            return (
              <p key={index} style={{ marginBottom: "5px" }}>
                <span style={{ color: "#e53e3e", fontWeight: "bold" }}>{keyword}:</span>
                {line.substring(keyword.length + 1)}
              </p>
            );
          }

          // Handle bullet points (lines starting with -)
          if (line.trim().startsWith("-")) {
            return (
              <div key={index} style={{ marginLeft: "10px", marginBottom: "5px", display: "flex" }}>
                <span style={{ color: "#e53e3e", marginRight: "8px" }}>•</span>
                <span>{line.replace(/^-\s*/, "")}</span>
              </div>
            );
          }

          // Handle bold text (**text**)
          const parts = [];
          let lastIndex = 0;
          let boldMatch;
          const boldRegex = /\*\*([^*]+)\*\*/g;

          while ((boldMatch = boldRegex.exec(processedLine)) !== null) {
            // Add text before the bold part
            if (boldMatch.index > lastIndex) {
              parts.push(
                <span key={`${index}-${lastIndex}`}>{processedLine.substring(lastIndex, boldMatch.index)}</span>
              );
            }

            // Add the bold part
            parts.push(
              <span key={`${index}-bold-${boldMatch.index}`} style={{ color: "#e53e3e", fontWeight: "bold" }}>
                {boldMatch[1]}
              </span>
            );

            lastIndex = boldMatch.index + boldMatch[0].length;
          }

          // Add any remaining text
          if (lastIndex < processedLine.length) {
            parts.push(<span key={`${index}-${lastIndex}`}>{processedLine.substring(lastIndex)}</span>);
          }

          // If we found bold parts, return them, otherwise return the line as is
          return parts.length > 0 ? (
            <p key={index} style={{ marginBottom: "5px" }}>
              {parts}
            </p>
          ) : (
            <p key={index} style={{ marginBottom: "5px" }}>
              {line}
            </p>
          );
        })}
      </div>
    );
  };

  // Function to render the response with better formatting
  const renderFormattedResponse = () => {
    if (!response) return null;

    // Try to detect if there are job suggestions and companies in the response
    const sections = response.split(/(?=##)/); // Split by markdown headers

    return sections.map((section, index) => {
      // Check if this section might be about companies
      const isCompanySection =
        section.toLowerCase().includes("company") ||
        section.toLowerCase().includes("şirket") ||
        section.toLowerCase().includes("firma");

      return (
        <div
          key={index}
          className={isCompanySection ? "company-section" : "job-section"}
          style={{
            marginBottom: "15px",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: isCompanySection ? "#f0f8ff" : "#f9f9f9",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            border: `1px solid ${isCompanySection ? "#d1e3fa" : "#eee"}`,
          }}
        >
          <FormattedText text={section} />
        </div>
      );
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <Navigation showAuthButtons={false} />
      <div
        style={{
          padding: "30px",
          maxWidth: "900px",
          margin: "0 auto",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: "10px 0 25px",
            color: "#2e3b55",
            fontSize: "2.2rem",
          }}
        >
          Beceriye Göre İş Eşleştirme
        </h1>

        <div
          style={{
            backgroundColor: "#e9f7fe",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "25px",
            borderLeft: "4px solid #3498db",
          }}
        >
          <p style={{ textAlign: "center", margin: 0, color: "#2c3e50" }}>
            Nitelikleriniz ve deneyiminiz ile Türkiye'deki uygun iş fırsatları ve firmaları eşleştirin.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginBottom: "25px",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#4a5568",
              }}
            >
              Becerileriniz
            </label>
            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="Anahtar becerilerinizi listeleyin (örn. programlama, diller, zanaat)"
              disabled={isLoading}
              rows="3"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                marginBottom: "10px",
                resize: "vertical",
                fontFamily: "inherit",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
                backgroundColor: "#f8fafc",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "500",
                color: "#4a5568",
              }}
            >
              Deneyiminiz
            </label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="İlgili iş deneyiminizi kısaca açıklayın"
              disabled={isLoading}
              rows="3"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                marginBottom: "10px",
                resize: "vertical",
                fontFamily: "inherit",
                boxSizing: "border-box",
                transition: "border-color 0.3s",
                backgroundColor: "#f8fafc",
              }}
            />
          </div>
        </div>

        <button
          onClick={handleSubmitPrompt}
          disabled={isLoading}
          style={{
            padding: "15px 30px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#3182ce",
            color: "white",
            cursor: isLoading ? "wait" : "pointer",
            fontWeight: "600",
            transition: "background-color 0.3s",
            fontSize: "16px",
            width: "100%",
            marginBottom: "25px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isLoading ? <span>Aranıyor...</span> : <span>Becerilerinize Göre İş Eşleştirme Yap</span>}
        </button>

        {error && (
          <div
            style={{
              backgroundColor: "#fff5f5",
              color: "#c53030",
              padding: "12px 15px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #fed7d7",
            }}
          >
            {error}
          </div>
        )}

        {isLoading && (
          <div
            style={{
              textAlign: "center",
              padding: "30px",
              backgroundColor: "#f7fafc",
              borderRadius: "8px",
              color: "#4a5568",
            }}
          >
            <div style={{ marginBottom: "15px" }}>Mükemmel iş eşleşmeleri ve firma önerileri aranıyor...</div>
            <div
              style={{
                display: "inline-block",
                width: "50px",
                height: "50px",
                border: "5px solid rgba(0, 0, 0, 0.1)",
                borderTopColor: "#3182ce",
                borderRadius: "50%",
                animation: "spin 1s ease-in-out infinite",
              }}
            />
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        )}

        {response && !isLoading && (
          <div
            style={{
              marginTop: "20px",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "#ebf8ff",
                padding: "15px 20px",
                borderBottom: "1px solid #bee3f8",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            >
              <h3
                style={{
                  margin: "0",
                  color: "#2b6cb0",
                  fontSize: "1.25rem",
                }}
              >
                Kariyer Fırsatlarınız
              </h3>
            </div>
            <div
              style={{
                padding: "20px",
                backgroundColor: "#f7fafc",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)",
                whiteSpace: "pre-wrap",
                lineHeight: "1.6",
              }}
            >
              {renderFormattedResponse()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserIsEslestirme;
