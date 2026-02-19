const BASE_URL = "https://sharehub-backend-7sd0.onrender.com";

const itemsBox = document.getElementById("items");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");

let allItems = [];

async function loadProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/items/all`);
    const products = await response.json();

    allItems = products;
    applyFilters();
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function renderItems(list) {
  itemsBox.innerHTML = "";

  if (list.length === 0) {
    itemsBox.innerHTML = "<p>No matching items found.</p>";
    return;
  }

  list.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.category}</p>
      <p><strong>₹${item.price}</strong></p>
      <p>Used: ${item.yearsUsed || 0} year(s)</p>
      <p>📞 ${item.phone}</p>

      <div class="card-buttons">
        <a href="tel:${item.phone}" class="call-btn">Call</a>
        <a href="https://wa.me/91${item.phone}" target="_blank" class="whatsapp-btn">WhatsApp</a>
      </div>
    `;

    itemsBox.appendChild(card);
  });
}

function applyFilters() {
  let filtered = [...allItems];

  const search = searchInput.value.toLowerCase();

  if (search) {
    filtered = filtered.filter(i =>
      i.name.toLowerCase().includes(search) ||
      i.category.toLowerCase().includes(search)
    );
  }

  if (categoryFilter.value !== "all") {
    filtered = filtered.filter(i =>
      i.category.toLowerCase().includes(categoryFilter.value)
    );
  }

  if (priceSort.value === "low") {
    filtered.sort((a, b) => Number(a.price) - Number(b.price));
  }

  if (priceSort.value === "high") {
    filtered.sort((a, b) => Number(b.price) - Number(a.price));
  }

  renderItems(filtered);
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
priceSort.addEventListener("change", applyFilters);

loadProducts();