import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";
import { useCart } from "../CartContext.jsx";
import CartSidebar from "./CartSidebar.jsx";

function NavItem({ to, children }) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? "active" : undefined)}
      >
        {children}
      </NavLink>
    </li>
  );
}

export default function Layout() {
  const { cartCount, toggleCart } = useCart();
  const { currentUser, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header>
        <nav>
          <div
            className="logo"
            role="button"
            tabIndex={0}
            onClick={() => navigate("/")}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate("/");
            }}
          >
            <img src="/logoFinal.png" alt="QuickByte" className="logo-image" />
            <span className="logo-text">QuickByte</span>
          </div>
          <ul className="nav-links">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            {!isLoggedIn && (
              <>
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/signup">Sign Up</NavItem>
              </>
            )}
            {isLoggedIn && (
              <li className="welcome-cluster">
                <span className="welcome-text">
                  Welcome, {currentUser?.name}
                </span>
                <button type="button" className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
          </ul>
          <button
            type="button"
            className="cart-icon"
            onClick={toggleCart}
            aria-label="Open cart"
          >
            🛒 <span className="cart-count">{cartCount}</span>
          </button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/logoFinal.png" alt="QuickByte" className="footer-logo" />
            <span className="brand-text">QuickByte</span>
          </div>
          <ul className="footer-links">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>
            {isLoggedIn ? (
              <li className="welcome-text">Logged in as {currentUser?.name}</li>
            ) : (
              <>
                <NavItem to="/login">Login</NavItem>
                <NavItem to="/signup">Sign Up</NavItem>
              </>
            )}
          </ul>
          <p className="footer-copy">
            © {new Date().getFullYear()} QuickByte. All rights reserved. Made
            with ❤️ in India
          </p>
        </div>
      </footer>

      <CartSidebar />
    </>
  );
}


