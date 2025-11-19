import { useCart } from "../CartContext.jsx";

export default function CartSidebar() {
  const {
    cart,
    cartTotal,
    isCartOpen,
    closeCart,
    increaseItem,
    decreaseItem,
    removeItem,
    checkout,
  } = useCart();

  return (
    <aside className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Your Order</h2>
        <button type="button" className="close-cart" onClick={closeCart}>
          ✕
        </button>
      </div>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h4>{item.name}</h4>
                <p>
                  ₹{item.price} × {item.quantity}
                </p>
              </div>
              <div className="cart-item-actions">
                <button
                  type="button"
                  onClick={() => decreaseItem(item.id)}
                  aria-label={`Decrease ${item.name} quantity`}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => increaseItem(item.id)}
                  aria-label={`Increase ${item.name} quantity`}
                >
                  +
                </button>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-checkout-section">
          <div className="cart-total">
            <span>Total:</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <button type="button" className="checkout-btn" onClick={checkout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </aside>
  );
}


