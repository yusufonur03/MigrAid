import React, { useState } from "react";
import Navigation from "../../components/Navigation";

function UserKulturelRehber() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitPrompt = async () => {
    if (!inputPrompt.trim()) return;

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
          prompt: inputPrompt,
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

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>Türk Kültürü Rehberi</h1>
        <p style={{ textAlign: "center", marginBottom: "10px" }}>
          Learn about Turkish culture, social norms, traditions, and language.
        </p>
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask about Turkish traditions, holidays, social customs, expressions..."
            disabled={isLoading}
            rows="3"
            style={{
              flexGrow: 1,
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginRight: "10px",
              resize: "vertical",
            }}
          />
          <button
            onClick={handleSubmitPrompt}
            disabled={isLoading}
            style={{
              padding: "10px 15px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              alignSelf: "flex-end",
            }}
          >
            {isLoading ? "Loading..." : "Get Information"}
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
              padding: "15px",
              border: "1px solid #eee",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              whiteSpace: "pre-wrap",
            }}
          >
            <h3>Response:</h3>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserKulturelRehber;
