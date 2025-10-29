
import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SettingsContext } from "../context/SettingsContext";

export default function NeumorphicProfileMixedBg() {
  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const [name, setName] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { darkMode, language } = useContext(SettingsContext); // Added language
  const bgRef = useRef(null);

  // Translation texts
  const translations = {
    English: {
      profile: "👤 Your Profile",
      fullName: "Full Name",
      email: "Email Address",
      anonymous: "Anonymous",
      noEmail: "No email provided",
      edit: "✏ Edit Profile",
      save: "💾 Save Changes",
      viewHistory: "🕘 View History",
      feedback: "📝 Give Feedback",
      logout: "🚪 Logout",
      nameEmailRequired: "⚠ Name and email are required",
      updated: "✅ Profile updated successfully!",
    },
    Hindi: {
      profile: "👤 आपका प्रोफ़ाइल",
      fullName: "पूरा नाम",
      email: "ईमेल पता",
      anonymous: "अज्ञात",
      noEmail: "कोई ईमेल नहीं",
      edit: "✏ प्रोफ़ाइल संपादित करें",
      save: "💾 परिवर्तन सहेजें",
      viewHistory: "🕘 इतिहास देखें",
      feedback: "📝 प्रतिक्रिया दें",
      logout: "🚪 लॉग आउट",
      nameEmailRequired: "⚠ नाम और ईमेल आवश्यक हैं",
      updated: "✅ प्रोफ़ाइल सफलतापूर्वक अपडेट हुई!",
    },
    Telugu: {
      profile: "👤 మీ ప్రొఫైల్",
      fullName: "పూర్తి పేరు",
      email: "ఈమెయిల్ చిరునామా",
      anonymous: "అజ్ఞాతుడు",
      noEmail: "ఇమెయిల్ అందుబాటులో లేదు",
      edit: "✏ ప్రొఫైల్ సవరించండి",
      save: "💾 మార్పులను సేవ్ చేయండి",
      viewHistory: "🕘 చరిత్ర చూడండి",
      feedback: "📝 అభిప్రాయం ఇవ్వండి",
      logout: "🚪 లాగ్ అవుట్",
      nameEmailRequired: "⚠ పేరు మరియు ఇమెయిల్ అవసరం",
      updated: "✅ ప్రొఫైల్ విజయవంతంగా అప్డేట్ అయింది!",
    },
  };

  const t = translations[language] || translations.English;

  // Mouse movement for background
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (bgRef.current) {
        const { width, height } = bgRef.current.getBoundingClientRect();
        const xPos = (e.clientX / width - 0.5) * 20;
        const yPos = (e.clientY / height - 0.5) * 20;
        bgRef.current.style.backgroundPosition = `calc(50% + ${xPos}px) calc(50% + ${yPos}px)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Clear messages after 2.2s
  useEffect(() => {
    if (message) {
      const tmr = setTimeout(() => setMessage(""), 2200);
      return () => clearTimeout(tmr);
    }
  }, [message]);

  // Save profile
  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      setMessage(t.nameEmailRequired);
      return;
    }
    localStorage.setItem("user", JSON.stringify({ ...userData, name, email }));
    setMessage(t.updated);
    setEditing(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Animated background */}
      <div
        ref={bgRef}
        style={{
          position: "fixed",
          inset: 0,
          background: "linear-gradient(135deg, #B497BD 20%, #A3E0D9 60%, #FFC39E 90%)",
          backgroundSize: "250% 250%",
          animation: "gradientShift 25s ease infinite",
          zIndex: -1,
          transition: "background-position 0.4s ease",
        }}
      />

      <div style={styles.pageContainer}>
        <div style={styles.card(darkMode)}>
          <h1 style={styles.header(darkMode)}>{t.profile}</h1>

          <div style={styles.avatar}>
            {name.charAt(0).toUpperCase() || "U"}
          </div>

          <div style={styles.infoSection}>
            {editing ? (
              <>
                <input
                  style={styles.input(darkMode)}
                  type="text"
                  placeholder={t.fullName}
                  maxLength={30}
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  style={{ ...styles.input(darkMode), marginTop: 12 }}
                  type="email"
                  placeholder={t.email}
                  maxLength={40}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </>
            ) : (
              <>
                <p style={styles.nameDisplay(darkMode)}>{name || t.anonymous}</p>
                <p style={styles.emailDisplay(darkMode)}>{email || t.noEmail}</p>
              </>
            )}
          </div>

          {message && (
            <div style={message.startsWith("✅") ? styles.messageSuccess : styles.messageWarning}>
              {message}
            </div>
          )}

          <div style={styles.buttonRow}>
            {editing ? (
              <button style={styles.buttonSave} onClick={handleSave}>
                {t.save}
              </button>
            ) : (
              <button style={styles.buttonEdit} onClick={() => setEditing(true)}>
                {t.edit}
              </button>
            )}
            <button style={styles.button} onClick={() => navigate("/history")}>
              {t.viewHistory}
            </button>
            <button style={styles.button} onClick={() => navigate("/feedback")}>
              {t.feedback}
            </button>
            <button style={styles.buttonLogout} onClick={handleLogout}>
              {t.logout}
            </button>
          </div>
        </div>

        <style>{`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </>
  );
}

