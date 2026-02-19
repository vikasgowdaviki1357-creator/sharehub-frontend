const BASE_URL = "https://sharehub-backend-7sd0.onrender.com";

async function markSold(id) {
  await fetch(`${BASE_URL}/api/items/sold/${id}`, {
    method: "PUT",
  });

  alert("Marked as sold");
  location.reload();
}

async function loadSellerItems() {
  const res = await fetch(`${BASE_URL}/api/items/all`);
  const items = await res.json();

  const userEmail = localStorage.getItem("userEmail");
  const container = document.getElementById("seller-items");

  container.innerHTML = "";

  items
    .filter((item) => item.sellerEmail === userEmail)
    .forEach((item) => {
      container.innerHTML += `
        <div>
          <h3>${item.name}</h3>
          <p>${item.sold ? "Sold" : "Available"}</p>
          ${
            !item.sold
              ? `<button onclick="markSold('${item._id}')">Mark as Sold</button>`
              : ""
          }
        </div>
      `;
    });
}

loadSellerItems();