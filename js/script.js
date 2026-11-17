
const foods = [
  {
    id: 1,
    name: "Classic Beef Burger",
    category: "Burger",
    price: 249,
    rating: 4.9,
    tag: "Bestseller",
    description: "Juicy grilled burger with fresh lettuce and cheese.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58bd?w=600"
  },
  {
    id: 2,
    name: "Cheese Pizza",
    category: "Pizza",
    price: 399,
    rating: 4.8,
    tag: "Popular",
    description: "Delicious cheesy pizza with fresh toppings.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600"
  },
  {
    id: 3,
    name: "Creamy Pasta",
    category: "Asian",
    price: 299,
    rating: 4.7,
    tag: "Chef's choice",
    description: "Creamy pasta with herbs and rich flavors.",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600"
  },
  {
    id: 4,
    name: "Chocolate Dessert",
    category: "Dessert",
    price: 179,
    rating: 4.9,
    tag: "Sweet pick",
    description: "Rich chocolate dessert for sweet cravings.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600"
  },
  {
    id: 5,
    name: "Fresh Noodles",
    category: "Asian",
    price: 229,
    rating: 4.6,
    tag: "Fresh",
    description: "Hot noodles tossed with vegetables and spices.",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600"
  },
  {
    id: 6,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 449,
    rating: 4.9,
    tag: "Popular",
    description: "Classic pizza loaded with pepperoni and cheese.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600"
  },
  {
    id: 7,
    name: "Crispy Chicken Burger",
    category: "Burger",
    price: 279,
    rating: 4.8,
    tag: "Crispy",
    description: "Crunchy chicken, fresh lettuce and special sauce.",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600"
  },
  {
    id: 8,
    name: "Fresh Juice",
    category: "Drinks",
    price: 129,
    rating: 4.7,
    tag: "Refreshing",
    description: "Fresh fruit juice served chilled.",
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
  },
  {
    id: 9,
    name: "Vanilla Ice Cream",
    category: "Dessert",
    price: 149,
    rating: 4.8,
    tag: "Sweet pick",
    description: "Smooth and creamy vanilla ice cream.",
    image: "https://images.unsplash.com/photo-1501446529957-6226bd447c46?w=600"
  }
];

let cart = [];
let activeCategory = "All";

const foodGrid = document.getElementById("foodGrid");
const searchInput = document.getElementById("searchInput");
const categoryList = document.getElementById("categoryList");
const cartButton = document.getElementById("cartButton");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");

// Display food menu
function displayFoods() {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredFoods = foods.filter(food => {
    const matchesCategory =
      activeCategory === "All" || food.category === activeCategory;

    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm) ||
      food.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  foodGrid.innerHTML = filteredFoods.map(food => `
    <article class="food-card">
      <div class="food-image">
        <img src="${food.image}" alt="${food.name}" loading="lazy">
        <span class="food-tag">${food.tag}</span>
      </div>
      <div class="food-info">
        <h3>${food.name}</h3>
        <p>${food.description}</p>
        <div class="food-bottom">
          <span class="food-price">₹${food.price}</span>
          <button class="add-button" data-add="${food.id}">
            + Add
          </button>
        </div>
        <small style="display:block;margin-top:12px;color:#9299a5">
          ⭐ ${food.rating} &nbsp; • &nbsp; ${food.category}
        </small>
      </div>
    </article>
  `).join("");

  document.getElementById("emptyMessage").hidden =
    filteredFoods.length !== 0;
}

// Category filtering
categoryList.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;

  document.querySelectorAll(".category-chip").forEach(chip => {
    chip.classList.toggle("active", chip === button);
  });

  displayFoods();
});

// Search food
searchInput.addEventListener("input", displayFoods);

// Add food to cart
foodGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const foodId = Number(button.dataset.add);
  const existingItem = cart.find(item => item.id === foodId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    const food = foods.find(item => item.id === foodId);
    cart.push({ ...food, quantity: 1 });
  }

  updateCart();
  showToast("Food added to your cart!");
});

// Update cart display
function updateCart() {
  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  cartCount.textContent = totalQuantity;
  cartTotal.textContent = `₹${totalPrice}`;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p style="text-align:center;color:#9299a5;padding:35px 0">
        Your cart is empty. Add something delicious!
      </p>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>₹${item.price * item.quantity}</p>
        <div class="quantity-controls">
          <button data-action="decrease" data-id="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button data-action="increase" data-id="${item.id}">+</button>
          <button data-action="remove" data-id="${item.id}">✕</button>
        </div>
      </div>
    </div>
  `).join("");
}

// Cart quantity controls
cartItems.addEventListener("click", event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;

  const id = Number(button.dataset.id);
  const action = button.dataset.action;
  const item = cart.find(product => product.id === id);

  if (!item) return;

  if (action === "increase") {
    item.quantity++;
  }

  if (action === "decrease") {
    item.quantity--;
    if (item.quantity <= 0) {
      cart = cart.filter(product => product.id !== id);
    }
  }

  if (action === "remove") {
    cart = cart.filter(product => product.id !== id);
  }

  updateCart();
});

// Open cart
function openCart() {
  cartDrawer.classList.add("show");
  cartOverlay.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

// Close cart
function closeCart() {
  cartDrawer.classList.remove("show");
  cartOverlay.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

cartButton.addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// Checkout
const checkoutModal = document.getElementById("checkoutModal");

document.getElementById("checkoutButton").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty!");
    return;
  }

  closeCart();
  checkoutModal.classList.add("show");
  document.body.style.overflow = "hidden";
});

function closeCheckout() {
  checkoutModal.classList.remove("show");
  document.body.style.overflow = "";
}

document.getElementById("closeCheckout").addEventListener(
  "click", closeCheckout
);

checkoutModal.addEventListener("click", event => {
  if (event.target === checkoutModal) closeCheckout();
});

document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();

  if (cart.length === 0) return;

  const customerName = document.getElementById("customerName").value.trim();
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  showToast(`Thank you ${customerName}! Demo order placed: ₹${total}`);

  cart = [];
  updateCart();
  event.target.reset();
  closeCheckout();
});

// Toast notification
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// Mobile navigation
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("navLinks").classList.remove("open");
  });
});

// Current year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Initial rendering
displayFoods();
updateCart();
