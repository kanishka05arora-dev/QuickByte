
// Cart array to store items
let cart = [];

// Add to Cart function
function addToCart(itemName, itemPrice, event) {
  const button = event.target.closest(".add-to-cart");
  const itemFooter = button.closest(".item-footer");

  // Check if item already exists in cart
  const existingItem = cart.find((item) => item.name === itemName);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: itemName,
      price: itemPrice,
      quantity: 1,
    });
  }

  // Replace button with quantity controls
  const item = cart.find((item) => item.name === itemName);
  itemFooter.querySelector(".add-to-cart").outerHTML = `
    <div class="quantity-controls" data-item="${itemName}">
      <button class="qty-btn minus" onclick="decreaseItemQuantity('${itemName}', event)">−</button>
      <span class="qty-display">${item.quantity}</span>
      <button class="qty-btn plus" onclick="increaseItemQuantity('${itemName}', event)">+</button>
    </div>
  `;

  updateCart();
}

// Increase item quantity from menu
function increaseItemQuantity(itemName, event) {
  const item = cart.find((item) => item.name === itemName);
  if (item) {
    item.quantity += 1;
    const qtyDisplay = event.target
      .closest(".quantity-controls")
      .querySelector(".qty-display");
    qtyDisplay.textContent = item.quantity;
    updateCart();
  }
}

// Decrease item quantity from menu
function decreaseItemQuantity(itemName, event) {
  const item = cart.find((item) => item.name === itemName);
  const controls = event.target.closest(".quantity-controls");
  const itemFooter = controls.closest(".item-footer");

  if (item) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      const qtyDisplay = controls.querySelector(".qty-display");
      qtyDisplay.textContent = item.quantity;
      updateCart();
    } else {
      // Remove from cart and restore "Add to Cart" button
      cart = cart.filter((i) => i.name !== itemName);
      const itemPrice = item.price;
      controls.outerHTML = `
        <button class="add-to-cart" onclick="addToCart('${itemName}', ${itemPrice}, event)">
          <span>Add to Cart</span> ➕
        </button>
      `;
      updateCart();
    }
  }
}

// Update Cart Display
function updateCart() {
  const cartCount = document.getElementById("cartCount");
  const cartItems = document.getElementById("cartItems");
  const cartSidebar = document.getElementById("cartSidebar");

  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Remove existing checkout section if it exists
  const existingCheckout = cartSidebar.querySelector(".cart-checkout-section");
  if (existingCheckout) {
    existingCheckout.remove();
  }

  // Update cart items display
  if (cart.length === 0) {
    cartItems.innerHTML =
      '<p style="text-align: center; color: #666; padding: 2rem">Your cart is empty</p>';
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item" style="padding: 1rem; border-bottom: 1px solid #eee;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h4 style="margin: 0 0 0.5rem 0;">${item.name}</h4>
              <p style="color: #666; margin: 0;">₹${item.price} × ${item.quantity}</p>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <button onclick="decreaseQuantity('${item.name}')" style="background: #f44336; color: white; border: none; border-radius: 5px; width: 25px; height: 25px; cursor: pointer;">-</button>
              <span style="font-weight: bold;">${item.quantity}</span>
              <button onclick="increaseQuantity('${item.name}')" style="background: #4CAF50; color: white; border: none; border-radius: 5px; width: 25px; height: 25px; cursor: pointer;">+</button>
              <button onclick="removeFromCart('${item.name}')" style="background: #ff6b35; color: white; border: none; border-radius: 5px; padding: 0.3rem 0.6rem; cursor: pointer; margin-left: 0.5rem;">Remove</button>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    // Create checkout section and append it after cartItems
    const checkoutSection = document.createElement("div");
    checkoutSection.className = "cart-checkout-section";
    checkoutSection.innerHTML = `
      <div class="cart-total" style="padding: 1.5rem; border-top: 2px solid #eee; background: #f9f9f9; display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold;">
        <span>Total:</span>
        <span>₹${total.toFixed(2)}</span>
      </div>
      <button class="checkout-btn" onclick="checkout()" style="width: 100%; background: linear-gradient(135deg, #d2691e, #ff6b35); color: white; border: none; padding: 1rem; border-radius: 10px; font-size: 1.1rem; font-weight: bold; cursor: pointer; margin-top: 1rem;">
        Proceed to Checkout
      </button>
    `;
    cartItems.insertAdjacentElement("afterend", checkoutSection);
  }
}

