import React, { useState } from "react";
import Navigation from "../../components/Navigation";

function UserKulturelRehber() {
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitPrompt = async (customPrompt) => {
    if (!customPrompt) return;

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

      const apiResponse = await fetch("/api/cultural-info", {
        // Assuming backend is served on the same origin
        method: "POST",
        headers,
        body: JSON.stringify({
          prompt: customPrompt,
          // language: 'en' // Optional
        }),
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
      console.error("Error fetching cultural information:", err);
      setError(`Sorry, I couldn't fetch the cultural information: ${err.message}`);
      setResponse("");
    } finally {
      setIsLoading(false);
    }
  };

  const getRandomTurkishInfo = () => {
    const randomPrompt =
      "Türkiye hakkında rastgele bir bilgi, atasözü, deyim açıklaması veya Türk kültürü, geleneği ile ilgili ilginç bir bilgi paylaşır mısın?";
    handleSubmitPrompt(randomPrompt);
  };

  // Format the response text to properly render markdown-style formatting
  const formatResponseText = (text) => {
    if (!text) return "";

    // Replace markdown-style bold text (**text**) with HTML spans
    const boldPattern = /\*\*(.*?)\*\*/g;
    const formattedText = text.replace(boldPattern, '<span style="font-weight: bold; color: #e74c3c;">$1</span>');

    // Split the text into paragraphs
    const paragraphs = formattedText.split("\n\n");

    return paragraphs.map((paragraph, index) => (
      <p
        key={index}
        style={{ fontSize: "18px", lineHeight: "1.7", marginBottom: "15px" }}
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
    ));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navigation showAuthButtons={false} />
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>Türk Kültürü Rehberi</h1>
        <p style={{ textAlign: "center", marginBottom: "20px" }}>
          Learn about Turkish culture, social norms, traditions, and language.
        </p>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
          <button
            onClick={getRandomTurkishInfo}
            disabled={isLoading}
            style={{
              padding: "15px 25px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#e74c3c",
              color: "white",
              cursor: "pointer",
              fontSize: "18px",
              fontWeight: "bold",
              boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
            }}
          >
            {isLoading ? "Yükleniyor..." : "Rastgele Türk Kültürü Bilgisi Öğren"}
          </button>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "20px",
              border: "1px solid #f5c6cb",
            }}
          >
            {error}
          </div>
        )}

        {response && (
          <div
            style={{
              marginTop: "20px",
              padding: "25px",
              border: "1px solid #eee",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
              whiteSpace: "pre-wrap",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              minHeight: "300px",
            }}
          >
            <h3 style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}>Türk Kültürü Bilgisi</h3>
            <div>{formatResponseText(response)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserKulturelRehber;
