const BASE_URL = "https://sharehub-backend-lm98.onrender.com";
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const itemData = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    price: document.getElementById("price").value,
    yearUsed: document.getElementById("yearUsed").value,
    phone: document.getElementById("phone").value,
    image: document.getElementById("image").value,
    sellerEmail: localStorage.getItem("userEmail"),
  };

  try {
    const res = await fetch("https://sharehub-backend-lm98.onrender.com/api/items/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(itemData),
    });

    const data = await res.json();
    alert(data.message);
    form.reset();
  } catch (err) {
    alert("Error uploading item");
  }
});