const BASE_URL = "https://sharehub-backend-lm98.onrender.com";

document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // FIXED ROLE VALUE TO MATCH BACKEND ENUM
  const selectedRole = document.getElementById("role").value;
  const role =
    selectedRole === "seller" ? "Seller" :
    selectedRole === "buyier" ? "Buyier" :
    "";

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: role
  };

  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    localStorage.setItem("userRole", role);

    if (res.ok) {
      alert("Account created successfully!");
      window.location.href = "login.html";
    } else {
      alert(data.message);
    }

  } catch (err) {
    alert("Server error");
  }
});