// Increase quantity
function increaseQuantity(itemName) {
  const item = cart.find((item) => item.name === itemName);
  if (item) {
    item.quantity += 1;
    updateCart();
  }
}

// Decrease quantity
function decreaseQuantity(itemName) {
  const item = cart.find((item) => item.name === itemName);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    updateCart();
  } else if (item && item.quantity === 1) {
    removeFromCart(itemName);
  }
}

// Remove from cart
function removeFromCart(itemName) {
  cart = cart.filter((item) => item.name !== itemName);

  // Find the menu item and restore the "Add to Cart" button
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((menuItem) => {
    const title = menuItem.querySelector(".item-title").textContent;
    if (title === itemName) {
      const itemFooter = menuItem.querySelector(".item-footer");
      const priceText = itemFooter.querySelector(".item-price").textContent;
      const price = parseInt(priceText.replace("₹", ""));

      const controls = itemFooter.querySelector(".quantity-controls");
      if (controls) {
        controls.outerHTML = `
          <button class="add-to-cart" onclick="addToCart('${itemName}', ${price}, event)">
            <span>Add to Cart</span> ➕
          </button>
        `;
      }
    }
  });

  updateCart();
}

// Toggle Cart Sidebar
function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  cartSidebar.classList.toggle("open");
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  alert(
    `Order placed! Total: ₹${total.toFixed(
      2
    )}\n\nThank you for ordering with QuickByte! 🍕`
  );

  // Clear cart and restore all "Add to Cart" buttons
  cart.forEach((cartItem) => {
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach((menuItem) => {
      const title = menuItem.querySelector(".item-title").textContent;
      if (title === cartItem.name) {
        const itemFooter = menuItem.querySelector(".item-footer");
        const priceText = itemFooter.querySelector(".item-price").textContent;
        const price = parseInt(priceText.replace("₹", ""));

        const controls = itemFooter.querySelector(".quantity-controls");
        if (controls) {
          controls.outerHTML = `
            <button class="add-to-cart" onclick="addToCart('${cartItem.name}', ${price}, event)">
              <span>Add to Cart</span> ➕
            </button>
          `;
        }
      }
    });
  });

  // Clear cart
  cart = [];
  updateCart();
  toggleCart();
}

// Filter Menu
function filterMenu(category) {
  const menuItems = document.querySelectorAll(".menu-item");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Update active button
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Filter items
  menuItems.forEach((item) => {
    if (category === "all" || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Search Functionality
function initializeSearch() {
  const searchInput = document.querySelector(".search-input");
  const menuItems = document.querySelectorAll(".menu-item");

  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      const searchTerm = e.target.value.toLowerCase().trim();

      menuItems.forEach((item) => {
        const title = item
          .querySelector(".item-title")
          .textContent.toLowerCase();
        const description = item
          .querySelector(".item-description")
          .textContent.toLowerCase();
        const address = item
          .querySelector(".item-address")
          .textContent.toLowerCase();
        const category = item.dataset.category.toLowerCase();

        // Check if search term matches title, description, address, or category
        if (
          title.includes(searchTerm) ||
          description.includes(searchTerm) ||
          address.includes(searchTerm) ||
          category.includes(searchTerm)
        ) {
          item.style.display = "block";
          // Add highlight effect
          item.style.animation = "highlight 0.5s ease";
        } else {
          item.style.display = "none";
        }
      });

      // Show "No results" message if nothing found
      const visibleItems = Array.from(menuItems).filter(
        (item) => item.style.display !== "none"
      );
      const menuGrid = document.getElementById("menuGrid");

      // Remove existing "no results" message
      const existingMessage = document.querySelector(".no-results-message");
      if (existingMessage) {
        existingMessage.remove();
      }

      if (visibleItems.length === 0 && searchTerm !== "") {
        const noResultsDiv = document.createElement("div");
        noResultsDiv.className = "no-results-message";
        noResultsDiv.style.cssText =
          "grid-column: 1/-1; text-align: center; padding: 3rem; color: #666;";
        noResultsDiv.innerHTML = `
          <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">😕 No items found</h3>
          <p>Try searching for something else like "pizza", "burger", or "pasta"</p>
        `;
        menuGrid.appendChild(noResultsDiv);
      }
    });

    // Clear search on escape key
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        searchInput.value = "";
        menuItems.forEach((item) => (item.style.display = "block"));
        const existingMessage = document.querySelector(".no-results-message");
        if (existingMessage) existingMessage.remove();
      }
    });
  }
}

