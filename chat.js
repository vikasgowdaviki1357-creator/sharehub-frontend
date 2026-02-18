const BASE_URL = "https://sharehub-backend-lm98.onrender.com";
// Get DOM elements safely
const chatBox = document.getElementById("chatMessages");
const chatInput = document.getElementById("chatText");

// 🚨 If chat page is not open, STOP script
if (!chatBox || !chatInput) {
  console.warn("Chat elements not found. Script stopped safely.");
} else {

  // TEMP users (later linked to auth)
  const currentUser =
    JSON.parse(localStorage.getItem("currentUser"))?.email ||
    "junior@student.com";

  const otherUser = "senior@student.com";

  let chats = JSON.parse(localStorage.getItem("chatMessages")) || [];

  // Load chat
  function loadChat() {
    chatBox.innerHTML = "";

    chats
      .filter(
        c =>
          (c.from === currentUser && c.to === otherUser) ||
          (c.from === otherUser && c.to === currentUser)
      )
      .forEach(c => {
        const div = document.createElement("div");
        div.className =
          c.from === currentUser ? "chat-msg me" : "chat-msg other";

        div.innerHTML = `
          <p>${c.text}</p>
          <span>${c.time}</span>
        `;

        chatBox.appendChild(div);
      });

    chatBox.scrollTop = chatBox.scrollHeight;
  }

  loadChat();

  // Send message
  window.sendMessage = function () {
    const text = chatInput.value.trim();
    if (!text) return;

    chats.push({
      from: currentUser,
      to: otherUser,
      text,
      time: new Date().toLocaleTimeString()
    });

    localStorage.setItem("chatMessages", JSON.stringify(chats));
    chatInput.value = "";
    loadChat();
  };
  const el = document.getElementById("something");
if (!el) return;
const user =
  JSON.parse(localStorage.getItem("currentUser")) || {};

console.log("Logged in as:", user.role);


}

