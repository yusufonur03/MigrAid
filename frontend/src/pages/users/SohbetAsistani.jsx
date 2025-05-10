import React, { useState, useEffect, useRef } from "react";
import Navigation from "../../components/Navigation";

function UserSohbetAsistani() {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const storedHistory = localStorage.getItem("sohbetAsistaniHistory");
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sohbetAsistaniHistory", JSON.stringify(chatHistory));
  }, [chatHistory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: "user", parts: [{ text: inputMessage }] };
    const currentHistoryForApi = [...chatHistory, userMessage];

    setChatHistory((prevHistory) => [...prevHistory, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    const assistantPlaceholder = { role: "assistant", parts: [{ text: "" }] };
    setChatHistory((prevHistory) => [...prevHistory, assistantPlaceholder]);

    try {
      // Example: Retrieve Firebase ID token from localStorage.
      // Ensure your login process stores the token under this key.
      const firebaseIdToken = localStorage.getItem("firebaseIdToken");

      const headers = {
        "Content-Type": "application/json",
      };

      if (firebaseIdToken) {
        headers["Authorization"] = `Bearer ${firebaseIdToken}`;
      } else {
        // Handle cases where the token is not available, e.g., redirect to login or show an error.
        // For this example, we'll proceed without it, which will likely result in a 401 if the token is required.
        console.warn("Firebase ID token not found in localStorage. API calls may fail if authentication is required.");
      }

      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          prompt: inputMessage,
          history: currentHistoryForApi.slice(-10).map((msg) => ({
            role: msg.role,
            parts: msg.parts.map((part) => ({ text: part.text })),
          })),
        }),
      });

      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = `API error: ${response.status}: ${
            errorData.error || errorData.message || response.statusText
          }`;
        } catch (e) {
          errorMessage = `API error: ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("Response body is null or undefined");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantResponseText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const jsonData = line.substring("data: ".length);
            if (jsonData.trim() === "[DONE]") {
              break;
            }

            try {
              const parsed = JSON.parse(jsonData);
              if (parsed.chunk) {
                assistantResponseText += parsed.chunk;
                setChatHistory((prevHistory) => {
                  const newHistory = [...prevHistory];
                  newHistory[newHistory.length - 1] = { role: "assistant", parts: [{ text: assistantResponseText }] };
                  return newHistory;
                });
              } else if (parsed.error) {
                console.error("Streaming error from backend:", parsed.error);
                const errorMsg = `Error: ${parsed.error}`;
                setChatHistory((prevHistory) => {
                  const newHistory = [...prevHistory];
                  newHistory[newHistory.length - 1] = {
                    role: "assistant",
                    parts: [{ text: assistantResponseText + errorMsg }],
                  };
                  return newHistory;
                });
                return;
              }
            } catch (e) {
              console.warn("Failed to parse JSON chunk:", jsonData, e);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessageText = `Sorry, I couldn't connect: ${error.message}`;
      setChatHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        if (
          newHistory.length > 0 &&
          newHistory[newHistory.length - 1].role === "assistant" &&
          newHistory[newHistory.length - 1].parts[0].text === ""
        ) {
          newHistory[newHistory.length - 1] = { role: "assistant", parts: [{ text: errorMessageText }] };
        } else {
          newHistory.push({ role: "assistant", parts: [{ text: errorMessageText }] });
        }
        return newHistory;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatHistory([]);
    localStorage.removeItem("sohbetAsistaniHistory");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navigation />
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Sohbet Asistanı</h1>
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "20px",
          border: "1px solid #ccc",
          margin: "0 20px 20px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#d1eaff" : "#f1f1f1",
              padding: "10px 15px",
              borderRadius: "10px",
              margin: "5px 0",
              maxWidth: "70%",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <strong>{msg.role === "user" ? "You" : "Assistant"}:</strong> {msg.parts[0].text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={{ display: "flex", padding: "20px", borderTop: "1px solid #ccc" }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
          placeholder="Type your message..."
          disabled={isLoading}
          style={{ flexGrow: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc", marginRight: "10px" }}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
        <button
          onClick={handleClearChat}
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#dc3545",
            color: "white",
            cursor: "pointer",
            marginLeft: "10px",
          }}
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
}

export default UserSohbetAsistani;
