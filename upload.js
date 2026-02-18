const BASE_URL = "https://sharehub-backend-lm98.onrender.com";

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("uploadForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      alert("Please login again");
      return;
    }

    const itemData = {
      name: document.getElementById("name").value,
      category: document.getElementById("category").value,
      price: document.getElementById("price").value,
      yearsUsed: document.getElementById("yearsUsed").value,
      phone: document.getElementById("phone").value,
      image: document.getElementById("image").value,
      sellerEmail: currentUser.email,
      sold: false
    };

    try {
      const res = await fetch(`${BASE_URL}/api/items/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Item uploaded successfully!");
        window.location.href = "browse.html";
      } else {
        alert(data.message || "Upload failed");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  });

});