import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart, FaLeaf } from "react-icons/fa";
import toast from "react-hot-toast";
import "./ProductCard.css";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: "#1a3a1f",
        color: "#95d5b2",
        border: "1px solid rgba(149,213,178,0.2)",
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.88rem",
      },
      iconTheme: {
        primary: "#52b788",
        secondary: "#1a3a1f",
      },
    });
  };

  return (
    <div className="product-card">

      {/* Image Area */}
      <Link to={`/product/${product.id}`} className="product-card-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
        />
        <div className="product-card-img-overlay">
          <span className="product-card-view">View Details</span>
        </div>
        <span className="product-card-badge">
          <FaLeaf /> Organic
        </span>
      </Link>

      {/* Info */}
      <div className="product-card-info">
        <div className="product-card-top">
          <h3 className="product-card-name">{product.name}</h3>
          <p className="product-card-price">₹{product.price}</p>
        </div>

        <p className="product-card-desc">
          100% pure & natural superfood powder
        </p>

        <button className="product-card-btn" onClick={handleAdd}>
          <FaShoppingCart className="product-card-btn-icon" />
          Add to Cart
        </button>
      </div>

    </div>
  );
}

export default ProductCard;