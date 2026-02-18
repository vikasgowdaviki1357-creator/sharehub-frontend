const BASE_URL = "https://sharehub-backend-lm98.onrender.com";
const itemsBox = document.getElementById("items");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceSort = document.getElementById("priceSort");

let items = JSON.parse(localStorage.getItem("items")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

/* ================= RENDER ITEMS ================= */

function renderItems(list) {
  itemsBox.innerHTML = "";

  if (list.length === 0) {
    itemsBox.innerHTML = "<p>No matching items found.</p>";
    return;
  }

  list.forEach((item) => {

    const realIndex = items.indexOf(item); // 🔥 Fix index bug when filtering

    const card = document.createElement("div");
    card.className = "product-card";

    if (item.sold) {
      card.style.opacity = "0.6";
    }

    card.innerHTML = `
      ${item.sold ? `<div class="sold-badge">SOLD</div>` : ""}

      <img src="${item.image}" alt="${item.name}">

      <h3>${item.name}</h3>

      <a href="seller.html?email=${item.sellerEmail}" 
         style="color:#2563eb;font-weight:600">
         View Seller
      </a>

      <p class="category">${item.category}</p>
      <p class="used">Used: ${item.yearsUsed} year(s)</p>

      ${
        item.sold
          ? `<div style="color:red;font-weight:bold;margin-top:10px;">Item Sold</div>`
          : `<div class="price">₹${item.price}</div>`
      }

      ${
        !item.sold
          ? `
            <div class="actions">
              <a href="tel:${item.phone}" class="call-btn">📞 Call</a>
              <a href="https://wa.me/91${item.phone}" target="_blank" class="wa-btn">💬 WhatsApp</a>
            </div>
          `
          : ""
      }

      ${
        currentUser &&
        currentUser.email === item.sellerEmail &&
        !item.sold
          ? `
            <button onclick="markAsSold(${realIndex})"
              style="margin-top:12px;padding:8px 12px;border:none;border-radius:8px;background:#ef4444;color:white;cursor:pointer;">
              Mark as Sold
            </button>
          `
          : ""
      }
    `;

    itemsBox.appendChild(card);
  });
}

/* ================= MARK AS SOLD ================= */

function markAsSold(index) {
  items[index].sold = true;
  localStorage.setItem("items", JSON.stringify(items));
  renderItems(items);
}

/* ================= FILTER SYSTEM ================= */

function applyFilters() {
  let filtered = [...items];

  if (searchInput) {
    const search = searchInput.value.toLowerCase();
    if (search) {
      filtered = filtered.filter(i =>
        i.name.toLowerCase().includes(search) ||
        i.category.toLowerCase().includes(search)
      );
    }
  }

  if (categoryFilter && categoryFilter.value !== "all") {
    filtered = filtered.filter(i =>
      i.category.toLowerCase().includes(categoryFilter.value)
    );
  }

  if (priceSort) {
    if (priceSort.value === "low") {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (priceSort.value === "high") {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    }
  }

  renderItems(filtered);
}

/* ================= EVENTS ================= */

if (searchInput) searchInput.addEventListener("input", applyFilters);
if (categoryFilter) categoryFilter.addEventListener("change", applyFilters);
if (priceSort) priceSort.addEventListener("change", applyFilters);

/* ================= INITIAL LOAD ================= */

renderItems(items);
