import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaTrash, FaLeaf, FaArrowLeft } from "react-icons/fa";
import "./Cart.css";

function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">

      {/* Header */}
      <div className="cart-header">
        <div className="cart-header-inner">
          <span className="cart-eyebrow">Review & Checkout</span>
          <h1 className="cart-title">Your <em>Cart</em></h1>
          {cart.length > 0 && (
            <p className="cart-count-label">{totalItems} item{totalItems !== 1 ? "s" : ""} in your cart</p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="cart-body">

        {/* Empty State */}
        {cart.length === 0 && (
          <div className="cart-empty">
            <div className="cart-empty-icon">🌿</div>
            <h2 className="cart-empty-title">Your cart is empty</h2>
            <p className="cart-empty-text">
              Looks like you haven't added any superfoods yet.
            </p>
            <Link to="/shop" className="cart-shop-link">
              Browse Products
            </Link>
          </div>
        )}

        {/* Cart Content */}
        {cart.length > 0 && (
          <div className="cart-layout">

            {/* Items */}
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item.id}>

                  {/* Image */}
                  <div className="cart-item-img-wrap">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                  </div>

                  {/* Info */}
                  <div className="cart-item-info">
                    <span className="cart-item-badge"><FaLeaf /> Organic</span>
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-unit">₹{item.price} / unit</p>
                  </div>

                  {/* Qty Controls */}
                  <div className="cart-item-qty">
                    <button
                      className="qty-btn"
                      onClick={() => decreaseQty(item.id)}
                      aria-label="Decrease"
                    >−</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => increaseQty(item.id)}
                      aria-label="Increase"
                    >+</button>
                  </div>

                  {/* Subtotal */}
                  <p className="cart-item-subtotal">
                    ₹{(Number(item.price) * item.quantity).toLocaleString()}
                  </p>

                  {/* Remove */}
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <FaTrash />
                  </button>

                </div>
              ))}

              {/* Back to shop */}
              <Link to="/shop" className="cart-back-link">
                <FaArrowLeft /> Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="cart-summary">
              <h2 className="cart-summary-title">Order Summary</h2>

              <div className="cart-summary-rows">
                {cart.map((item) => (
                  <div className="cart-summary-row" key={item.id}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{(Number(item.price) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="cart-summary-divider" />

              <div className="cart-summary-row cart-summary-total">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>

              <p className="cart-summary-note">
                🌿 Free shipping on orders above ₹499
              </p>

              <button className="cart-checkout-btn">
                Proceed to Checkout
              </button>

              <p className="cart-secure-note">🔒 Secure & encrypted checkout</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;