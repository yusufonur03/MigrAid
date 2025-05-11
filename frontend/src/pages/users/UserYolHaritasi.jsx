import React, { useState } from "react";
import Navigation from "../../components/Navigation";

function UserYolHaritasi() {
  const [background, setBackground] = useState(""); // Optional
  const [goals, setGoals] = useState(""); // Optional
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitPrompt = async () => {
    // En az bir veri alanı dolu olmalı
    if (!background.trim() && !goals.trim()) {
      setError("Lütfen en az bir alanı doldurun.");
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
        prompt: "Türkiye'de yaşamaya uyum sağlamak için kişisel bir yol haritası oluştur.",
        // language: 'tr' // Optional
      };
      if (background.trim()) {
        payload.background = background.trim();
      }
      if (goals.trim()) {
        payload.goals = goals.trim();
      }

      const apiResponse = await fetch("/api/integration-roadmap", {
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
      console.error("Error fetching roadmap:", err);
      setError(`Üzgünüm, uyum yol haritanızı oluşturamadım: ${err.message}`);
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
              <h3 key={index} style={{ color: "#2b6cb0", marginTop: "15px", marginBottom: "8px", fontWeight: "600" }}>
                {line.replace(/^##\s*/, "")}
              </h3>
            );
          }

          // Handle subheaders (lines starting with ###)
          if (line.trim().startsWith("###")) {
            return (
              <h4 key={index} style={{ color: "#3182ce", marginTop: "12px", marginBottom: "5px" }}>
                {line.replace(/^###\s*/, "")}
              </h4>
            );
          }

          // Highlight keywords with colons (for example: "Adım 1:")
          const keywordMatch = line.match(/^([A-Za-zçğıöşüÇĞİÖŞÜ0-9\s]+):\s/);
          if (keywordMatch) {
            const keyword = keywordMatch[1];
            return (
              <p key={index} style={{ marginBottom: "5px" }}>
                <span style={{ color: "#2b6cb0", fontWeight: "bold" }}>{keyword}:</span>
                {line.substring(keyword.length + 1)}
              </p>
            );
          }

          // Handle bullet points (lines starting with -)
          if (line.trim().startsWith("-")) {
            return (
              <div key={index} style={{ marginLeft: "10px", marginBottom: "5px", display: "flex" }}>
                <span style={{ color: "#3182ce", marginRight: "8px" }}>•</span>
                <span>{line.replace(/^-\s*/, "")}</span>
              </div>
            );
          }

          // Handle bold text (**text**)
          const parts = [];
          let lastIndex = 0;
          let boldMatch;
          const boldRegex = /\*\*([^*]+)\*\*/g;

          while ((boldMatch = boldRegex.exec(line)) !== null) {
            // Add text before the bold part
            if (boldMatch.index > lastIndex) {
              parts.push(<span key={`${index}-${lastIndex}`}>{line.substring(lastIndex, boldMatch.index)}</span>);
            }

            // Add the bold part
            parts.push(
              <span key={`${index}-bold-${boldMatch.index}`} style={{ color: "#2b6cb0", fontWeight: "bold" }}>
                {boldMatch[1]}
              </span>
            );

            lastIndex = boldMatch.index + boldMatch[0].length;
          }

          // Add any remaining text
          if (lastIndex < line.length) {
            parts.push(<span key={`${index}-${lastIndex}`}>{line.substring(lastIndex)}</span>);
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

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f5f7fa" }}>
      <Navigation showAuthButtons={false} />

      <div
        style={{
          padding: "30px",
          maxWidth: "900px",
          margin: "30px auto",
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
          Kişisel Uyum Yol Haritası
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
            Türkiye'deki yeni hayatınız için adım adım rehber oluşturun ve kültürel uyum sürecinizi kolaylaştırın.
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
              Arka Planınız
            </label>
            <textarea
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              placeholder="Eğitiminiz, geldiğiniz ülke, konuştuğunuz diller, vs."
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
              Hedefleriniz
            </label>
            <textarea
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              placeholder="Türkiye'deki hedefleriniz neler? (kariyer, eğitim, yerleşim, vb.)"
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
            width: "100%",
            padding: "15px 30px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#3182ce",
            color: "white",
            cursor: isLoading ? "wait" : "pointer",
            fontWeight: "600",
            fontSize: "16px",
            transition: "background-color 0.3s",
            marginBottom: "25px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {isLoading ? <span>Aranıyor...</span> : <span>Kişisel Uyum Planımı Oluştur</span>}
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
            <div style={{ marginBottom: "15px" }}>Yol haritanız oluşturuluyor...</div>
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
                Kişisel Uyum Yol Haritanız
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
              <FormattedText text={response} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserYolHaritasi;
