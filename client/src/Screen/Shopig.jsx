import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";

const Shopig = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products"); // Replace with actual API endpoint
        setProducts(response.data);
        setFilteredProducts(response.data);
        // Extract categories dynamically if available
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

  // Handle category filter
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  return (
    <Layout>
      <div class="header-info">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4">
              <div class="header-item">
                <img src="./src/img/icons/delivery.png" alt="" />
                <p>Free shipping on orders over $30 in USA</p>
              </div>
            </div>
            <div class="col-md-4 text-left text-lg-center">
              <div class="header-item">
                <img src="./src/img/icons/voucher.png" alt="" />
                <p>20% Student Discount</p>
              </div>
            </div>
            <div class="col-md-4 text-left text-xl-right">
              <div class="header-item">
                <img src="./src/img/icons/sales.png" alt="" />
                <p>30% off on dresses. Use code: 30OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="page-add">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="page-breadcrumb">
                <h2>
                  Dresses<span>.</span>
                </h2>
              </div>
            </div>
            <div className="col-lg-8">
              <img src="./src/img/add.jpg" alt="Advertisement" />
            </div>
          </div>
        </div>
      </section>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <section className="categories-page spad">
              <div className="container">
                {/* Category Filter */}
                <div className="categories-controls">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="categories-filter">
                        <div className="cf-left">
                          <select
                            className="sort"
                            value={selectedCategory}
                            onChange={(e) =>
                              handleCategoryChange(e.target.value)
                            }
                          >
                            {categories.map((category, index) => (
                              <option key={index} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="cf-right">
                          <span>{filteredProducts.length} Products</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Display */}
                <div className="row">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="col-lg-3 col-md-6">
                      <div className="single-product-item">
                        <figure>
                          <img src={product.image} alt={product.title} />
                          <div className={`p-status`}>{product.category}</div>
                        </figure>
                        <div className="product-text">
                          <a href="#">
                            <h6>{product.title}</h6>
                          </a>
                          <p>${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Shopig;