// Location Functionality
function initializeLocation() {
  const locationInput = document.querySelector(".location-input");
  const dropdownArrow = document.querySelector(".dropdown-arrow");

  if (locationInput) {
    // Create dropdown menu
    const dropdown = document.createElement("div");
    dropdown.className = "location-dropdown";
    dropdown.style.cssText = `
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      margin-top: 0.5rem;
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, opacity 0.3s ease;
      opacity: 0;
      z-index: 100;
    `;

    const popularLocations = [
      { name: "Sector 17, Chandigarh", icon: "📍" },
      { name: "Sector 35, Chandigarh", icon: "📍" },
      { name: "Elante Mall, Chandigarh", icon: "🏢" },
      { name: "Panchkula", icon: "📍" },
      { name: "Mohali", icon: "📍" },
      { name: "Use Current Location", icon: "🎯" },
    ];

    dropdown.innerHTML = `
      <div style="padding: 1rem;">
        <h4 style="margin: 0 0 0.8rem 0; color: #d2691e; font-size: 0.9rem;">POPULAR LOCATIONS</h4>
        ${popularLocations
          .map(
            (loc) => `
          <div class="location-option" data-location="${loc.name}" style="
            padding: 0.8rem;
            cursor: pointer;
            border-radius: 8px;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          ">
            <span>${loc.icon}</span>
            <span>${loc.name}</span>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    locationInput.parentElement.style.position = "relative";
    locationInput.parentElement.appendChild(dropdown);

    // Toggle dropdown
    let isDropdownOpen = false;

    const toggleDropdown = () => {
      isDropdownOpen = !isDropdownOpen;
      if (isDropdownOpen) {
        dropdown.style.maxHeight = "400px";
        dropdown.style.opacity = "1";
        dropdownArrow.style.transform = "translateY(-50%) rotate(180deg)";
      } else {
        dropdown.style.maxHeight = "0";
        dropdown.style.opacity = "0";
        dropdownArrow.style.transform = "translateY(-50%) rotate(0deg)";
      }
    };

    dropdownArrow.addEventListener("click", toggleDropdown);
    locationInput.addEventListener("focus", () => {
      if (!isDropdownOpen) toggleDropdown();
    });

    // Handle location selection
    dropdown.addEventListener("click", function (e) {
      const option = e.target.closest(".location-option");
      if (option) {
        const location = option.dataset.location;

        if (location === "Use Current Location") {
          // Request geolocation
          if (navigator.geolocation) {
            locationInput.value = "Getting your location...";
            navigator.geolocation.getCurrentPosition(
              (position) => {
                locationInput.value = `📍 Current Location (${position.coords.latitude.toFixed(
                  2
                )}, ${position.coords.longitude.toFixed(2)})`;
                showLocationConfirmation("Location detected successfully! 🎯");
              },
              (error) => {
                locationInput.value = "Chandigarh, India";
                showLocationConfirmation(
                  "Could not get location. Using default."
                );
              }
            );
          } else {
            locationInput.value = "Chandigarh, India";
            showLocationConfirmation(
              "Geolocation not supported. Using default."
            );
          }
        } else {
          locationInput.value = location;
          showLocationConfirmation(`Delivering to ${location} 🚀`);
        }

        toggleDropdown();
      }
    });

    // Add hover effects to options
    dropdown.addEventListener("mouseover", function (e) {
      const option = e.target.closest(".location-option");
      if (option) {
        option.style.background = "#fff7f2";
        option.style.transform = "translateX(5px)";
      }
    });

    dropdown.addEventListener("mouseout", function (e) {
      const option = e.target.closest(".location-option");
      if (option) {
        option.style.background = "transparent";
        option.style.transform = "translateX(0)";
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (!locationInput.parentElement.contains(e.target)) {
        if (isDropdownOpen) toggleDropdown();
      }
    });

    // Set default location
    if (!locationInput.value) {
      locationInput.value = "Chandigarh, India";
    }
  }
}

// Show location confirmation message
function showLocationConfirmation(message) {
  const confirmation = document.createElement("div");
  confirmation.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(135deg, #28a745, #20c997);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(40, 167, 69, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    font-weight: 500;
  `;
  confirmation.textContent = message;
  document.body.appendChild(confirmation);

  setTimeout(() => {
    confirmation.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => confirmation.remove(), 300);
  }, 3000);
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
  @keyframes highlight {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.02); }
  }
  
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
  
  .dropdown-arrow {
    transition: transform 0.3s ease !important;
  }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeSearch();
  initializeLocation();
});
