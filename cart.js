const products = [
  { id: 1, name: "Laptop", price:  999, image: "https://m.media-amazon.com/images/I/510uTHyDqGL.jpg" },
  { id: 2, name: "Smartphone", price: 699, image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRDtINt-Ce48lr9aiecs7jsRIspRFBs1AHgkoqxd7ODMG4bgnXBfCKLsAOum7rUro4cGdEab8cLKZTVNfuK0Y0aq-ZzVFrNgH9G8NYtzCy0" },
  { id: 3, name: "Wireless Earbuds", price:  120, image: "https://www.freepik.com/free-photo/wireless-earbuds-with-neon-cyberpunk-style-lighting_94527825.htm#fromView=keyword&page=1&position=20&uuid=5a5a5615-6885-4a27-b977-4b493f3dfc50&query" },
  { id: 4, name: "Bluetooth speaker", price: 200, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQLR03qUuoL8dRXCRWjNLTAFUwm7b2YekMgaNpwBvYQEoUf5fbLV51T2HprpsCHehgyiLHQmPG6oIctw0cDynkKNpWDsQYPqkz-sRybPffaNbCmdwa55ehjUQ&quot;" },
];

let cart = [];

const productsDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");
const totalDiv = document.getElementById("total");

function displayProducts() {
  productsDiv.innerHTML = "";
  products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div><strong>${product.name}</strong></div>
      <div>${product.price}</div>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productsDiv.appendChild(productDiv);
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const cartItem = cart.find(item => item.id === productId);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  displayCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  displayCart();
}

function displayCart() {
  cartDiv.innerHTML = "";
  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalDiv.textContent = "";
    return;
  }

  cart.forEach(item => {
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    cartItemDiv.innerHTML = `
      <div><strong>${item.name}</strong></div>
      <div>$${item.price} x ${item.quantity} = $${item.price * item.quantity}</div>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartDiv.appendChild(cartItemDiv);
  });

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  totalDiv.textContent = `Total: $${totalPrice}`;
}

displayProducts();
displayCart();
