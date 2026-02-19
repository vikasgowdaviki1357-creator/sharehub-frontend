const BASE_URL = "https://sharehub-backend-lm98.onrender.com";

document.getElementById("signupForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const userData = {
    name: "User", // since you don't have name input
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, { // ✅ FIXED ROUTE
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created successfully!");
      window.location.href = "login.html";
    } else {
      alert(data.message || "Signup failed");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});