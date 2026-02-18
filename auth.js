const BASE_URL = "https://sharehub-backend-lm98.onrender.com";
/* ================= SIGNUP ================= */
function signup() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const role = document.getElementById("role").value;
  const imageFile = document.getElementById("profileImage").files[0];

  if (!email || !password) {
    alert("Fill all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.email === email)) {
    alert("User already exists");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const newUser = {
      email,
      password,
      role,
      profileImage: reader.result   // ✅ SAVE IMAGE
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    window.location.href = "login.html";
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  } else {
    alert("Please upload profile picture");
  }
}


/* ================= LOGIN ================= */
function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    alert("Invalid email or password");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  // This is IMPORTANT for role popup
  sessionStorage.setItem("justLoggedIn", "true");

  window.location.href = "index.html";
}


/* ================= LOGOUT ================= */
function logout() {
  localStorage.removeItem("currentUser");
  sessionStorage.removeItem("justLoggedIn");
  window.location.href = "login.html";
}
