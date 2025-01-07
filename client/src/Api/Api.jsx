import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Api = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        // Extract categories dynamically
        const productCategories = [
          ...new Set(response.data.map((product) => product.category)),
          "All",
        ];
        setCategories(productCategories);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <section className="latest-products spad">
      <div className="container">
        <div className="product-filter">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-title">
                <h2>Latest Products</h2>
              </div>
              <ul className="product-controls">
                <li
                  className={activeCategory === "All" ? "active" : ""}
                  onClick={() => handleCategoryClick("All")}
                >
                  All
                </li>
                {categories.map((category) => (
                  <li
                    key={category}
                    className={activeCategory === category ? "active" : ""}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="row" id="product-list">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`col-lg-3 col-sm-6 mix all ${product.category.toLowerCase()}`}
            >
              <div className="single-product-item">
                <figure>
                  <Link to={`/page/${product.id}`}>
                    <img src={product.image} alt={product.title} />
                  </Link>
                  <div className="p-status">
                    {product.rating.rate >= 4 ? "popular" : "new"}
                  </div>
                </figure>
                <div className="product-text">
                  <h6>{product.title}</h6>
                  <p>${product.price}</p>
                  <button className="site-btn" onClick={() => handleGoToCart()}>
                    Go to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Api;
