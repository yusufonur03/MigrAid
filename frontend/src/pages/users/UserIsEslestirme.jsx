import React, { useState } from "react";
import Navigation from "../../components/Navigation";

function UserIsEslestirme() {
  const [inputPrompt, setInputPrompt] = useState("");
  const [skills, setSkills] = useState(""); // Optional
  const [experience, setExperience] = useState(""); // Optional
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

      const payload = {
        prompt: inputPrompt,
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
      setError(`Sorry, I couldn't fetch job matching information: ${err.message}`);
      setResponse("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navigation showAuthButtons={false} />
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto", width: "100%" }}>
        <h1 style={{ textAlign: "center", margin: "20px 0" }}>Beceriye Göre İş Eşleştirme</h1>
        <p style={{ textAlign: "center", marginBottom: "10px" }}>
          Match your qualifications and experience with suitable job opportunities in Türkiye.
        </p>
        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Optional: List your key skills (e.g., programming, languages, crafts)"
          disabled={isLoading}
          rows="2"
          style={{
            width: "calc(100% - 22px)",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            resize: "vertical",
          }}
        />
        <textarea
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          placeholder="Optional: Briefly describe your relevant work experience"
          disabled={isLoading}
          rows="2"
          style={{
            width: "calc(100% - 22px)",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            resize: "vertical",
          }}
        />
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Describe your ideal job or ask for career path suggestions..."
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
            {isLoading ? "Matching..." : "Find Jobs"}
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

export default UserIsEslestirme;
