const BASE_URL = "https://sharehub-backend-lm98.onrender.com";
const container = document.getElementById("items-container");

async function loadItems() {
  try {
    const res = await fetch("https://sharehub-backend-lm98.onrender.com/api/items/all");
    const items = await res.json();

    container.innerHTML = "";

    items.forEach((item) => {
      container.innerHTML += `
        <div class="card">
          <img src="${item.image}" width="150">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <p>${item.category}</p>
          <p>${item.sold ? "❌ Sold" : "✅ Available"}</p>
        </div>
      `;
    });
  } catch (err) {
    container.innerHTML = "Failed to load items";
  }
}

loadItems();