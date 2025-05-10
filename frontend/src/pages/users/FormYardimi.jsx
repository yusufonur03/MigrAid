import React, { useState } from "react";
import Navigation from "../../components/Navigation";

function UserFormYardimi() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formType, setFormType] = useState(""); // Optional: for more specific form help

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

      const payload = {
        prompt: inputPrompt,
        // language: 'en' // Optional
      };
      if (formType.trim()) {
        payload.formType = formType.trim();
      }

      const apiResponse = await fetch("/api/form-fill", {
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
      console.error("Error fetching form assistance:", err);
      setError(`Sorry, I couldn't fetch form assistance: ${err.message}`);
      setResponse("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navigation />
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>Form Doldurma Yardımı</h1>
        <p style={{ textAlign: "center", marginBottom: "10px" }}>
          Get help with filling out official forms in Türkiye. Ask step-by-step questions.
        </p>
        <input
          type="text"
          value={formType}
          onChange={(e) => setFormType(e.target.value)}
          placeholder="Optional: Specify form type (e.g., Residence Permit Application)"
          disabled={isLoading}
          style={{
            width: "calc(100% - 22px)",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
          }}
        />
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Describe the form you need help with or ask a specific question..."
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
            {isLoading ? "Getting Help..." : "Get Assistance"}
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

export default UserFormYardimi;
