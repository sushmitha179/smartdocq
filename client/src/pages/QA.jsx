
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";

// export default function QA() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { file } = location.state || {};
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [speaking, setSpeaking] = useState(false);
//   const [listening, setListening] = useState(false);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const [conversationId] = useState(uuidv4()); // unique conversation per session

//   if (!file) return <p>No file provided!</p>;

//   // --- Ask Question ---
//   const askQuestion = async () => {
//     if (!question.trim()) return alert("⚠ Please ask a question first");
//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/qa/answer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           filePath: file,
//           query: question,
//           email: user?.email,
//           conversationId,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) setAnswer(data.answer);
//       else alert("❌ Q&A failed: " + data.error);
//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error asking question");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Copy Answer ---
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(answer);
//     alert("✅ Answer copied!");
//   };

//   // --- Read Aloud ---
//   const handleReadAloud = () => {
//     if (!answer) return;
//     if (speaking) {
//       window.speechSynthesis.cancel();
//       setSpeaking(false);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(answer);
//       utterance.onend = () => setSpeaking(false);
//       window.speechSynthesis.speak(utterance);
//       setSpeaking(true);
//     }
//   };

//   // --- Download Answer ---
//   const downloadAnswer = () => {
//     const blob = new Blob([answer], { type: "text/plain" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "answer.txt";
//     a.click();
//   };

//   // --- Voice Input ---
//   const handleVoiceInput = () => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       return alert("⚠ Your browser does not support voice recognition");
//     }
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);
//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript;
//       setQuestion(transcript);
//     };

//     recognition.start();
//   };

//   // --- Clear Fields ---
//   const clearQA = () => {
//     setQuestion("");
//     setAnswer("");
//   };

//   return (
//     <div className="qa-page">
//       <div className="qa-container">
//         <h2>🤖 Question & Answer</h2>

//         <textarea
//           placeholder="Type your question here..."
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//         />

//         <div className="btn-group">
//           <button onClick={askQuestion} disabled={loading} className="lav-btn">
//             {loading ? "Thinking..." : "Ask"}
//           </button>

//           <button
//             onClick={handleVoiceInput}
//             className={`lav-btn ${listening ? "listening" : ""}`}
//           >
//             {listening ? "🎙 Listening..." : "🎙 Ask by Voice"}
//           </button>

//           <button onClick={clearQA} className="lav-btn danger">
//             Clear
//           </button>

//           <button onClick={() => navigate("/upload")} className="lav-btn back">
//             ⬅ Back
//           </button>

//           <button
//             onClick={() => navigate("/qa/recent", { state: { file } })}
//             className="lav-btn recent"
//           >
//             🕘 Recent
//           </button>
//         </div>

