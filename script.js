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
    console.log(art);
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

    // Button to add art to cart
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
      console.log("clicked")
      console.log(cartItems)
      console.log(products)
      cartItems.style.display = "none";
      products.style.display = "grid";
    });
  }

  function updateQuantity(artId) {
    addToCart(artId);
    let quantity = document.querySelector(`.art-container[data-art-id="${artId}"] .quantity`);
    console.log(quantity.textContent);
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
