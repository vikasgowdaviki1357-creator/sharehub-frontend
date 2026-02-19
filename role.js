const BASE_URL = "https://sharehub-backend-7sd0.onrender.com";
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("roleModal");
  const userRaw = localStorage.getItem("currentUser");

  // 🔒 No user → NEVER show modal
  if (!userRaw) return;

  const user = JSON.parse(userRaw);

  // 🔒 Admin → NEVER show modal
  if (user.role === "admin") return;

  // ✅ Show ONLY if role not selected
  if (!user.selectedRole) {
    modal.style.display = "flex";
  }

  // Role selection
  document.querySelectorAll(".role-box").forEach(box => {
    box.addEventListener("click", () => {
      user.selectedRole = box.dataset.role;
      localStorage.setItem("currentUser", JSON.stringify(user));
      modal.style.display = "none";
      location.reload();
    });
  });
});
