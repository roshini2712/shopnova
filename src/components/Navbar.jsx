import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount, searchQuery, setSearchQuery } = useCart();
  const location = useLocation();

  // Only show the search bar on the Home page
  const isHomePage = location.pathname === "/";

  return (
    <nav style={styles.nav} className="glass">
      <div style={styles.navContainer}>
        <Link to="/" style={styles.logo} onClick={() => setSearchQuery("")}>
          Shop<span style={styles.logoAccent}>Nova</span>
        </Link>

        {isHomePage ? (
          <div style={styles.searchWrapper}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Search premium catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.searchInput}
            />
            {searchQuery && (
              <button style={styles.clearSearch} onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>
        ) : (
          <div style={{ flex: 1 }}></div>
        )}

        <Link to="/cart" style={styles.cartBtn} className="btn-secondary">
          <span style={styles.cartIcon}>🛒</span>
          <span style={styles.cartText}>Cart</span>
          {cartCount > 0 && (
            <span style={styles.cartBadge} key={cartCount}>
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  },
  navContainer: {
    width: "1200px",
    maxWidth: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
  },
  logo: {
    fontFamily: "'Outfit', sans-serif",
    fontSize: "1.75rem",
    fontWeight: "800",
    color: "#ffffff",
    textDecoration: "none",
    letterSpacing: "-1px",
    display: "flex",
    alignItems: "center",
    transition: "transform 0.2s ease",
  },
  logoAccent: {
    background: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  searchWrapper: {
    position: "relative",
    flex: "0 1 500px",
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    position: "absolute",
    left: "14px",
    fontSize: "0.9rem",
    opacity: 0.6,
    pointerEvents: "none",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 42px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    fontSize: "0.95rem",
    color: "#ffffff",
    transition: "all 0.3s ease",
  },
  clearSearch: {
    position: "absolute",
    right: "14px",
    background: "none",
    border: "none",
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: "0.85rem",
    cursor: "pointer",
    padding: "4px",
  },
  cartBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "10px 18px",
    fontSize: "0.95rem",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    background: "rgba(255, 255, 255, 0.03)",
    transition: "all 0.3s ease",
  },
  cartIcon: {
    fontSize: "1.1rem",
  },
  cartText: {
    fontWeight: "500",
  },
  cartBadge: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    color: "#ffffff",
    fontSize: "0.75rem",
    fontWeight: "700",
    minWidth: "20px",
    height: "20px",
    padding: "0 6px",
    borderRadius: "9999px",
    animation: "cart-bounce 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
  },
};
