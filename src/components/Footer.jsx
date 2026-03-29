import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>Amanttra</h2>
          <p>Natural organic superfood powders for a healthier life.</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Email: support@amanttra.com</p>
          <p>Phone: +91 9956491258</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Amanttra Organic. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;