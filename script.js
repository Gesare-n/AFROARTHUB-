document.addEventListener("DOMContentLoaded", () => {
  fetchData();

  function fetchData() {
    fetch("http://localhost:3000/artworks")
      .then((res) => res.json())
      .then((artworks) => {
        artworks.forEach((art) => {
          renderArtWorks(art);
        });
      })
      .catch((error) => console.error("Error fetching artworks:", error));
  }

  function renderArtWorks(art) {
    const artContainer = document.createElement("div");
    artContainer.classList.add("art-container");
    artContainer.dataset.artId = art.id; // Unique identifier
    artContainer.innerHTML = `
      <img src=${art.image} alt="${art.name}">
      <p>${art.name}</p>
      <p>${art.price}</p>
      <p class="quantity">${art.quantity}</p>
      <button class="add-to-cart" data-art-id="${art.id}">Add to Cart</button>
    `;
    document.querySelector(".products-container").appendChild(artContainer);

    const button = artContainer.querySelector(".add-to-cart");
    button.addEventListener("click", () => updateQuantity(art.id));
  }

  function addToCart(artId) {
    const artContainer = document.querySelector(`.art-container[data-art-id="${artId}"]`);
    const cartItems = document.querySelector(".cart-items");
    cartItems.appendChild(artContainer.cloneNode(true));
  }

  const cartBtn = document.querySelector("#cart-btn");
  cartBtn.addEventListener("click", displayCartItems);

  function displayCartItems() {
    let products = document.querySelector(".products-container");
    products.style.display = "none";

    let cartItems = document.querySelector(".cart-items");
    cartItems.style.display = "block";

    document.querySelector("#products").addEventListener("click", () => {
      cartItems.style.display = "none";
      products.style.display = "grid";
    });
  }

  const checkoutBtn = document.createElement("button");
  checkoutBtn.id = "checkout-btn";
  checkoutBtn.textContent = "Checkout";
  document.querySelector(".cart-section").appendChild(checkoutBtn);
  checkoutBtn.addEventListener("click", checkout);

  function checkout() {
    const cartItems = document.querySelectorAll(".cart-items .art-container");
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    // Calculate total price (replace this with your logic)
    let totalPrice = 0;
    cartItems.forEach((cartItem) => {
      const price = parseFloat(cartItem.querySelector("p:nth-child(3)").textContent);
      totalPrice += price;
    });

    // Display a summary of items and total price
    let summary = "Items in your cart:\n";
    cartItems.forEach((cartItem) => {
      summary += `${cartItem.querySelector("p:nth-child(2)").textContent}\n`;
    });
    summary += `\nTotal Price: $${totalPrice.toFixed(2)}`;

    // Confirm the checkout
    const confirmed = confirm(summary);
    if (confirmed) {
      // Implement further checkout logic, such as payment processing
      alert("Checkout successful! Thank you for your purchase.");
      // Reset the cart after successful checkout (you may want to adjust this based on your specific requirements)
      document.querySelector(".cart-items").innerHTML = "";
    }
  }

  function updateQuantity(artId) {
    addToCart(artId);
    let quantity = document.querySelector(`.art-container[data-art-id="${artId}"] .quantity`);
    if (parseInt(quantity.textContent) > 0) {
      quantity.textContent = parseInt(quantity.textContent) - 1;
    } else {
      let button = document.querySelector(`.add-to-cart[data-art-id="${artId}"]`);
      button.id = "artwork-soldout";
      button.textContent = "SOLD OUT";
      button.disabled = true;
    }
  }
});
