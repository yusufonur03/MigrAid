import React, { useState, useRef, useEffect } from "react";
import Navigation from "../../components/Navigation";

function UserFormYardimi() {
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Scroll to bottom of chat whenever conversation updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFileSelection(selectedFile);
  };

  const handleFileSelection = (selectedFile) => {
    setFileError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    // Check if file is PDF
    if (selectedFile.type !== "application/pdf") {
      setFileError("Lütfen sadece PDF dosyası yükleyin.");
      setFile(null);
      return;
    }

    // Check file size (limit to 10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFileError("Dosya boyutu 10MB'dan küçük olmalıdır.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setFileError("Lütfen bir PDF dosyası seçin.");
      return;
    }

    setIsUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("file", file);

      // Retrieve Firebase ID token from localStorage
      const firebaseIdToken = localStorage.getItem("firebaseIdToken");

      const headers = {};

      if (firebaseIdToken) {
        headers["Authorization"] = `Bearer ${firebaseIdToken}`;
      } else {
        console.warn("Firebase ID token not found in localStorage. API calls may fail if authentication is required.");
      }

      // Upload file to backend
      const response = await fetch("/api/form-fill/upload", {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `API error: ${response.status}`);
      }

      if (data.success && data.sessionId) {
        setSessionId(data.sessionId);

        // Add the first message from AI
        if (data.initialMessage) {
          setConversation([
            {
              role: "assistant",
              content: data.initialMessage,
            },
          ]);
        } else {
          // Default initial message if not provided
          setConversation([
            {
              role: "assistant",
              content: "Resmi belgeniz başarıyla yüklendi. Bu belge hakkında ne öğrenmek istiyorsunuz?",
            },
          ]);
        }

        // Clear file after successful upload
        setFile(null);
        fileInputRef.current.value = "";
      } else {
        throw new Error("PDF dosyası yüklenemedi. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("Error uploading PDF:", err);
      setFileError(`PDF yüklenemedi: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || !sessionId) return;

    // Add user message to conversation
    const updatedConversation = [...conversation, { role: "user", content: userInput }];

    setConversation(updatedConversation);
    setIsLoading(true);
    setUserInput("");

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

      const apiResponse = await fetch("/api/form-fill/message", {
        method: "POST",
        headers,
        body: JSON.stringify({
          sessionId: sessionId,
          message: userInput,
        }),
      });

      const data = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(data.error || data.message || `API error: ${apiResponse.status}`);
      }

      if (data.success && data.response) {
        // Add AI response to conversation
        setConversation([...updatedConversation, { role: "assistant", content: data.response }]);
      } else {
        throw new Error(data.error || "Cevap alınamadı.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      // Add error message to conversation
      setConversation([
        ...updatedConversation,
        {
          role: "assistant",
          content: `Üzgünüm, bir hata oluştu: ${err.message}. Lütfen tekrar deneyin.`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Format message with proper styling (including handling markdown-style formatting)
  const formatMessage = (text) => {
    if (!text) return "";

    // Replace markdown-style bold text
    const boldPattern = /\*\*([^*]+)\*\*/g;
    const formattedText = text.replace(boldPattern, '<span style="font-weight: bold;">$1</span>');

    // Split the text into paragraphs
    const paragraphs = formattedText.split("\n\n");

    return paragraphs.map((paragraph, index) => (
      <p key={index} style={{ marginBottom: "10px" }} dangerouslySetInnerHTML={{ __html: paragraph }} />
    ));
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
        }}
      >
        <h1
          style={{
            textAlign: "center",
            margin: "20px 0",
            fontSize: "32px",
            fontWeight: "600",
            color: "#2c3e50",
          }}
        >
          Resmi Belge Yardımı
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "18px",
            color: "#5d6778",
          }}
        >
          Resmi belgenizi (PDF formatında) yükleyin, akıllı asistanımız anlamanıza yardımcı olsun.
        </p>

        {!sessionId && (
          <div
            style={{
              marginBottom: "30px",
              borderRadius: "15px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                backgroundColor: "#3182ce",
                padding: "20px",
                color: "white",
                textAlign: "center",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "22px", color: "#ffffff" }}>Resmi Belgenizi Yükleyin</h2>
            </div>

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
              style={{
                padding: "50px 30px",
                backgroundColor: isDragging ? "#e3f2fd" : "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                border: `2px dashed ${isDragging ? "#1565c0" : "#90caf9"}`,
                borderTop: "none",
                borderRadius: "0 0 15px 15px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />

              <div style={{ marginBottom: "20px", textAlign: "center" }}>
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={isDragging ? "#1565c0" : "#90caf9"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>

              <p
                style={{
                  fontSize: "18px",
                  color: isDragging ? "#1565c0" : "#5d6778",
                  textAlign: "center",
                  margin: "0 0 10px 0",
                }}
              >
                {file ? file.name : "PDF belgesini sürükleyip bırakın veya tıklayın"}
              </p>

              <p
                style={{
                  fontSize: "14px",
                  color: "#90a4ae",
                  textAlign: "center",
                  margin: "0",
                }}
              >
                Sadece PDF formatı, en fazla 10MB
              </p>
            </div>

            {file && (
              <div
                style={{
                  backgroundColor: "white",
                  padding: "20px",
                  textAlign: "center",
                  borderTop: "1px solid #e0e0e0",
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the file input click
                    handleUpload();
                  }}
                  disabled={isUploading}
                  style={{
                    padding: "12px 30px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600",
                    boxShadow: "0 4px 6px rgba(40, 167, 69, 0.2)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {isUploading ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div className="spinner" style={{ marginRight: "10px" }}></div>
                      Yükleniyor...
                    </div>
                  ) : (
                    "Yükle ve Belgeyi Analiz Et"
                  )}
                </button>
              </div>
            )}

            {fileError && (
              <div
                style={{
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  padding: "15px",
                  borderRadius: "0 0 15px 15px",
                  borderTop: "1px solid #f5c6cb",
                  textAlign: "center",
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
                  style={{ marginRight: "8px", verticalAlign: "middle" }}
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {fileError}
              </div>
            )}
          </div>
        )}

        {sessionId && (
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: "#3182ce",
                padding: "15px 20px",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
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
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#ffffff" }}>Resmi Belge Asistanı</h2>
            </div>

            <div
              ref={chatContainerRef}
              style={{
                height: "500px",
                overflowY: "auto",
                padding: "20px",
                backgroundColor: "#f5f7fa",
              }}
            >
              {conversation.map((message, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: "20px",
                    textAlign: message.role === "user" ? "right" : "left",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "12px 18px",
                      borderRadius: "18px",
                      maxWidth: "75%",
                      backgroundColor: message.role === "user" ? "#3182ce" : "white",
                      color: message.role === "user" ? "white" : "#333",
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                      position: "relative",
                    }}
                  >
                    <div style={{ textAlign: "left" }}>{formatMessage(message.content)}</div>
                  </div>
                </div>
              ))}

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
                      backgroundColor: "white",
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
            </div>

            <div
              style={{
                display: "flex",
                padding: "15px",
                borderTop: "1px solid #e0e0e0",
                backgroundColor: "white",
              }}
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Belge hakkında sorunuzu yazın..."
                disabled={isLoading}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
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
                disabled={isLoading || !userInput.trim()}
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  border: "none",
                  backgroundColor: "#3182ce",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 10px rgba(0, 123, 255, 0.3)",
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
        )}
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

        .spinner {
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top: 3px solid white;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
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

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default UserFormYardimi;
