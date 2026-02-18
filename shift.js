/* ========== SWIFT SUPPORT SYSTEM ========== */
const BASE_URL = "https://sharehub-backend-lm98.onrender.com";
// Toggle Swift panel
window.toggleSwift = function () {
  const panel = document.getElementById("swiftPanel");
  if (!panel) return;

  panel.style.display =
    panel.style.display === "block" ? "none" : "block";
};

// Send Swift message
window.sendSwift = function () {
  const typeEl = document.getElementById("swiftType");
  const msgEl = document.getElementById("swiftMsg");

  if (!typeEl || !msgEl) {
    alert("Swift form not found");
    return;
  }

  const msg = msgEl.value.trim();
  if (!msg) {
    alert("Please type a message");
    return;
  }

  const swiftMessages =
    JSON.parse(localStorage.getItem("swiftMessages")) || [];

  swiftMessages.push({
    type: typeEl.value,
    message: msg,
    reply: "",
    time: new Date().toLocaleString()
  });

  localStorage.setItem("swiftMessages", JSON.stringify(swiftMessages));

  alert("Message sent to admin!");
  msgEl.value = "";
  toggleSwift();
};

