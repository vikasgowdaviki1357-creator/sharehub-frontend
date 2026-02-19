const BASE_URL = "https://sharehub-backend-lm98.onrender.com";

document.getElementById("signupForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: document.getElementById("role").value
  };

  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    const role = document.getElementById("role").value;
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