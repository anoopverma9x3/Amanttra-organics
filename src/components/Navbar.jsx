import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${!isHome || scrolled ? "navbar--solid" : ""}`}>
      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">
          <img src="/images/logo2.png" alt="Amanttra Organic" />
        </Link>
      </div>

      {/* Desktop Nav Links */}
      <ul className="navbar-links">
        {["/", "/shop", "/about"].map((path, i) => {
          const labels = ["Home", "Shop", "About"];
          return (
            <li key={path}>
              <Link
                to={path}
                className={`navbar-link ${isActive(path) ? "active" : ""}`}
              >
                {labels[i]}
                <span className="navbar-link-dot" />
              </Link>
            </li>
          );
        })}

        {!user && (
          <>
            <li>
              <Link to="/login" className={`navbar-link ${isActive("/login") ? "active" : ""}`}>
                Login
                <span className="navbar-link-dot" />
              </Link>
            </li>
            <li>
              <Link to="/register" className="navbar-register-btn">
                Get Started
              </Link>
            </li>
          </>
        )}

        {user && (
          <li>
            <button className="navbar-logout-btn" onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>

      {/* Right: Cart + Hamburger */}
      <div className="navbar-right">
        <Link to="/cart" className="navbar-cart">
          <FaShoppingCart />
          {cart.length > 0 && (
            <span className="navbar-cart-count">{cart.length}</span>
          )}
        </Link>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar-mobile ${menuOpen ? "open" : ""}`}>
        <ul className="navbar-mobile-links">
          {[{ path: "/", label: "Home" }, { path: "/shop", label: "Shop" }, { path: "/about", label: "About" }].map(({ path, label }) => (
            <li key={path}>
              <Link to={path} className={`navbar-mobile-link ${isActive(path) ? "active" : ""}`}>
                {label}
              </Link>
            </li>
          ))}

          {!user && (
            <>
              <li><Link to="/login" className="navbar-mobile-link">Login</Link></li>
              <li><Link to="/register" className="navbar-mobile-link accent">Get Started</Link></li>
            </>
          )}

          {user && (
            <li>
              <button className="navbar-mobile-logout" onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;