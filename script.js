const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");

// Fetch products from the backend
async function loadProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();

  products.forEach(product => {
    const productHTML = `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button onclick="addToCart('${product.id}')">Add to Cart</button>
      </div>
    `;
    productGrid.innerHTML += productHTML;
  });
}

// Add product to the cart
async function addToCart(productId) {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
  });

  const result = await response.json();
  if (result.success) {
    cartCount.textContent = result.cartCount;
    alert("Added to cart!");
  } else {
    alert("Error adding to cart.");
  }
}

loadProducts();
