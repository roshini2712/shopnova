import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loaderText}>Fetching product specifications...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.container} className="fade-in">
        <div style={styles.errorCard} className="glass">
          <h3>Product Not Found</h3>
          <p style={{ marginTop: "12px", opacity: 0.7 }}>
            The requested product specifications could not be retrieved.
          </p>
          <Link to="/" className="btn-primary" style={{ marginTop: "24px" }}>
            Return to Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container} className="fade-in">
      <Link to="/" style={styles.backLink}>
        <span style={{ fontSize: "1.1rem" }}>←</span> Back to Catalog
      </Link>

      <div style={styles.grid} className="glass">
        {/* Left Side: Product Image Display */}
        <div style={styles.imageSection}>
          <div style={styles.imgWrapper}>
            <img src={product.image} alt={product.title} style={styles.image} />
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Actions */}
        <div style={styles.detailsSection}>
          <div style={styles.header}>
            <span className="badge badge-indigo" style={{ marginBottom: "12px" }}>
              {product.category}
            </span>
            <h2 style={styles.title}>{product.title}</h2>
            
            <div style={styles.ratingRow}>
              <div style={styles.stars}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      color: i < Math.round(product.rating?.rate || 0) ? "#f59e0b" : "rgba(255,255,255,0.15)",
                      marginRight: "2px",
                      fontSize: "1.1rem"
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span style={styles.ratingText}>
                {product.rating?.rate || "4.5"} ({product.rating?.count || 120} verified reviews)
              </span>
            </div>
          </div>

          <hr style={styles.divider} />

          <div style={styles.pricing}>
            <span style={styles.priceLabel}>Premium Price</span>
            <span style={styles.price}>${product.price.toFixed(2)}</span>
          </div>

          <div style={styles.infoBlock}>
            <h4 style={styles.infoTitle}>Product Overview</h4>
            <p style={styles.description}>{product.description}</p>
          </div>

          <hr style={styles.divider} />

          <div style={styles.actions}>
            <button
              onClick={handleAddToCart}
              className="btn-primary"
              style={{
                ...styles.cartBtn,
                background: added
                  ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                  : "linear-gradient(135deg, hsl(var(--accent-indigo)) 0%, hsl(var(--accent-violet)) 100%)",
              }}
            >
              <span style={{ marginRight: "8px" }}>🛒</span>
              {added ? "Added to Cart ✓" : "Add to Shopping Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "1000px",
    maxWidth: "100%",
    margin: "0 auto",
    padding: "32px 24px 64px 24px",
  },
  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    color: "hsl(var(--text-secondary))",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "500",
    marginBottom: "24px",
    transition: "color 0.2s ease",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    borderRadius: "24px",
    overflow: "hidden",
    backgroundImage: "radial-gradient(circle at bottom left, hsl(var(--accent-violet-glow)), transparent)",
  },
  imageSection: {
    background: "#ffffff",
    padding: "48px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "450px",
  },
  imgWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    maxWidth: "100%",
    maxHeight: "350px",
    objectFit: "contain",
  },
  detailsSection: {
    padding: "48px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  header: {
    marginBottom: "24px",
    textAlign: "left",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    lineHeight: "1.25",
    color: "#ffffff",
    marginBottom: "16px",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  stars: {
    display: "flex",
  },
  ratingText: {
    fontSize: "0.85rem",
    fontWeight: "500",
    color: "hsl(var(--text-secondary))",
  },
  divider: {
    border: "none",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    margin: "24px 0",
  },
  pricing: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "24px",
  },
  priceLabel: {
    fontSize: "0.8rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "1px",
    color: "hsl(var(--text-muted))",
    marginBottom: "6px",
  },
  price: {
    fontSize: "2.25rem",
    fontWeight: "800",
    color: "#a5b4fc",
  },
  infoBlock: {
    textAlign: "left",
  },
  infoTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: "10px",
  },
  description: {
    fontSize: "0.95rem",
    lineHeight: "1.6",
    color: "hsl(var(--text-secondary))",
  },
  actions: {
    display: "flex",
  },
  cartBtn: {
    width: "100%",
    padding: "16px",
    borderRadius: "14px",
    fontSize: "1.05rem",
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "120px 0",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(255, 255, 255, 0.05)",
    borderTop: "4px solid #a855f7",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loaderText: {
    marginTop: "20px",
    color: "hsl(var(--text-secondary))",
    fontWeight: "500",
  },
  errorCard: {
    padding: "48px 32px",
    borderRadius: "20px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};
