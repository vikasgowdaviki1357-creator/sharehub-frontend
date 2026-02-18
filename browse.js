const BASE_URL = "https://sharehub-backend-lm98.onrender.com";

async function loadProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/items/all`);
    const products = await response.json();

    const container = document.getElementById("items");
    container.innerHTML = "";

    products.forEach(item => {
      container.innerHTML += `
        <div class="product-card">
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
        </div>
      `;
    });

  } catch (error) {
    console.error("Error loading products:", error);
  }
}

loadProducts();