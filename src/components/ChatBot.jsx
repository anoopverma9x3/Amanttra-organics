import React, { useState } from "react";
import "./ChatBot.css";
import products from "../data/products";
import { useCart } from "../context/CartContext";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart();

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Namaste 🌿 Main Ammanttra AI hoon. Aap Moringa, wellness, skin ya health ke baare me pooch sakte hain."
    }
  ]);

  const quickQuestions = [
    "Moringa powder ka kya benefit hai?",
    "Skin glow ke liye kya useful hai?",
    "Energy ke liye kya best hai?"
  ];

  // Product recommendation logic
  const getRecommendedProducts = (text) => {
    const lower = text.toLowerCase();
    let recommended = [];

    const moringa = products.find((p) =>
      p.name.toLowerCase().includes("moringa")
    );
    const carrot = products.find((p) =>
      p.name.toLowerCase().includes("carrot")
    );
    const beetroot = products.find((p) =>
      p.name.toLowerCase().includes("beetroot")
    );

    if (lower.includes("energy") || lower.includes("moringa")) {
      if (moringa) recommended.push(moringa);
    }

    if (
      lower.includes("skin") ||
      lower.includes("glow") ||
      lower.includes("carrot")
    ) {
      if (carrot) recommended.push(carrot);
    }

    if (
      lower.includes("blood") ||
      lower.includes("beetroot") ||
      lower.includes("hemoglobin")
    ) {
      if (beetroot) recommended.push(beetroot);
    }

    return recommended.filter(Boolean);
  };

  const sendMessage = async (customMessage = null) => {
    const finalMessage = customMessage || message;

    if (!finalMessage.trim()) return;

    const userMsg = { sender: "user", text: finalMessage };
    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ message: finalMessage })
});
      const data = await res.json();

      const recommended = getRecommendedProducts(
        (data.reply || "") + " " + finalMessage
      );

      const aiMsg = {
        sender: "ai",
        text: data.reply || "AI se reply nahi mila.",
        products: recommended
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("Chatbot Error:", error);

      const errorMsg = {
        sender: "ai",
        text: "Backend se connect nahi ho pa raha 😢"
      };

      setMessages((prev) => [...prev, errorMsg]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button className="chatbot-toggle" onClick={() => setOpen(!open)}>
        🌿
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div>
              <h3>Ammanttra AI 🌿</h3>
              <p>Your Organic Wellness Assistant</p>
            </div>

            <button className="chatbot-close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index}>
                <div
                  className={`chat-row ${
                    msg.sender === "user" ? "user-row" : "ai-row"
                  }`}
                >
                  <div className={`chat-bubble ${msg.sender}`}>
                    {msg.text}
                  </div>
                </div>

                {/* Product Recommendations */}
                {msg.products && msg.products.length > 0 && (
                  <div className="chat-products">
                    {msg.products.map((p, i) => (
                      <div key={i} className="chat-product-card">
                        <img src={p.image} alt={p.name} />
                        <h4>{p.name}</h4>
                        <p>₹{p.price}</p>
                        <button onClick={() => addToCart(p)}>
                          Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="chat-row ai-row">
                <div className="chat-bubble ai typing-bubble">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            {messages.length <= 1 && !loading && (
              <div className="quick-questions">
                <p>Quick questions</p>
                {quickQuestions.map((q, i) => (
                  <button key={i} onClick={() => sendMessage(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              type="text"
              placeholder="Ask your question..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button onClick={() => sendMessage()}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;