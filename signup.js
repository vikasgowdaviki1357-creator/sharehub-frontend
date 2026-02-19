const BASE_URL = "https://sharehub-backend-lm98.onrender.com";

document.getElementById("signupForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  let selectedRole = document.getElementById("role").value;

  // Map correct values exactly for backend
  if (selectedRole === "Seller") {
    selectedRole = "Seller";
  } else if (selectedRole === "Buyier") {
    selectedRole = "Buyier";
  } else {
    alert("Please select a valid role");
    return;
  }

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    role: selectedRole
  };

  try {
    const res = await fetch(`${BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();

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