//         {answer && (
//           <div className="answer-card">
//             <strong>💡 Answer:</strong>
//             <p>{answer}</p>
//             <div className="btn-group">
//               <button onClick={copyToClipboard} className="lav-btn copy">
//                 📋 Copy
//               </button>
//               <button
//                 onClick={handleReadAloud}
//                 className={`lav-btn ${speaking ? "speaking" : ""}`}
//               >
//                 {speaking ? "⏹ Stop Reading" : "🎧 Read Aloud"}
//               </button>
//               <button onClick={downloadAnswer} className="lav-btn download">
//                 ⬇ Download
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       <style>{`
//         body {
//           background: linear-gradient(135deg, #e6d6f0, #d4c1f4, #f0e6fc) !important;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           margin: 0;
//         }

//         .qa-page {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 20px;
//         }

//         .qa-container {
//           max-width: 800px;
//           width: 100%;
//           padding: 2rem;
//           background: #121212;
//           border-radius: 20px;
//           color: #f0f0f0;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.3);
//           text-align: center;
//         }

//         h2 {
//           font-size: 2rem;
//           margin-bottom: 1.5rem;
//           color: #ffffff;
//           text-shadow: 0 0 8px #00000099;
//         }

//         textarea {
//           width: 100%;
//           height: 100px;
//           border-radius: 12px;
//           border: none;
//           padding: 1rem;
//           background: #1e1e1e;
//           color: #fff;
//           font-size: 1rem;
//           outline: none;
//           resize: none;
//         }

//         .btn-group {
//           margin-top: 1.5rem;
//           display: flex;
//           flex-wrap: wrap;
//           gap: 12px;
//           justify-content: center;
//         }

//         .lav-btn {
//           background: linear-gradient(135deg, #c7b2f0, #e6d6fc);
//           color: #3a2d5c;
//           padding: 12px 20px;
//           border: none;
//           border-radius: 14px;
//           cursor: pointer;
//           font-weight: 700;
//           transition: all 0.25s ease;
//           box-shadow: 0 6px 18px rgba(159, 122, 234, 0.6);
//           min-width: 140px;
//         }

//         .lav-btn:hover {
//           transform: scale(1.06);
//           box-shadow: 0 12px 30px rgba(123, 90, 192, 0.75);
//         }

//         .lav-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .lav-btn.danger {
//           background: linear-gradient(135deg, #f56565, #c53030);
//           color: white;
//         }

//         .lav-btn.back {
//           background: linear-gradient(135deg, #63b3ed, #3182ce);
//           color: white;
//         }

//         .lav-btn.recent {
//           background: linear-gradient(135deg, #718096, #4a5568);
//           color: white;
//         }

//         .lav-btn.copy {
//           background: linear-gradient(135deg, #f6ad55, #d69e2e);
//           color: white;
//         }

//         .lav-btn.download {
//           background: linear-gradient(135deg, #63b3ed, #3182ce);
//           color: white;
//         }

//         .lav-btn.speaking {
//           background: linear-gradient(135deg, #f56565, #c5302c);
//           color: white;
//         }

//         .lav-btn.listening {
//           background: linear-gradient(135deg, #e53e3e, #9b2c2c);
//           color: white;
//         }

//         .answer-card {
//           margin-top: 2rem;
//           padding: 1.5rem;
//           background: rgba(30, 30, 30, 0.85);
//           border-radius: 14px;
//           box-shadow: 0 8px 30px rgba(0,0,0,0.4);
//           text-align: left;
//         }

//         .answer-card p {
//           white-space: pre-wrap;
//           margin-top: 0.8rem;
//           color: #f1f1f1;
//         }

//         @media (max-width: 680px) {
//           .lav-btn {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
// import React, { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// export default function QA() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { file } = location.state || {};
//   const [question, setQuestion] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [speaking, setSpeaking] = useState(false);
//   const [listening, setListening] = useState(false);
//   const chatEndRef = useRef(null);

//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!file) return <p>No file provided!</p>;

//   // --- Ask Question ---
//   const askQuestion = async () => {
//     if (!question.trim()) return alert("⚠ Please ask a question first");

//     const userMessage = { type: "user", text: question };
//     setMessages((prev) => [...prev, userMessage]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/qa/answer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ filePath: file, query: question, email: user?.email }),
//       });

//       const data = await res.json();
//       const aiMessage = { type: "ai", text: data.answer || "No answer found." };
//       setMessages((prev) => [...prev, aiMessage]);
//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error asking question");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Copy Answer ---
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("✅ Copied to clipboard!");
//   };

//   // --- Read Aloud ---
//   const handleReadAloud = (text) => {
//     if (!text) return;
//     if (speaking) {
//       window.speechSynthesis.cancel();
//       setSpeaking(false);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.onend = () => setSpeaking(false);
//       window.speechSynthesis.speak(utterance);
//       setSpeaking(true);
//     }
//   };

//   // --- Download Answer ---
//   const downloadAnswer = (text) => {
//     const blob = new Blob([text], { type: "text/plain" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "answer.txt";
//     a.click();
//   };

//   // --- Voice Input ---
//   const handleVoiceInput = () => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       return alert("⚠ Your browser does not support voice recognition");
//     }
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);
//     recognition.onresult = (event) => setQuestion(event.results[0][0].transcript);

//     recognition.start();
//   };

//   // --- Clear Chat ---
//   const clearChat = () => setMessages([]);

//   // --- Auto-scroll to bottom ---
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="qa-page">
//       <div className="qa-container">
//         <h2>🤖 SmartDocQ Chat</h2>

//         <div className="chat-box">
//           {messages.map((msg, idx) => (
//             <div key={idx} className={`chat-message ${msg.type}`}>
//               <p>{msg.text}</p>
//               {msg.type === "ai" && (
//                 <div className="msg-actions">
//                   <span
//                     onClick={() => copyToClipboard(msg.text)}
//                     title="Copy"
//                     className="emoji-action"
//                   >
//                     📋
//                   </span>
//                   <span
//                     onClick={() => handleReadAloud(msg.text)}
//                     title="Read Aloud"
//                     className="emoji-action"
//                   >
//                     🎧
//                   </span>
//                   <span
//                     onClick={() => downloadAnswer(msg.text)}
//                     title="Download"
//                     className="emoji-action"
//                   >
//                     ⬇
//                   </span>
//                 </div>
//               )}
//             </div>
//           ))}
//           <div ref={chatEndRef}></div>
//         </div>

//         <div className="input-group">
//           <textarea
//             placeholder="Type your question..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </div>

//         {/* ✅ All Buttons Together at Bottom */}
//         <div className="bottom-btns">
//           <button onClick={askQuestion} disabled={loading} className="lav-btn">
//             {loading ? "Thinking..." : "Ask"}
//           </button>

//           <button
//             onClick={handleVoiceInput}
//             className={`lav-btn ${listening ? "listening" : ""}`}
//           >
//             {listening ? "🎙 Listening..." : "🎙 Voice"}
//           </button>

//           <button onClick={clearChat} className="lav-btn danger">
//             Clear Chat
//           </button>

//           <button onClick={() => navigate("/upload")} className="lav-btn back">
//             ⬅ Back
//           </button>

//           <button
//             onClick={() => navigate("/qa/recent", { state: { file } })}
//             className="lav-btn recent"
//           >
//             🕘 Recent
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .qa-page {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 20px;
//           background: linear-gradient(135deg, #e6d6f0, #d4c1f4, #f0e6fc);
//           font-family: 'Segoe UI', sans-serif;
//         }

//         .qa-container {
//           max-width: 1500px;
//           width: 100%;
//           padding: 2rem;
//           min-height: 500px;
//           background: #121212;
//           border-radius: 20px;
//           color: #f0f0f0;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.3);
//           text-align: center;
//         }

//         h2 {
//           font-size: 2rem;
//           margin-bottom: 1.5rem;
//         }

//         .chat-box {
//           max-height: 400px;
//           overflow-y: auto;
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//           margin-bottom: 1rem;
//         }

//         .chat-message {
//           padding: 12px 16px;
//           border-radius: 16px;
//           max-width: 80%;
//           word-wrap: break-word;
//         }

//         .chat-message.user {
//           align-self: flex-end;
//           background: #5aa0ff;
//           color: #fff;
//         }

//         .chat-message.ai {
//           align-self: flex-start;
//           background: #1e1e1e;
//           color: #f0f0f0;
//         }

//         .msg-actions {
//           display: flex;
//           gap: 12px;
//           margin-top: 6px;
//         }

//         .emoji-action {
//           cursor: pointer;
//           font-size: 1.2rem;
//           transition: transform 0.2s;
//         }

//         .emoji-action:hover {
//           transform: scale(1.4);
//         }

//         textarea {
//           width: 100%;
//           height: 80px;
//           border-radius: 12px;
//           border: none;
//           padding: 1rem;
//           background: #1e1e1e;
//           color: #fff;
//           font-size: 1rem;
//           outline: none;
//           resize: none;
//         }

//         .input-group {
//           margin-bottom: 1rem;
//         }

//         /* ✅ Bottom Buttons - All together */
//         .bottom-btns {
//           margin-top: 1.5rem;
//           display: flex;
//           flex-wrap: wrap;
//           gap: 12px;
//           justify-content: center;
//           align-items: center;
//         }

//         .lav-btn {
//           background: linear-gradient(135deg, #c7b2f0, #e6d6fc);
//           color: #3a2d5c;
//           padding: 12px 20px;
//           border: none;
//           border-radius: 14px;
//           cursor: pointer;
//           font-weight: 700;
//           transition: all 0.25s ease;
//           box-shadow: 0 6px 18px rgba(159, 122, 234, 0.6);
//           min-width: 120px;
//         }

//         .lav-btn:hover {
//           transform: scale(1.06);
//           box-shadow: 0 12px 30px rgba(123, 90, 192, 0.75);
//         }

//         .lav-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .lav-btn.danger {
//           background: linear-gradient(135deg, #f56565, #c53030);
//           color: white;
//         }

//         .lav-btn.back {
//           background: linear-gradient(135deg, #63b3ed, #3182ce);
//           color: white;
//         }

//         .lav-btn.recent {
//           background: linear-gradient(135deg, #718096, #4a5568);
//           color: white;
//         }

//         .lav-btn.listening {
//           background: linear-gradient(135deg, #e53e3e, #9b2c2c);
//           color: white;
//         }

//         @media (max-width: 680px) {
//           .lav-btn {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
// import React, { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ReactMarkdown from "react-markdown"; // ✅ Markdown renderer

// export default function QA() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { file } = location.state || {};
//   const [question, setQuestion] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [speaking, setSpeaking] = useState(false);
//   const [listening, setListening] = useState(false);
//   const chatEndRef = useRef(null);

//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!file) return <p>No file provided!</p>;

//   // --- Ask Question ---
//   const askQuestion = async () => {
//     if (!question.trim()) return alert("⚠ Please ask a question first");

//     const userMessage = { type: "user", text: question };
//     setMessages((prev) => [...prev, userMessage]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/qa/answer", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           filePath: file,
//           query: question,
//           email: user?.email,
//         }),
//       });

//       const data = await res.json();
//       const aiMessage = {
//         type: "ai",
//         text: data.answer || "No answer found.",
//       };
//       setMessages((prev) => [...prev, aiMessage]);
//       setQuestion("");
//     } catch (err) {
//       console.error(err);
//       alert("❌ Error asking question");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // --- Copy Answer ---
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert("✅ Copied to clipboard!");
//   };

//   // --- Read Aloud ---
//   const handleReadAloud = (text) => {
//     if (!text) return;
//     if (speaking) {
//       window.speechSynthesis.cancel();
//       setSpeaking(false);
//     } else {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.onend = () => setSpeaking(false);
//       window.speechSynthesis.speak(utterance);
//       setSpeaking(true);
//     }
//   };

//   // --- Download Answer ---
//   const downloadAnswer = (text) => {
//     const blob = new Blob([text], { type: "text/plain" });
//     const a = document.createElement("a");
//     a.href = URL.createObjectURL(blob);
//     a.download = "answer.txt";
//     a.click();
//   };

//   // --- Voice Input ---
//   const handleVoiceInput = () => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       return alert("⚠ Your browser does not support voice recognition");
//     }
//     const SpeechRecognition =
//       window.SpeechRecognition || window.webkitSpeechRecognition;
//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.maxAlternatives = 1;

//     recognition.onstart = () => setListening(true);
//     recognition.onend = () => setListening(false);
//     recognition.onresult = (event) =>
//       setQuestion(event.results[0][0].transcript);

//     recognition.start();
//   };

//   // --- Clear Chat ---
//   const clearChat = () => setMessages([]);

//   // --- Auto-scroll to bottom ---
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="qa-page">
//       <div className="qa-container">
//         <h2>🤖 SmartDocQ Chat</h2>

//         <div className="chat-box">
//           {messages.map((msg, idx) => (
//             <div key={idx} className={`chat-message ${msg.type}`}>
//               {/* ✅ Markdown rendering instead of plain <p> */}
//               <ReactMarkdown className="markdown">{msg.text}</ReactMarkdown>

//               {msg.type === "ai" && (
//                 <div className="msg-actions">
//                   <span
//                     onClick={() => copyToClipboard(msg.text)}
//                     title="Copy"
//                     className="emoji-action"
//                   >
//                     📋
//                   </span>
//                   <span
//                     onClick={() => handleReadAloud(msg.text)}
//                     title="Read Aloud"
//                     className="emoji-action"
//                   >
//                     🎧
//                   </span>
//                   <span
//                     onClick={() => downloadAnswer(msg.text)}
//                     title="Download"
//                     className="emoji-action"
//                   >
//                     ⬇
//                   </span>
//                 </div>
//               )}
//             </div>
//           ))}
//           <div ref={chatEndRef}></div>
//         </div>

//         <div className="input-group">
//           <textarea
//             placeholder="Type your question..."
//             value={question}
//             onChange={(e) => setQuestion(e.target.value)}
//           />
//         </div>

//         {/* ✅ Bottom Buttons */}
//         <div className="bottom-btns">
//           <button onClick={askQuestion} disabled={loading} className="lav-btn">
//             {loading ? "Thinking..." : "Ask"}
//           </button>

//           <button
//             onClick={handleVoiceInput}
//             className={`lav-btn ${listening ? "listening" : ""}`}
//           >
//             {listening ? "🎙 Listening..." : "🎙 Voice"}
//           </button>

//           <button onClick={clearChat} className="lav-btn danger">
//             Clear Chat
//           </button>

//           <button onClick={() => navigate("/upload")} className="lav-btn back">
//             ⬅ Back
//           </button>

//           <button
//             onClick={() => navigate("/qa/recent", { state: { file } })}
//             className="lav-btn recent"
//           >
//             🕘 Recent
//           </button>
//         </div>
//       </div>

//       <style>{`
//         .qa-page {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 20px;
//           background: linear-gradient(135deg, #e6d6f0, #d4c1f4, #f0e6fc);
//           font-family: 'Segoe UI', sans-serif;
//         }

//         .qa-container {
//           max-width: 1500px;
//           width: 100%;
//           padding: 2rem;
//           min-height: 500px;
//           background: #121212;
//           border-radius: 20px;
//           color: #f0f0f0;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.3);
//           text-align: center;
//         }

//         h2 {
//           font-size: 2rem;
//           margin-bottom: 1.5rem;
//         }

//         .chat-box {
//           max-height: 400px;
//           overflow-y: auto;
//           display: flex;
//           flex-direction: column;
//           gap: 12px;
//           margin-bottom: 1rem;
//         }

//         .chat-message {
//           padding: 12px 16px;
//           border-radius: 16px;
//           max-width: 80%;
//           word-wrap: break-word;
//         }

//         .chat-message.user {
//           align-self: flex-end;
//           background: #5aa0ff;
//           color: #fff;
//         }

//         .chat-message.ai {
//           align-self: flex-start;
//           background: #1e1e1e;
//           color: #f0f0f0;
//         }

//         /* ✅ Markdown Styling */
//         .markdown {
//           text-align: left;
//           line-height: 1.6;
//         }

//         .markdown h2, .markdown h3 {
//           color: #c9a7ff;
//           margin-bottom: 6px;
//         }

//         .markdown ul {
//           margin-left: 1.2rem;
//           list-style-type: disc;
//         }

//         .markdown li {
//           margin-bottom: 4px;
//         }

//         .msg-actions {
//           display: flex;
//           gap: 12px;
//           margin-top: 6px;
//         }

//         .emoji-action {
//           cursor: pointer;
//           font-size: 1.2rem;
//           transition: transform 0.2s;
//         }

//         .emoji-action:hover {
//           transform: scale(1.4);
//         }

//         textarea {
//           width: 100%;
//           height: 80px;
//           border-radius: 12px;
//           border: none;
//           padding: 1rem;
//           background: #1e1e1e;
//           color: #fff;
//           font-size: 1rem;
//           outline: none;
//           resize: none;
//         }

//         .input-group {
//           margin-bottom: 1rem;
//         }

//         .bottom-btns {
//           margin-top: 1.5rem;
//           display: flex;
//           flex-wrap: wrap;
//           gap: 12px;
//           justify-content: center;
//           align-items: center;
//         }

//         .lav-btn {
//           background: linear-gradient(135deg, #c7b2f0, #e6d6fc);
//           color: #3a2d5c;
//           padding: 12px 20px;
//           border: none;
//           border-radius: 14px;
//           cursor: pointer;
//           font-weight: 700;
//           transition: all 0.25s ease;
//           box-shadow: 0 6px 18px rgba(159, 122, 234, 0.6);
//           min-width: 120px;
//         }

//         .lav-btn:hover {
//           transform: scale(1.06);
//           box-shadow: 0 12px 30px rgba(123, 90, 192, 0.75);
//         }

//         .lav-btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .lav-btn.danger {
//           background: linear-gradient(135deg, #f56565, #c53030);
//           color: white;
//         }

//         .lav-btn.back {
//           background: linear-gradient(135deg, #63b3ed, #3182ce);
//           color: white;
//         }

//         .lav-btn.recent {
//           background: linear-gradient(135deg, #718096, #4a5568);
//           color: white;
//         }

//         .lav-btn.listening {
//           background: linear-gradient(135deg, #e53e3e, #9b2c2c);
//           color: white;
//         }

//         @media (max-width: 680px) {
//           .lav-btn {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown"; // ✅ Markdown renderer

export default function QA() {
  const location = useLocation();
  const navigate = useNavigate();
  const { file } = location.state || {};
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const chatEndRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  if (!file) return <p>No file provided!</p>;

  // --- Ask Question ---
  const askQuestion = async () => {
    if (!question.trim()) return alert("⚠ Please ask a question first");

    const userMessage = { type: "user", text: question };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/qa/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filePath: file,
          query: question,
          email: user?.email,
        }),
      });

      const data = await res.json();
      const aiMessage = {
        type: "ai",
        text: data.answer || "No answer found.",
      };
      setMessages((prev) => [...prev, aiMessage]);
      setQuestion("");
    } catch (err) {
      console.error(err);
      alert("❌ Error asking question");
    } finally {
      setLoading(false);
    }
  };

  // --- Copy Answer ---
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("✅ Copied to clipboard!");
  };

  // --- Read Aloud ---
  const handleReadAloud = (text) => {
    if (!text) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    }
  };

  // --- Download Answer ---
  const downloadAnswer = (text) => {
    const blob = new Blob([text], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "answer.txt";
    a.click();
  };

  // --- Voice Input ---
  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      return alert("⚠ Your browser does not support voice recognition");
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) =>
      setQuestion(event.results[0][0].transcript);

    recognition.start();
  };

  // --- Clear Chat ---
  const clearChat = () => setMessages([]);

  // --- Auto-scroll to bottom ---
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="qa-page">
      <div className="qa-container">
        <h2>🤖 SmartDocQ Chat</h2>

        <div className="chat-box">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.type}`}>
              {/* ✅ Wrap Markdown in div instead of using className on ReactMarkdown */}
              <div className="markdown">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>

              {msg.type === "ai" && (
                <div className="msg-actions">
                  <span
                    onClick={() => copyToClipboard(msg.text)}
                    title="Copy"
                    className="emoji-action"
                  >
                    📋
                  </span>
                  <span
                    onClick={() => handleReadAloud(msg.text)}
                    title="Read Aloud"
                    className="emoji-action"
                  >
                    🎧
                  </span>
                  <span
                    onClick={() => downloadAnswer(msg.text)}
                    title="Download"
                    className="emoji-action"
                  >
                    ⬇
                  </span>
                </div>
              )}
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </div>

        <div className="input-group">
          <textarea
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        {/* ✅ Bottom Buttons */}
        <div className="bottom-btns">
          <button onClick={askQuestion} disabled={loading} className="lav-btn">
            {loading ? "Thinking..." : "Ask"}
          </button>

          <button
            onClick={handleVoiceInput}
            className={`lav-btn ${listening ? "listening" : ""}`}
          >
            {listening ? "🎙 Listening..." : "🎙 Voice"}
          </button>

          <button onClick={clearChat} className="lav-btn danger">
            Clear Chat
          </button>

          <button onClick={() => navigate("/upload")} className="lav-btn back">
            ⬅ Back
          </button>

          <button
            onClick={() => navigate("/qa/recent", { state: { file } })}
            className="lav-btn recent"
          >
            🕘 Recent
          </button>
        </div>
      </div>

      {/* --- Styles (same as before) --- */}
      <style>{`
        .qa-page { min-height: 100vh; display: flex; justify-content: center; align-items: center; padding: 20px; background: linear-gradient(135deg, #e6d6f0, #d4c1f4, #f0e6fc); font-family: 'Segoe UI', sans-serif; }
        .qa-container { max-width: 1500px; width: 100%; padding: 2rem; min-height: 500px; background: #121212; border-radius: 20px; color: #f0f0f0; box-shadow: 0 20px 40px rgba(0,0,0,0.3); text-align: center; }
        h2 { font-size: 2rem; margin-bottom: 1.5rem; }
        .chat-box { max-height: 400px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; margin-bottom: 1rem; }
        .chat-message { padding: 12px 16px; border-radius: 16px; max-width: 80%; word-wrap: break-word; }
        .chat-message.user { align-self: flex-end; background: #5aa0ff; color: #fff; }
        .chat-message.ai { align-self: flex-start; background: #1e1e1e; color: #f0f0f0; }
        .markdown { text-align: left; line-height: 1.6; }
        .markdown h2, .markdown h3 { color: #c9a7ff; margin-bottom: 6px; }
        .markdown ul { margin-left: 1.2rem; list-style-type: disc; }
        .markdown li { margin-bottom: 4px; }
        .msg-actions { display: flex; gap: 12px; margin-top: 6px; }
        .emoji-action { cursor: pointer; font-size: 1.2rem; transition: transform 0.2s; }
        .emoji-action:hover { transform: scale(1.4); }
        textarea { width: 100%; height: 80px; border-radius: 12px; border: none; padding: 1rem; background: #1e1e1e; color: #fff; font-size: 1rem; outline: none; resize: none; }
        .input-group { margin-bottom: 1rem; }
        .bottom-btns { margin-top: 1.5rem; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; align-items: center; }
        .lav-btn { background: linear-gradient(135deg, #c7b2f0, #e6d6fc); color: #3a2d5c; padding: 12px 20px; border: none; border-radius: 14px; cursor: pointer; font-weight: 700; transition: all 0.25s ease; box-shadow: 0 6px 18px rgba(159, 122, 234, 0.6); min-width: 120px; }
        .lav-btn:hover { transform: scale(1.06); box-shadow: 0 12px 30px rgba(123, 90, 192, 0.75); }
        .lav-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .lav-btn.danger { background: linear-gradient(135deg, #f56565, #c53030); color: white; }
        .lav-btn.back { background: linear-gradient(135deg, #63b3ed, #3182ce); color: white; }
        .lav-btn.recent { background: linear-gradient(135deg, #718096, #4a5568); color: white; }
        .lav-btn.listening { background: linear-gradient(135deg, #e53e3e, #9b2c2c); color: white; }
        @media (max-width: 680px) { .lav-btn { width: 100%; } }
      `}</style>
    </div>
  );
}
