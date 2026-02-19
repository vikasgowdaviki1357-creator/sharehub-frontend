const BASE_URL = "https://sharehub-backend-7sd0.onrender.com";
/* ========== CHAT MESSAGES ========== */
const chatBox = document.getElementById("chatAdmin");
if (chatBox) {
  const chats = JSON.parse(localStorage.getItem("chatMessages")) || [];

  if (chats.length === 0) {
    chatBox.innerHTML = "<p>No chat messages found.</p>";
  } else {
    chats.forEach(c => {
      const div = document.createElement("div");
      div.className = "feature-card";
      div.innerHTML = `
        <p><strong>From:</strong> ${c.from || "N/A"}</p>
        <p><strong>To:</strong> ${c.to || "N/A"}</p>
        <p>${c.text || ""}</p>
        <small>${c.time || ""}</small>
      `;
      chatBox.appendChild(div);
    });
  }
}

/* ========== SWIFT MESSAGES ========== */
const swiftBox = document.getElementById("swiftAdmin");
if (swiftBox) {
  const swiftMessages = JSON.parse(localStorage.getItem("swiftMessages")) || [];

  if (swiftMessages.length === 0) {
    swiftBox.innerHTML = "<p>No Swift messages.</p>";
  } else {
    swiftMessages.forEach(s => {
      const div = document.createElement("div");
      div.className = "feature-card";
      div.innerHTML = `
        <p><strong>Type:</strong> ${s.type || ""}</p>
        <p><strong>Message:</strong> ${s.message || ""}</p>
        <p><strong>Reply:</strong> ${s.reply || "No reply yet"}</p>
        <small>${s.time || ""}</small>
      `;
      swiftBox.appendChild(div);
    });
  }
}

/* ========== UPLOADED ITEMS ========== */
const itemBox = document.getElementById("itemsAdmin");
if (itemBox) {
  const items = JSON.parse(localStorage.getItem("items")) || [];

  if (items.length === 0) {
    itemBox.innerHTML = "<p>No items uploaded.</p>";
  } else {
    items.forEach(i => {
      const div = document.createElement("div");
      div.className = "feature-card";
      div.innerHTML = `
        <p><strong>Name:</strong> ${i.name || ""}</p>
        <p><strong>Category:</strong> ${i.category || ""}</p>
        <p>${i.description || ""}</p>
      `;
      itemBox.appendChild(div);
    });
  }
}

