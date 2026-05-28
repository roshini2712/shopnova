import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shipping = cartTotal > 100 || cartTotal === 0 ? 0 : 9.99;
  const estimatedTax = cartTotal * 0.08;
  const grandTotal = cartTotal + shipping + estimatedTax;

  const handleCheckout = () => {
    setCheckingOut(true);
    // Simulate a secure checkout processing
    setTimeout(() => {
      setCheckingOut(false);
      setSuccess(true);
      setOrderId("SN-" + Math.floor(100000 + Math.random() * 900000));
      clearCart();
    }, 1800);
  };

  if (success) {
    return (
      <div style={styles.container} className="fade-in">
        <div style={styles.successCard} className="glass">
          <div style={styles.successIcon}>✓</div>
          <h2 style={{ marginBottom: "12px" }}>Order Placed Successfully!</h2>
          <p style={{ color: "hsl(var(--text-secondary))", marginBottom: "8px" }}>
            Thank you for shopping with **ShopNova**. Your payment has been securely processed.
          </p>
          <p style={styles.orderNumber}>
            Order Reference: <strong style={{ color: "#a5b4fc" }}>{orderId}</strong>
          </p>
          <Link to="/" style={{ marginTop: "24px" }} className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div style={styles.container} className="fade-in">
        <div style={styles.emptyCard} className="glass">
          <span style={{ fontSize: "3rem", marginBottom: "16px", display: "block" }}>🛍️</span>
          <h2>Your basket is empty</h2>
          <p style={{ color: "hsl(var(--text-secondary))", marginTop: "8px", marginBottom: "24px" }}>
            Explore our collections and add premium products to your cart.
          </p>
          <Link to="/" className="btn-primary">
            Return to Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container} className="fade-in">
      <h2 style={styles.pageTitle}>Your Luxury Basket</h2>

      <div style={styles.layout}>
        {/* Left Side: Items List */}
        <div style={styles.itemsSection}>
          <div style={styles.itemsHeader}>
            <span>Products</span>
            <button onClick={clearCart} style={styles.clearBtn}>
              Clear Basket
            </button>
          </div>

          <div style={styles.itemsList}>
            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem} className="glass">
                <div style={styles.itemImageContainer}>
                  <img src={item.image} alt={item.title} style={styles.itemImage} />
                </div>
                
                <div style={styles.itemDetails}>
                  <span className="badge badge-indigo" style={styles.itemCategory}>
                    {item.category}
                  </span>
                  <h4 style={styles.itemTitle}>{item.title}</h4>
                  <span style={styles.itemPrice}>${item.price.toFixed(2)}</span>
                </div>

                <div style={styles.quantityControls}>
                  <button onClick={() => updateQuantity(item.id, -1)} style={styles.qtyBtn}>
                    -
                  </button>
                  <span style={styles.qtyValue}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} style={styles.qtyBtn}>
                    +
                  </button>
                </div>

                <div style={styles.itemTotalSection}>
                  <span style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</span>
                  <button onClick={() => removeFromCart(item.id)} className="btn-danger" style={styles.removeBtn}>
                    ✕ Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Order Summary Card */}
        <div style={styles.summarySection}>
          <div style={styles.summaryCard} className="glass">
            <h3 style={styles.summaryTitle}>Checkout Summary</h3>
            <hr style={styles.divider} />
            
            <div style={styles.summaryRow}>
              <span>Subtotal ({cart.reduce((t, i) => t + i.quantity, 0)} items)</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? <span style={{ color: "#10b981", fontWeight: "600" }}>FREE</span> : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Estimated Taxes (8%)</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>

            <hr style={styles.divider} />

            <div style={{ ...styles.summaryRow, fontWeight: "700", fontSize: "1.15rem", color: "#ffffff" }}>
              <span>Grand Total</span>
              <span style={{ color: "#a5b4fc" }}>${grandTotal.toFixed(2)}</span>
            </div>

            {shipping > 0 && (
              <p style={styles.shippingNotice}>
                💡 Add <strong style={{ color: "#818cf8" }}>${(100 - cartTotal).toFixed(2)}</strong> more for <strong>FREE shipping</strong>!
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="btn-primary"
              style={styles.checkoutBtn}
            >
              {checkingOut ? (
                <>
                  <div style={styles.miniSpinner}></div>
                  Processing Securely...
                </>
              ) : (
                "Proceed to Secure Checkout"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "1200px",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "32px 24px 64px 24px",
  },
  pageTitle: {
    fontSize: "2rem",
    fontWeight: "800",
    textAlign: "left",
    marginBottom: "32px",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: "32px",
    alignItems: "flex-start",
    "@media (max-width: 960px)": {
      gridTemplateColumns: "1fr",
    },
  },
  itemsSection: {
    display: "flex",
    flexDirection: "column",
  },
  itemsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "600",
    opacity: 0.8,
    marginBottom: "16px",
    padding: "0 8px",
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "#ff4d6d",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  cartItem: {
    display: "grid",
    gridTemplateColumns: "90px 1fr 120px 130px",
    gap: "20px",
    padding: "20px",
    borderRadius: "16px",
    alignItems: "center",
  },
  itemImageContainer: {
    width: "90px",
    height: "90px",
    background: "#ffffff",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
  itemImage: {
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain",
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    textAlign: "left",
  },
  itemCategory: {
    fontSize: "0.65rem",
    marginBottom: "6px",
  },
  itemTitle: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "6px",
    lineHeight: "1.4",
  },
  itemPrice: {
    fontSize: "0.9rem",
    color: "hsl(var(--text-secondary))",
    fontWeight: "500",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    background: "rgba(255, 255, 255, 0.03)",
    padding: "6px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.06)",
  },
  qtyBtn: {
    background: "none",
    border: "none",
    color: "#ffffff",
    fontSize: "1.2rem",
    cursor: "pointer",
    width: "24px",
    height: "24px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
    borderRadius: "4px",
    transition: "background 0.2s ease",
    ":hover": {
      background: "rgba(255,255,255,0.05)",
    },
  },
  qtyValue: {
    fontSize: "0.95rem",
    fontWeight: "700",
    minWidth: "20px",
    textAlign: "center",
  },
  itemTotalSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "8px",
  },
  itemTotal: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#a5b4fc",
  },
  removeBtn: {
    padding: "6px 12px",
    fontSize: "0.75rem",
    borderRadius: "6px",
  },
  summarySection: {
    width: "100%",
  },
  summaryCard: {
    padding: "28px",
    borderRadius: "20px",
    textAlign: "left",
    backgroundImage: "radial-gradient(circle at top left, hsl(var(--accent-indigo-glow)), transparent)",
  },
  summaryTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    marginBottom: "16px",
  },
  divider: {
    border: "none",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    margin: "16px 0",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.95rem",
    color: "hsl(var(--text-secondary))",
    marginBottom: "14px",
  },
  shippingNotice: {
    fontSize: "0.8rem",
    color: "hsl(var(--text-muted))",
    marginTop: "16px",
    background: "rgba(255, 255, 255, 0.02)",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.04)",
  },
  checkoutBtn: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    marginTop: "20px",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  miniSpinner: {
    width: "18px",
    height: "18px",
    border: "2px solid rgba(255, 255, 255, 0.15)",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 0.6s linear infinite",
  },
  emptyCard: {
    padding: "64px 32px",
    borderRadius: "24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  successCard: {
    padding: "64px 32px",
    borderRadius: "24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: "radial-gradient(circle at bottom center, hsl(var(--success) / 0.08), transparent)",
  },
  successIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "rgba(16, 185, 129, 0.15)",
    color: "#10b981",
    fontSize: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "24px",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)",
  },
  orderNumber: {
    fontSize: "0.95rem",
    color: "hsl(var(--text-secondary))",
    marginTop: "8px",
  },
};
