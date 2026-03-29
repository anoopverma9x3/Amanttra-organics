import products from "../data/products"
import ProductCard from "./ProductCard"

function ProductsPreview(){
  return(
    <section className="products-section">

      <h2>Our Products</h2>

      <div className="product-grid">

        {products.slice(0,10).map((product)=>(
          <ProductCard key={product.id} product={product}/>
        ))}

      </div>

    </section>
  )
}

export default ProductsPreview