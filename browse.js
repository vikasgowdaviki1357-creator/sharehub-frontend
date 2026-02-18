const BASE_URL = "https://sharehub-backend-lm98.onrender.com";

async function loadProducts() {
  const response = await fetch(`${BASE_URL}/api/items/all`);
  const products = await response.json();

  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach(item => {
    container.innerHTML += `
      <div>
        <h3>${item.name}</h3>
        <p>Category: ${item.category}</p>
        <p>Price: ₹${item.price}</p>
      </div>
    `;
  });
}

loadProducts();