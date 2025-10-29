
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function UploadPage() {
//   const [file, setFile] = useState(null);
//   const [uploadedFile, setUploadedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedFile = localStorage.getItem("uploadedFile");
//     if (savedFile) setUploadedFile(savedFile);
//   }, []);

//   const handleFileUpload = async () => {
//     if (!file) return alert("Please select a file first");

//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch("http://localhost:5000/api/upload", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();

//       if (res.ok) {
//         setUploadedFile(data.path);
//         localStorage.setItem("uploadedFile", data.path);
//         alert("✅ File uploaded successfully!");
//       } else {
//         alert("❌ Upload failed: " + data.error);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Upload error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearFile = () => {
//     setUploadedFile(null);
//     localStorage.removeItem("uploadedFile");
//     alert("🗑 File cleared. You can upload a new file now.");
//   };

//   return (
//     <div className="upload-page">
//       <div className="upload-container">
//         <h2>📁 Upload Your Document</h2>

//         <div className="upload-section">
//           <input
//             type="file"
//             id="fileInput"
//             onChange={(e) => setFile(e.target.files[0])}
//             style={{ display: "none" }}
//           />
//           <label htmlFor="fileInput" className="file-btn">
//             {file ? file.name : "Choose File"}
//           </label>

//           <button
//             onClick={handleFileUpload}
//             disabled={loading || !file}
//             className="btn upload-btn"
//           >
//             {loading ? "Uploading..." : "Upload"}
//           </button>
//         </div>

//         {uploadedFile && (
//           <div className="uploaded-file">
//             <p>
//               ✅ File stored at: <code>{uploadedFile}</code>
//             </p>
//             <div className="actions">
//               <div
//                 className="action-card extractor"
//                 onClick={() =>
//                   navigate("/text-extractor", { state: { file: uploadedFile } })
//                 }
//               >
//                 📄 Text Extractor
//               </div>

//               <div
//                 className="action-card qa"
//                 onClick={() => navigate("/qa", { state: { file: uploadedFile } })}
//               >
//                 🤖 Question & Answer
//               </div>

//               <div className="action-card clear" onClick={handleClearFile}>
//                 🗑 Clear File
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <style>{`
//         body {
//           background: linear-gradient(135deg, #e6d6f0, #d4c1f4, #f0e6fc) !important;
//           min-height: 100vh;
//           margin: 0;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }

//         .upload-page {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 20px;
//         }

//         /* Upload card as black */
//         .upload-container {
//           max-width: 800px;
//           width: 100%;
//           padding: 2rem;
//           background: #121212;
//           backdrop-filter: blur(12px);
//           border-radius: 20px;
//           color: #f0f0f0;
//           box-shadow: 0 20px 40px rgba(0,0,0,0.3);
//           text-align: center;
//         }

//         h2 {
//           font-size: 2rem;
//           margin-bottom: 2rem;
//           color: #ffffff;
//           text-shadow: 0 0 8px #00000099;
//         }

//         .upload-section {
//           display: flex;
//           flex-direction: column;
//           gap: 1.2rem;
//           align-items: center;
//         }

//         /* Buttons remain lavender */
//         .file-btn {
//           padding: 12px 20px;
//           background: linear-gradient(135deg, #c7b2f0, #e6d6fc);
//           border-radius: 14px;
//           cursor: pointer;
//           font-weight: 700;
//           color: #3a2d5c;
//           transition: transform 0.25s ease, box-shadow 0.3s ease;
//           width: 220px;
//           text-align: center;
//         }
//         .file-btn:hover {
//           transform: scale(1.06);
//           box-shadow: 0 12px 30px rgba(120, 80, 200, 0.3);
//         }

//         .btn.upload-btn {
//           padding: 12px 24px;
//           border-radius: 14px;
//           border: none;
//           background: #9f7aea;
//           color: white;
//           font-weight: 700;
//           cursor: pointer;
//           transition: transform 0.25s ease, background 0.3s ease;
//           box-shadow: 0 6px 18px rgba(159, 122, 234, 0.6);
//           width: 220px;
//         }
//         .btn.upload-btn:disabled {
//           opacity: 0.55;
//           cursor: not-allowed;
//           box-shadow: none;
//         }
//         .btn.upload-btn:hover:not(:disabled) {
//           background: #7b5ac0;
//           transform: scale(1.07);
//           box-shadow: 0 12px 30px rgba(123, 90, 192, 0.75);
//         }

//         .uploaded-file {
//           margin-top: 2.5rem;
//           background: rgba(30,30,30,0.8);
//           backdrop-filter: blur(12px);
//           padding: 1.8rem 2rem;
//           border-radius: 14px;
//           box-shadow: 0 6px 22px rgba(0,0,0,0.2);
//           color: #ffffff;
//         }

//         code {
//           background: #333333;
//           padding: 3px 8px;
//           border-radius: 6px;
//           font-family: 'Consolas', monospace;
//           word-break: break-word;
//         }

//         .actions {
//           display: flex;
//           gap: 1rem;
//           flex-wrap: wrap;
//           justify-content: center;
//           margin-top: 1.8rem;
//         }

//         .action-card {
//           flex: 1 1 160px;
//           min-width: 160px;
//           padding: 1.6rem 1.8rem;
//           border-radius: 14px;
//           font-weight: 700;
//           cursor: pointer;
//           color: white;
//           box-shadow: 0 8px 26px rgba(0,0,0,0.3);
//           transition: transform 0.25s ease, box-shadow 0.3s ease;
//           text-align: center;
//           user-select: none;
//         }
//         .action-card.extractor {
//           background-image: linear-gradient(135deg, #4cd1be, #17b978);
//         }
//         .action-card.qa {
//           background-image: linear-gradient(135deg, #ed64a6, #d53f8c);
//         }
//         .action-card.clear {
//           background-image: linear-gradient(135deg, #f6ad55, #d69e2e);
//         }
//         .action-card:hover {
//           transform: scale(1.06);
//           box-shadow: 0 12px 40px rgba(0,0,0,0.5);
//         }

//         @media (max-width: 680px) {
//           .upload-section {
//             flex-direction: column;
//           }
//           .action-card {
//             flex: 1 1 100%;
//           }
//           .btn.upload-btn,
//           .file-btn {
//             width: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [recentFiles, setRecentFiles] = useState([]); // 🆕 Store recent uploads
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFile = localStorage.getItem("uploadedFile");
    if (savedFile) setUploadedFile(savedFile);

    const storedRecent = JSON.parse(localStorage.getItem("recentUploads")) || [];
    setRecentFiles(storedRecent);
  }, []);

  const handleFileUpload = async () => {
    if (!file) return alert("Please select a file first");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        setUploadedFile(data.path);
        localStorage.setItem("uploadedFile", data.path);

        // 🆕 Add file name to recent uploads
        const updatedFiles = [
          { name: file.name, path: data.path, date: new Date().toLocaleString() },
          ...recentFiles.filter((f) => f.name !== file.name), // avoid duplicates
        ].slice(0, 5); // keep last 5 uploads

        setRecentFiles(updatedFiles);
        localStorage.setItem("recentUploads", JSON.stringify(updatedFiles));

        alert("✅ File uploaded successfully!");
      } else {
        alert("❌ Upload failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Upload error");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFile = () => {
    setUploadedFile(null);
    localStorage.removeItem("uploadedFile");
    alert("🗑 File cleared. You can upload a new file now.");
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h2>📁 Upload Your Document</h2>

        <div className="upload-section">
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <label htmlFor="fileInput" className="file-btn">
            {file ? file.name : "Choose File"}
          </label>

          <button
            onClick={handleFileUpload}
            disabled={loading || !file}
            className="btn upload-btn"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </div>

        {uploadedFile && (
          <div className="uploaded-file">
            <p>
              ✅ File stored at: <code>{uploadedFile}</code>
            </p>
            <div className="actions">
              <div
                className="action-card extractor"
                onClick={() =>
                  navigate("/text-extractor", { state: { file: uploadedFile } })
                }
              >
                📄 Text Extractor
              </div>

              <div
                className="action-card qa"
                onClick={() => navigate("/qa", { state: { file: uploadedFile } })}
              >
                🤖 Question & Answer
              </div>

              <div className="action-card clear" onClick={handleClearFile}>
                🗑 Clear File
              </div>
            </div>
          </div>
        )}

        {/* 🆕 Recent Uploads Section */}
        {recentFiles.length > 0 && (
          <div className="recent-uploads">
            <h3>🕒 Recent Uploads</h3>
            <div className="recent-list">
              {recentFiles.map((f, i) => (
                <div key={i} className="recent-item">
                  <div className="file-info">
                    <span className="file-name">{f.name}</span>
                    <span className="file-date">{f.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        body {
          background: linear-gradient(135deg, #e6d6f0, #d4c1f4, #f0e6fc) !important;
          min-height: 100vh;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .upload-page {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .upload-container {
          max-width: 850px;
          width: 100%;
          padding: 2rem;
          background: #121212;
          border-radius: 20px;
          color: #f0f0f0;
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
          text-align: center;
        }

        h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #ffffff;
          text-shadow: 0 0 8px #00000099;
        }

        .upload-section {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          align-items: center;
        }

        .file-btn {
          padding: 12px 20px;
          background: linear-gradient(135deg, #c7b2f0, #e6d6fc);
          border-radius: 14px;
          cursor: pointer;
          font-weight: 700;
          color: #3a2d5c;
          transition: transform 0.25s ease, box-shadow 0.3s ease;
          width: 220px;
          text-align: center;
        }
        .file-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 12px 30px rgba(120, 80, 200, 0.3);
        }

        .btn.upload-btn {
          padding: 12px 24px;
          border-radius: 14px;
          border: none;
          background: #9f7aea;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.25s ease, background 0.3s ease;
          box-shadow: 0 6px 18px rgba(159, 122, 234, 0.6);
          width: 220px;
        }
        .btn.upload-btn:disabled {
          opacity: 0.55;
          cursor: not-allowed;
          box-shadow: none;
        }
        .btn.upload-btn:hover:not(:disabled) {
          background: #7b5ac0;
          transform: scale(1.07);
          box-shadow: 0 12px 30px rgba(123, 90, 192, 0.75);
        }

        .uploaded-file {
          margin-top: 2.5rem;
          background: rgba(30,30,30,0.8);
          backdrop-filter: blur(12px);
          padding: 1.8rem 2rem;
          border-radius: 14px;
          box-shadow: 0 6px 22px rgba(0,0,0,0.2);
        }

        code {
          background: #333333;
          padding: 3px 8px;
          border-radius: 6px;
          font-family: 'Consolas', monospace;
        }

        .actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 1.8rem;
        }

        .action-card {
          flex: 1 1 160px;
          min-width: 160px;
          padding: 1.6rem 1.8rem;
          border-radius: 14px;
          font-weight: 700;
          cursor: pointer;
          color: white;
          box-shadow: 0 8px 26px rgba(0,0,0,0.3);
          transition: transform 0.25s ease, box-shadow 0.3s ease;
          text-align: center;
        }

        .action-card.extractor {
          background-image: linear-gradient(135deg, #4cd1be, #17b978);
        }
        .action-card.qa {
          background-image: linear-gradient(135deg, #ed64a6, #d53f8c);
        }
        .action-card.clear {
          background-image: linear-gradient(135deg, #f6ad55, #d69e2e);
        }
        .action-card:hover {
          transform: scale(1.06);
          box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        }

        /* 🆕 Recent Uploads Styling */
        .recent-uploads {
          margin-top: 3rem;
          background: rgba(40, 40, 40, 0.9);
          padding: 1.5rem 2rem;
          border-radius: 16px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.3);
          color: #f0f0f0;
          text-align: left;
        }

        .recent-uploads h3 {
          text-align: center;
          color: #d8b4fe;
          margin-bottom: 1.2rem;
        }

        .recent-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .recent-item {
          background: #1f1f1f;
          padding: 0.8rem 1rem;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.25s ease, box-shadow 0.3s ease;
        }
        .recent-item:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }

        .file-name {
          font-weight: 600;
          color: #c7b2f0;
        }
        .file-date {
          font-size: 0.85rem;
          color: #aaa;
        }

        @media (max-width: 680px) {
          .action-card {
            flex: 1 1 100%;
          }
          .btn.upload-btn, .file-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
