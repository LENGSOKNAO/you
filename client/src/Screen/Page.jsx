import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout"; // Import Layout component
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Page = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null); // Product data
  const [quantity, setQuantity] = useState(1); // Quantity selected by the user
  const [selectedColor, setSelectedColor] = useState("red"); // Default color selection
  const [selectedSize, setSelectedSize] = useState("M"); // Default size selection
  const [relatedProducts, setRelatedProducts] = useState([]); // State to hold related products
  const [cartItems, setCartItems] = useState([]); // Cart items from localStorage
  const navigate = useNavigate();

  // Fetch product data from API based on product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data); // Set product data
      } catch (err) {
        console.error("Failed to fetch product details:", err);
      }
    };
    fetchProduct();
  }, [id]); // Run the effect when the product ID changes

  // Fetch related products from the API
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setRelatedProducts(response.data.slice(0, 4)); // Display only 4 related products
      } catch (err) {
        console.error("Failed to fetch related products:", err);
      }
    };
    fetchRelatedProducts();
  }, []); // Run this effect once when the component mounts

  // Get cart items from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []); // Run this effect only once when the component mounts

  // Handle adding the product to the cart
  const addToCart = () => {
    if (!product) return; // Check if product is available

    const newProduct = {
      ...product,
      quantity,
      color: selectedColor,
      size: selectedSize,
    };

    // Get the existing cart from localStorage or create a new one if empty
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product with the same color and size exists in the cart
    const existingProductIndex = storedCart.findIndex(
      (item) =>
        item.id === product.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );

    if (existingProductIndex !== -1) {
      // If the product exists, update the quantity
      storedCart[existingProductIndex].quantity += quantity;
    } else {
      // If the product doesn't exist, add it to the cart
      storedCart.push(newProduct);
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(storedCart));

    // Navigate to the checkout page
    navigate("/Cart");
  };

  // Loading state if the product is still being fetched
  if (!product) return <div>Loading...</div>;

  // Calculate total quantity of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header className="header-section">
        <div className="container-fluid">
          <div className="inner-header">
            <div className="logo">
              <Link to="/">
                <img src="../src/img/logo.png" alt="Logo" />
              </Link>
            </div>
            <div className="header-right">
              <img
                src="../src/img/icons/search.png"
                alt="Search"
                className="search-trigger"
              />
              <img src="../src/img/icons/man.png" alt="User" />
              <Link to="/cart">
                <img src="../src/img/icons/bag.png" alt="Bag" />
                <span>{totalItems}</span>
              </Link>
            </div>
            <div className="user-access">
              <Link to="#">Register</Link>
              <Link to="#" className="in">
                Sign in
              </Link>
            </div>
            <nav className="main-menu mobile-menu">
              <ul>
                <li>
                  <Link className="active" to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>

                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <div class="header-info">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4">
              <div class="header-item">
                <img src="../src/img/icons/delivery.png" alt="" />
                <p>Free shipping on orders over $30 in USA</p>
              </div>
            </div>
            <div class="col-md-4 text-left text-lg-center">
              <div class="header-item">
                <img src="../src/img/icons/voucher.png" alt="" />
                <p>20% Student Discount</p>
              </div>
            </div>
            <div class="col-md-4 text-left text-xl-right">
              <div class="header-item">
                <img src="../src/img/icons/sales.png" alt="" />
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
                Shirts<span>.</span>
                </h2>
              </div>
            </div>
            <div className="col-lg-8">
              <img src="../src/img/add.jpg" alt="Advertisement" />
            </div>
          </div>
        </div>
      </section>
      {/* Product Page Section */}
      <section className="product-page">
        <div className="container">
          <div className="product-control">
            <a href="#">Previous</a>
            <a href="#">Next</a>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="product-img">
                <figure>
                  <img src={product.image} alt={product.title} />
                  <div className="p-status">new</div>
                </figure>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="product-content">
                <h2>{product.title}</h2>
                <div className="pc-meta">
                  <h5>${product.price}</h5>
                  <div className="rating">
                    {[...Array(5)].map((_, index) => (
                      <i key={index} className="fa fa-star"></i>
                    ))}
                  </div>
                </div>
                <p>{product.description}</p>
                <ul className="tags">
                  <li>
                    <span>Category :</span> Men’s Wear
                  </li>
                  <li>
                    <span>Tags :</span> man, shirt, dotted, elegant, cool
                  </li>
                </ul>
                <div className="product-quantity">
                  <div className="pro-qty">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, Number(e.target.value)))
                      }
                    />
                  </div>
                </div>
                <a
                  href="#"
                  className="primary-btn pc-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart();
                  }}
                >
                  Add to cart
                </a>
                <ul className="p-info">
                  <li>Product Information</li>
                  <li>Reviews</li>
                  <li>Product Care</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Product Section */}
      <section className="related-product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-title">
                <h2>Related Products</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="col-lg-3 col-sm-6">
                <div className="single-product-item">
                  <figure>
                    <a href="#">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                      />
                    </a>
                    <div className="p-status">
                      {relatedProduct.category === "sale" ? "sale" : "new"}
                    </div>
                  </figure>
                  <div className="product-text">
                    <h6>{relatedProduct.title}</h6>
                    <p>${relatedProduct.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <footer class="footer-section spad">
        <div class="container">
          <div class="newslatter-form">
            <div class="row">
              <div class="col-lg-12">
                <form action="#">
                  <input type="text" placeholder="Your email address" />
                  <button type="submit">Subscribe to our newsletter</button>
                </form>
              </div>
            </div>
          </div>
          <div class="footer-widget">
            <div class="row">
              <div class="col-lg-3 col-sm-6">
                <div class="single-footer-widget">
                  <h4>About us</h4>
                  <ul>
                    <li>About Us</li>
                    <li>Community</li>
                    <li>Jobs</li>
                    <li>Shipping</li>
                    <li>Contact Us</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="single-footer-widget">
                  <h4>Customer Care</h4>
                  <ul>
                    <li>Search</li>
                    <li>Privacy Policy</li>
                    <li>2019 Lookbook</li>
                    <li>Shipping & Delivery</li>
                    <li>Gallery</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="single-footer-widget">
                  <h4>Our Services</h4>
                  <ul>
                    <li>Free Shipping</li>
                    <li>Free Returnes</li>
                    <li>Our Franchising</li>
                    <li>Terms and conditions</li>
                    <li>Privacy Policy</li>
                  </ul>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6">
                <div class="single-footer-widget">
                  <h4>Information</h4>
                  <ul>
                    <li>Payment methods</li>
                    <li>Times and shipping costs</li>
                    <li>Product Returns</li>
                    <li>Shipping methods</li>
                    <li>Conformity of the products</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="social-links-warp">
          <div class="container">
            <div class="social-links">
              <a href="" class="instagram">
                <i class="fa fa-instagram"></i>
                <span>instagram</span>
              </a>
              <a href="" class="pinterest">
                <i class="fa fa-pinterest"></i>
                <span>pinterest</span>
              </a>
              <a href="" class="facebook">
                <i class="fa fa-facebook"></i>
                <span>facebook</span>
              </a>
              <a href="" class="twitter">
                <i class="fa fa-twitter"></i>
                <span>twitter</span>
              </a>
              <a href="" class="youtube">
                <i class="fa fa-youtube"></i>
                <span>youtube</span>
              </a>
              <a href="" class="tumblr">
                <i class="fa fa-tumblr-square"></i>
                <span>tumblr</span>
              </a>
            </div>
          </div>

          <div class="container text-center pt-5">
            Copyright &copy;
            <script>document.write(new Date().getFullYear());</script> All
            rights reserved | This template is made with{" "}
            <i class="icon-heart color-danger" aria-hidden="true"></i> by{" "}
            <a href="https://colorlib.com" target="_blank">
              Colorlib
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Page;
