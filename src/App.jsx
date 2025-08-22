import React, { useState, useEffect, useRef } from "react";

// Simple QA database
const qaDatabase = {
  hi: "Hello! How can I help you today?",
  hello: "Hi there! 👋",
  "how are you": "I’m just code, but I’m doing great. How about you?",
  bye: "Goodbye! Have a nice day 😊",
  "who are you": "I am a chatbot created to assist you.",
  "what is react":
    "React is a JavaScript library for building user interfaces.",
  "what is javascript":
    "JavaScript is a programming language mainly used for web development.",
  "what is html": "HTML stands for HyperText Markup Language.",
  "what is css": "CSS stands for Cascading Style Sheets.",
  "capital of pakistan": "Islamabad is the capital of Pakistan.",
  "largest city of pakistan": "Karachi is the largest city of Pakistan.",
};

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const getBotResponse = (msg) => {
    const text = msg.toLowerCase().trim();
    return qaDatabase[text] || "Sorry, I don’t know about that. 🤔";
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const botMsg = { sender: "bot", text: getBotResponse(input) };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);

    setInput("");
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>💬 Chatbot Assistant</h2>
        <div style={styles.chatBox}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                background: msg.sender === "user" ? "#ff8c69" : "#add8e6",
                color: "black",
              }}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div style={styles.inputBox}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={styles.input}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "linear-gradient(135deg, pink, lightblue, orange)",
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    display: "flex",
    justifyContent: "center", // center horizontally
    alignItems: "center", // center vertically
  },
  container: {
    width: "500px", // rectangle width
    height: "600px", // rectangle height
    background: "white",
    borderRadius: "15px",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
    display: "flex",
    flexDirection: "column",
    padding: "15px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "10px",
    color: "deeppink", // heading color
    fontWeight: "bold",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    border: "2px solid #ffa500",
    borderRadius: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    backgroundColor: "#fefefe",
  },
  message: {
    padding: "10px 14px",
    borderRadius: "15px",
    maxWidth: "70%",
    fontSize: "14px",
  },
  inputBox: {
    display: "flex",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    marginLeft: "5px",
    padding: "8px 12px",
    background: "#ff8c69",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};
