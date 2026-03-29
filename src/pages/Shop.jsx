import products from "../data/products";
import ProductCard from "../components/ProductCard";
import "./Shop.css";

function Shop() {
  return (
    <div className="shop">

      {/* Page Header */}
      <div className="shop-header">
        <div className="shop-header-inner">
          <span className="shop-eyebrow">Handpicked for You</span>
          <h1 className="shop-title">Our <em>Products</em></h1>
          <p className="shop-subtitle">
            Pure, organic superfood powders — no additives, no compromise.
          </p>
          <div className="shop-header-line" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="shop-body">
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}

export default Shop;