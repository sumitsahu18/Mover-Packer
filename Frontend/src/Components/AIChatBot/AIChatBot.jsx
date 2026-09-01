import { useState } from "react";
import axios from "axios";
import "./AIChatBot.css";

function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = {
      sender: "user",
      text: message,
    };

    setMessages((prev) => [...prev, userMsg]);

    try {
      const response = await axios.post(
        "https://mover-packer-1.onrender.com/api/ai/chat",
        {
          message,
        }
      );

      const botMsg = {
        sender: "bot",
        text: response.data.reply,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.log(err);
    }

    setMessage("");
  };

  return (
    <>
      <div
        className="chatbotIcon"
        onClick={() => setOpen(!open)}
      >
        💡
      </div>

      {open && (
        <div className="chatbotContainer">
          <div className="chatHeader">
            <h3>AI Assistant</h3>

            <span onClick={() => setOpen(false)}>
              ✖
            </span>
          </div>

          <div className="chatBody">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user"
                    ? "userMessage"
                    : "botMessage"
                }
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatFooter">
            <input
              type="text"
              placeholder="Ask anything..."
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
            />

            <button onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChatBot;