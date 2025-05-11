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

  // Manual scroll function for button
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Format message with better styling
  const formatMessage = (text) => {
    if (!text) return "";

    // Replace markdown-style bold text
    const boldPattern = /\*\*(.*?)\*\*/g;
    const formattedText = text.replace(boldPattern, '<span style="font-weight: bold; color: #e74c3c;">$1</span>');

    // Split the text into paragraphs
    const paragraphs = formattedText.split("\n\n");

    return paragraphs.map((paragraph, index) => (
      <p
        key={index}
        style={{ fontSize: "16px", lineHeight: "1.5", marginBottom: "10px" }}
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
    ));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Navigation showAuthButtons={false} />

      <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        <h1
          style={{
            textAlign: "center",
            margin: "20px 0",
            fontSize: "32px",
            fontWeight: "600",
            color: "#2c3e50",
          }}
        >
          Sohbet Asistanı
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "18px",
            color: "#5d6778",
          }}
        >
          Size yardımcı olmak için buradayım. Ne konuda yardıma ihtiyacınız var?
        </p>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "550px",
          }}
        >
          <div
            style={{
              backgroundColor: "#2d4d76",
              padding: "15px 20px",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: "10px" }}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#ffffff" }}>Yapay Zeka Asistanı</h2>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={scrollToBottom}
                style={{
                  backgroundColor: "#1e3a5f",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "5px" }}
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
                Aşağı Kaydır
              </button>
              <button
                onClick={handleClearChat}
                style={{
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "6px 12px",
                  fontSize: "14px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginRight: "5px" }}
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
                Konuşmayı Temizle
              </button>
            </div>
          </div>

          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              padding: "20px",
              backgroundColor: "#ffffff",
            }}
          >
            {chatHistory.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  color: "#94a3b8",
                }}
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginBottom: "20px", opacity: "0.5" }}
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
                <p style={{ fontSize: "18px" }}>Sohbete başlamak için bir mesaj gönderin</p>
              </div>
            ) : (
              chatHistory.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "20px",
                    textAlign: msg.role === "user" ? "right" : "left",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "12px 18px",
                      borderRadius: "18px",
                      maxWidth: "75%",
                      backgroundColor: msg.role === "user" ? "#2d4d76" : "#f1f5f9",
                      color: msg.role === "user" ? "white" : "#333",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      position: "relative",
                    }}
                  >
                    <div style={{ textAlign: "left" }}>{formatMessage(msg.parts[0].text)}</div>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div
                style={{
                  textAlign: "left",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "15px 20px",
                    borderRadius: "18px",
                    backgroundColor: "#f1f5f9",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div
            style={{
              display: "flex",
              padding: "15px",
              borderTop: "1px solid #e0e0e0",
              backgroundColor: "#fff",
            }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Mesajınızı buraya yazın..."
              disabled={isLoading}
              onKeyPress={(e) => e.key === "Enter" && !isLoading && handleSendMessage()}
              style={{
                flexGrow: 1,
                padding: "15px",
                borderRadius: "30px",
                border: "1px solid #e0e0e0",
                fontSize: "16px",
                backgroundColor: "#ffffff",
                marginRight: "10px",
                outline: "none",
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: "#2d4d76",
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 10px rgba(45, 77, 118, 0.3)",
                transition: "all 0.2s ease",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .typing-indicator {
          display: flex;
          align-items: center;
        }

        .typing-indicator span {
          height: 8px;
          width: 8px;
          margin: 0 2px;
          background-color: #bbb;
          border-radius: 50%;
          display: inline-block;
          animation: pulse 1.5s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes pulse {
          0%,
          50%,
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
          25% {
            transform: scale(1.5);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default UserSohbetAsistani;
