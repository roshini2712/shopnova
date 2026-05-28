import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { searchQuery, addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Get unique categories list
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={styles.container} className="fade-in">
      {/* Hero Section */}
      <section style={styles.hero} className="glass">
        <h1 style={styles.heroTitle}>
          Elevate Your <span style={styles.heroHighlight}>Shopping</span> Experience
        </h1>
        <p style={styles.heroSub}>
          Explore our handpicked curation of exceptional, top-tier products designed for your modern lifestyle.
        </p>
      </section>

      {/* Category Filter Bar */}
      <div style={styles.filterSection}>
        <h3 style={styles.sectionTitle}>Discover Collections</h3>
        <div style={styles.categoryBar}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? "btn-primary" : "btn-secondary"}
              style={{
                ...styles.categoryBtn,
                padding: "8px 18px",
                fontSize: "0.85rem",
                borderRadius: "20px",
                textTransform: "capitalize",
              }}
            >
              {cat === "all" ? "All Collections" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div style={styles.loaderContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loaderText}>Loading the curated catalog...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={styles.noResults} className="glass">
          <h3>No products match your search</h3>
          <p style={{ marginTop: "8px", opacity: 0.7 }}>Try adjusting your search query or collection filter!</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map((p) => (
            <div key={p.id} className="glass-card" style={styles.card}>
              <div style={styles.imageContainer}>
                <img src={p.image} alt={p.title} style={styles.img} />
                <span className="badge badge-indigo" style={styles.categoryBadge}>
                  {p.category}
                </span>
              </div>

              <div style={styles.cardContent}>
                <h4 style={styles.productTitle} title={p.title}>
                  {p.title.length > 35 ? p.title.slice(0, 35) + "..." : p.title}
                </h4>
                
                <div style={styles.priceRow}>
                  <span style={styles.price}>${p.price.toFixed(2)}</span>
                  <div style={styles.rating}>
                    <span style={styles.star}>★</span>
                    <span style={styles.rateText}>{p.rating?.rate || "4.5"}</span>
                  </div>
                </div>

                <div style={styles.actions}>
                  <Link to={`/product/${p.id}`} className="btn-secondary" style={styles.viewBtn}>
                    View Info
                  </Link>
                  <button onClick={() => addToCart(p)} className="btn-primary" style={styles.addBtn}>
                    + Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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
  hero: {
    padding: "48px 32px",
    borderRadius: "24px",
    textAlign: "center",
    marginBottom: "40px",
    backgroundImage: "radial-gradient(circle at top right, hsl(var(--accent-indigo-glow)), transparent)",
  },
  heroTitle: {
    fontSize: "2.75rem",
    lineHeight: "1.15",
    marginBottom: "16px",
    fontWeight: "800",
  },
  heroHighlight: {
    background: "linear-gradient(135deg, #818cf8 0%, #c084fc 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontSize: "1.1rem",
    maxWidth: "600px",
    margin: "0 auto",
    color: "hsl(var(--text-secondary))",
    lineHeight: "1.5",
  },
  filterSection: {
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    marginBottom: "16px",
    textAlign: "left",
    fontWeight: "600",
    opacity: 0.9,
  },
  categoryBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "flex-start",
  },
  categoryBtn: {
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "24px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    height: "100%",
  },
  imageContainer: {
    position: "relative",
    height: "200px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  },
  img: {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
  },
  categoryBadge: {
    position: "absolute",
    bottom: "12px",
    left: "12px",
    backdropFilter: "blur(4px)",
    fontSize: "0.65rem",
    backgroundColor: "rgba(13, 16, 27, 0.8)",
  },
  cardContent: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  productTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "hsl(var(--text-primary))",
    marginBottom: "12px",
    textAlign: "left",
    lineHeight: "1.4",
  },
  priceRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  price: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#a5b4fc",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  star: {
    color: "#f59e0b",
    fontSize: "0.9rem",
  },
  rateText: {
    fontSize: "0.85rem",
    fontWeight: "600",
    color: "hsl(var(--text-secondary))",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  viewBtn: {
    flex: "1 1 50%",
    fontSize: "0.85rem",
    padding: "10px",
    borderRadius: "10px",
  },
  addBtn: {
    flex: "1 1 50%",
    fontSize: "0.85rem",
    padding: "10px",
    borderRadius: "10px",
  },
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 0",
  },
  spinner: {
    width: "48px",
    height: "48px",
    border: "4px solid rgba(255, 255, 255, 0.05)",
    borderTop: "4px solid #818cf8",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  loaderText: {
    marginTop: "20px",
    color: "hsl(var(--text-secondary))",
    fontWeight: "500",
  },
  noResults: {
    padding: "60px 24px",
    borderRadius: "20px",
    textAlign: "center",
  },
};

// Add standard rotate animation in styles
const styleSheet = document.styleSheets[0];
try {
  styleSheet.insertRule(`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, styleSheet.cssRules.length);
} catch (e) {
  // If stylesheet is not accessible, fallback
}
