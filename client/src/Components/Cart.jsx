import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout"; // Assuming you have a Layout component
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]); // State to hold the cart products
  const [shippingCost, setShippingCost] = useState(0); // Default shipping cost
  const [selectedShipping, setSelectedShipping] = useState(""); // Selected shipping method
  const navigate = useNavigate();

  // Fetch cart data from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Handle removing an item from the cart
  const removeFromCart = (productId, color, size) => {
    const updatedCart = cart.filter(
      (item) =>
        item.id !== productId || item.color !== color || item.size !== size
    );

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Update the state to reflect the changes
    setCart(updatedCart);
  };

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Handle shipping selection change
  const handleShippingChange = (shippingType) => {
    setSelectedShipping(shippingType);
    if (shippingType === "free") {
      setShippingCost(0); // Free shipping
    } else if (shippingType === "next-day") {
      setShippingCost(10); // $10 for next-day delivery
    } else if (shippingType === "pickup") {
      setShippingCost(0); // Free in-store pickup
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
                  Cart<span>.</span>
                </h2>
              </div>
            </div>
            <div className="col-lg-8">
              <img src="./src/img/add.jpg" alt="Advertisement" />
            </div>
          </div>
        </div>
      </section>

      {/* Page Add Section End */}

      {/* Cart Page Section Begin */}
      <div className="cart-page">
        <div className="container">
          <div className="cart-table">
            <table>
              <thead>
                <tr>
                  <th className="product-h">Product</th>
                  <th>Price</th>
                  <th className="quan">Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Your cart is empty.
                    </td>
                  </tr>
                ) : (
                  cart.map((item) => (
                    <tr key={`${item.id}-${item.color}-${item.size}`}>
                      <td className="product-col">
                        <img src={item.image} alt={item.title} />
                        <div className="p-title">
                          <h5>{item.title}</h5>
                        </div>
                      </td>
                      <td className="price-col">${item.price}</td>
                      <td className="quantity-col">
                        <div className="pro-qty">
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            readOnly
                          />
                        </div>
                      </td>
                      <td className="total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>
                      <td className="product-close">
                        <button
                          onClick={() =>
                            removeFromCart(item.id, item.color, item.size)
                          }
                        >
                          x
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="cart-btn">
            <div className="row">
              <div className="col-lg-6">
                <div className="coupon-input">
                  <input type="text" placeholder="Enter coupon code" />
                </div>
              </div>
              <div className="col-lg-5 offset-lg-1 text-left text-lg-right">
                <div className="site-btn clear-btn">Clear Cart</div>
                <div className="site-btn update-btn">Update Cart</div>
              </div>
            </div>
          </div>
        </div>

        {/* Shopping Method Section */}
        <div className="shopping-method">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shipping-info">
                  <h5>Choose a shipping method</h5>
                  <div className="chose-shipping">
                    <div className="cs-item">
                      <input
                        type="radio"
                        name="shipping"
                        id="free"
                        checked={selectedShipping === "free"}
                        onChange={() => handleShippingChange("free")}
                      />
                      <label
                        htmlFor="free"
                        className={selectedShipping === "free" ? "active" : ""}
                      >
                        Free Standard shipping
                        <span>Estimate for New York</span>
                      </label>
                    </div>
                    <div className="cs-item">
                      <input
                        type="radio"
                        name="shipping"
                        id="next-day"
                        checked={selectedShipping === "next-day"}
                        onChange={() => handleShippingChange("next-day")}
                      />
                      <label
                        htmlFor="next-day"
                        className={
                          selectedShipping === "next-day" ? "active" : ""
                        }
                      >
                        Next Day delivery $10
                      </label>
                    </div>
                    <div className="cs-item last">
                      <input
                        type="radio"
                        name="shipping"
                        id="pickup"
                        checked={selectedShipping === "pickup"}
                        onChange={() => handleShippingChange("pickup")}
                      />
                      <label
                        htmlFor="pickup"
                        className={
                          selectedShipping === "pickup" ? "active" : ""
                        }
                      >
                        In Store Pickup - Free
                      </label>
                    </div>
                  </div>
                </div>

                <div className="total-info">
                  <div className="total-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Total</th>
                          <th>Subtotal</th>
                          <th>Shipping</th>
                          <th className="total-cart">Total Cart</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="total">
                            ${calculateTotal().toFixed(2)}
                          </td>
                          <td className="sub-total">
                            ${calculateTotal().toFixed(2)}
                          </td>
                          <td className="shipping">${shippingCost}</td>
                          <td className="total-cart-p">
                            ${(calculateTotal() + shippingCost).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 text-right">
                      <button
                        className="primary-btn chechout-btn"
                        onClick={() => navigate("/checkout")}
                      >
                        Proceed to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Shopping Method Section End */}
      </div>
      {/* Cart Page Section End */}
    </Layout>
  );
};

export default Cart;
