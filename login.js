const BASE_URL = "https://sharehub-backend-7sd0.onrender.com";

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful ✅");

        localStorage.setItem("currentUser", JSON.stringify(data.user));

        window.location.href = "index.html";
      } else {
        alert(data.message || "Invalid credentials ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }

  });

});