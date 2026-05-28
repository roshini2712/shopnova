import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Product from "./components/Product";
import Cart from "./components/Cart";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div style={styles.appContainer}>
          <Navbar />
          <main style={styles.mainContent}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <footer style={styles.footer} className="glass">
            <p>&copy; {new Date().getFullYear()} ShopNova. Handcrafted for a premium e-commerce experience.</p>
          </footer>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  mainContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  footer: {
    padding: "24px",
    textAlign: "center",
    fontSize: "0.85rem",
    color: "hsl(var(--text-secondary))",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
    marginTop: "auto",
  },
};

export default App;
