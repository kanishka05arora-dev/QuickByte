import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCart } from "../CartContext.jsx";
import "../styles.css";

const categories = [
  { id: "all", label: "All Items" },
  { id: "pizza", label: "Pizza" },
  { id: "burger", label: "Burgers" },
  { id: "pasta", label: "Pasta" },
  { id: "dessert", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
  { id: "fries", label: "Fries" },
];

const menuItems = [
  {
    id: "margherita",
    name: "Margherita Pizza",
    description: "Classic delight with 100% real mozzarella cheese.",
    price: 199,
    time: "⏱ 30–35 mins",
    address: "📍 HungerSpot",
    category: "pizza",
    image: "Margherita-Pizza.webp",
  },
  {
    id: "veggie-supreme",
    name: "Veggie Supreme",
    description: "Loaded with fresh veggies & cheese on a crispy base.",
    price: 250,
    time: "⏱ 30–35 mins",
    address: "📍 Dadupur",
    category: "pizza",
    image: "pepporoni.png",
  },
  {
    id: "classic-burger",
    name: "Classic Cheeseburger",
    description: "Juicy patty, cheddar cheese, lettuce & tomato.",
    price: 110,
    time: "⏱ 20–30 mins",
    address: "📍 Prem Nagar",
    category: "burger",
    image: "classicburger.webp",
  },
  {
    id: "crispy-chicken-burger",
    name: "Crispy Chicken Burger",
    description: "Crispy chicken fillet with mayo & lettuce in a bun.",
    price: 120,
    time: "⏱ 10–15 mins",
    address: "📍 yumSpot",
    category: "burger",
    image: "Chicken-burger (1).jpg",
  },
  {
    id: "alfredo",
    name: "Creamy Alfredo Pasta",
    description: "Rich creamy Alfredo sauce with parmesan & herbs.",
    price: 210,
    time: "⏱ 30–35 mins",
    address: "📍 justeat",
    category: "pasta",
    image: "Pasta.png",
  },
  {
    id: "arrabiata",
    name: "Spicy Arrabiata",
    description: "Zesty tomato-based sauce with garlic & chili flakes.",
    price: 299,
    time: "⏱ 30–35 mins",
    address: "📍 Dholakpur",
    category: "pasta",
    image: "Penne-Arrabbiata.webp",
  },
  {
    id: "brownie",
    name: "Chocolate Brownie",
    description: "Gooey chocolate brownie topped with walnuts.",
    price: 199,
    time: "⏱ 30–35 mins",
    address: "📍 BigBytes",
    category: "dessert",
    image: "chocolate-cake-slice.jpg",
  },
  {
    id: "vanilla-ice-cream",
    name: "Vanilla Ice Cream",
    description: "Smooth & creamy vanilla ice cream scoop.",
    price: 139,
    time: "⏱ 30–35 mins",
    address: "📍 Letseat",
    category: "dessert",
    image: "vanilla Cream.jpg",
  },
  {
    id: "lemonade",
    name: "Chilled Lemonade",
    description: "Refreshing lemonade served cold.",
    price: 99,
    time: "⏱ 30–35 mins",
    address: "📍 Cafe",
    category: "drinks",
    image: "fresh-lemonade.jpg",
  },
  {
    id: "strawberry-milkshake",
    name: "Strawberry Milkshake",
    description: "Creamy milkshake with fresh strawberries.",
    price: 129,
    time: "⏱ 30–35 mins",
    address: "📍 Letseat",
    category: "drinks",
    image: "Strawberry-Shake.jpg",
  },
  {
    id: "latte",
    name: "Latte",
    description: "Creamy, milky, smooth, light coffee.",
    price: 129,
    time: "⏱ 30–35 mins",
    address: "📍 Killcrave",
    category: "drinks",
    image: "latte.jpg",
  },
  {
    id: "fries",
    name: "Crispy Fries",
    description: "Golden, crispy, perfectly salted potato fries.",
    price: 99,
    time: "⏱ 30–35 mins",
    address: "📍 Hotpot",
    category: "fries",
    image: "fries.webp",
  },
];

function MenuItemCard({
  item,
  quantity,
  highlighted,
  onAdd,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className={`menu-item ${highlighted ? "highlighted" : ""}`}>
      <div className="item-image">
        <img src={`/${item.image}`} alt={item.name} loading="lazy" />
      </div>
      <div className="item-content">
        <h3 className="item-title">{item.name}</h3>
        <p className="item-description">{item.description}</p>
        <div className="item-meta">
          <span className="item-time">{item.time}</span>
          <span className="item-address">{item.address}</span>
        </div>
        <div className="item-footer">
          <span className="item-price">₹{item.price}</span>
          {quantity ? (
            <div className="quantity-controls">
              <button
                type="button"
                className="qty-btn minus"
                onClick={() => onDecrease(item.id)}
                aria-label={`Decrease ${item.name} quantity`}
              >
                −
              </button>
              <span className="qty-display">{quantity}</span>
              <button
                type="button"
                className="qty-btn plus"
                onClick={() => onIncrease(item.id)}
                aria-label={`Increase ${item.name} quantity`}
              >
                +
              </button>
            </div>
          ) : (
            <button type="button" className="add-to-cart" onClick={() => onAdd(item)}>
              <span>Add to Cart</span> ➕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const popularLocations = [
  { label: "Sector 17, Chandigarh", icon: "📍" },
  { label: "Sector 35, Chandigarh", icon: "📍" },
  { label: "Elante Mall, Chandigarh", icon: "🏢" },
  { label: "Panchkula", icon: "📍" },
  { label: "Mohali", icon: "📍" },
  { label: "Use Current Location", icon: "🎯" },
];

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [location, setLocation] = useState("Chandigarh, India");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const dropdownRef = useRef(null);

  const { addItem, increaseItem, decreaseItem, getItemQuantity } = useCart();

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return menuItems.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      if (!normalizedSearch) {
        return matchesCategory;
      }
      const haystack = `${item.name} ${item.description} ${item.address} ${item.category}`.toLowerCase();
      return matchesCategory && haystack.includes(normalizedSearch);
    });
  }, [activeCategory, searchTerm]);

  const handleLocationSelect = useCallback((option) => {
    if (option === "Use Current Location") {
      if ("geolocation" in navigator) {
        setLocation("Getting your location...");
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords = `${position.coords.latitude.toFixed(
              2
            )}, ${position.coords.longitude.toFixed(2)}`;
            setLocation(`📍 Current Location (${coords})`);
            setToastMessage("Location detected successfully! 🎯");
          },
          () => {
            setLocation("Chandigarh, India");
            setToastMessage("Could not get location. Using default.");
          }
        );
      } else {
        setToastMessage("Geolocation not supported. Using default.");
      }
    } else {
      setLocation(option);
      setToastMessage(`Delivering to ${option} 🚀`);
    }
    setIsDropdownOpen(false);
  }, []);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(""), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="home-page">
      <section className="parallax-hero" id="home">
        <div className="parallax-overlay">
          <h1>QuickByte</h1>
          <h2>India&apos;s #1 food delivery app</h2>
          <p>Experience fast & easy online ordering on the QuickByte app</p>
          <div className="app-buttons">
            <button type="button">Get it on Google Play</button>
            <button type="button">Download on the App Store</button>
          </div>
          <br />
          <p>Scroll down ↓</p>
        </div>
      </section>

      <section className="location-search-section">
        <div className="location-search-container">
          <div className="location-input-container" ref={dropdownRef}>
            <div className="location-icon">📍</div>
            <input
              type="text"
              className="location-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your delivery location"
            />
            <div
              className="dropdown-arrow"
              role="button"
              tabIndex={0}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsDropdownOpen((prev) => !prev);
                }
              }}
            >
              ▼
            </div>
            {isDropdownOpen && (
              <div className="location-dropdown">
                <h4>Popular Locations</h4>
                {popularLocations.map((option) => (
                  <button
                    type="button"
                    key={option.label}
                    className="location-option"
                    onClick={() => handleLocationSelect(option.label)}
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search for restaurant, item or more"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="search-icon">🔍</div>
          </div>
        </div>
      </section>

      <section className="container">
        <div className="page-title">
          <h1>Delicious Food Is Waiting For You</h1>
          <p>
            Satisfy your cravings with our carefully curated selection of
            dishes from your favourite restaurants.
          </p>
        </div>

        <div className="category-filter">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              className={`filter-btn ${
                activeCategory === category.id ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="menu-grid" id="menuGrid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                quantity={getItemQuantity(item.id)}
                highlighted={Boolean(searchTerm)}
                onAdd={addItem}
                onIncrease={increaseItem}
                onDecrease={decreaseItem}
              />
            ))
          ) : (
            <div className="no-results-message">
              <h3>😕 No items found</h3>
              <p>
                Try searching for something else like &quot;pizza&quot;,
                &quot;burger&quot;, or &quot;pasta&quot;
              </p>
            </div>
          )}
        </div>
      </section>

      {toastMessage && <div className="location-toast">{toastMessage}</div>}
    </div>
  );
}