// ------------------- Styles -------------------
const styles = {
  pageContainer: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
    position: "relative",
    zIndex: 1,
  },
  card: (dark) => ({
    width: 360,
    padding: 28,
    borderRadius: 24,
    background: dark ? "#2a2d36cc" : "rgba(255, 255, 255, 0.88)",
    boxShadow: dark
      ? "8px 8px 20px #1a1d23, -8px -8px 20px #393f4d"
      : "8px 8px 20px #b6bcc9, -8px -8px 20px #ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
  }),
  header: (dark) => ({
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 22,
    color: dark ? "#d7dbe5" : "#3e3e3e",
  }),
  avatar: {
    width: 108,
    height: 108,
    borderRadius: "50%",
    background: "#cfd8dc",
    boxShadow: "inset 8px 8px 15px #a6aeb1, inset -8px -8px 15px #ffffff",
    fontSize: 48,
    fontWeight: "700",
    color: "#616161",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    marginBottom: 24,
  },
  infoSection: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  input: (dark) => ({
    width: "100%",
    padding: 14,
    borderRadius: 16,
    border: "none",
    fontSize: 16,
    background: dark ? "#343a44" : "#f1f3f6",
    boxShadow: dark
      ? "inset 7px 7px 15px #2a2e34, inset -7px -7px 15px #3d424b"
      : "inset 7px 7px 15px #d7dade, inset -7px -7px 15px #ffffff",
    color: dark ? "#e1e4e8" : "#4a4a4a",
    outline: "none",
  }),
  nameDisplay: (dark) => ({
    fontSize: 20,
    fontWeight: 600,
    color: dark ? "#d7dbe5" : "#3e3e3e",
    margin: 0,
  }),
  emailDisplay: (dark) => ({
    fontSize: 14,
    color: dark ? "#9aa0a6" : "#606060",
    margin: 0,
  }),
  messageSuccess: {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: 10,
    borderRadius: 16,
    fontWeight: 600,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 18,
  },
  messageWarning: {
    backgroundColor: "#fff3cd",
    color: "#856404",
    padding: 10,
    borderRadius: 16,
    fontWeight: 600,
    fontSize: 14,
    textAlign: "center",
    marginBottom: 18,
  },
  buttonRow: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    width: "100%",
  },
  button: {
    backgroundColor: "#90a4ae",
    borderRadius: 18,
    border: "none",
    padding: "14px 0",
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    cursor: "pointer",
    boxShadow: "6px 6px 12px #8a8a8a, -6px -6px 12px #b4b4b4",
    transition: "transform 0.2s",
  },
  buttonEdit: {
    backgroundColor: "#72bcd4",
    borderRadius: 18,
    border: "none",
    padding: "14px 0",
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "6px 6px 12px #4d8ca0, -6px -6px 12px #9dd0f1",
    transition: "transform 0.2s",
  },
  buttonSave: {
    backgroundColor: "#43a047",
    borderRadius: 18,
    border: "none",
    padding: "14px 0",
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "6px 6px 12px #2f6f30, -6px -6px 12px #5dc467",
    transition: "transform 0.2s",
  },
  buttonLogout: {
    backgroundColor: "#d32f2f",
    borderRadius: 18,
    border: "none",
    padding: "14px 0",
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "6px 6px 12px #911b1b, -6px -6px 12px #de4d4d",
    transition: "transform 0.2s",
  },
};
