import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout/Layout"; // Import Layout component
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("free");
  const [total, setTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [paymentComplete, setPaymentComplete] = useState(false); // Track if payment is successful
  const [qyt, setQyt] = useState(0); // Track total quantity
  const navigate = useNavigate();

  // Get cart items from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
    calculateTotal(cart);
    calculateQuantity(cart);
  }, []);

  // Calculate total price
  const calculateTotal = (cart) => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shipping = shippingMethod === "free" ? 0 : 10; // Example shipping cost
    setShippingCost(shipping);
    setTotal(subtotal + shipping);
  };

  // Calculate total quantity
  const calculateQuantity = (cart) => {
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    setQyt(totalQuantity); // Update total quantity
  };

  // Handle order placement after PayPal payment
  const handlePlaceOrder = () => {
    if (!paymentComplete) return; // Ensure payment is completed before navigating
    alert("Order placed successfully!");
    navigate("/thank-you");
  };

  return (
    <Layout>
      {/* Page Add Section */}
      <section className="page-add">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="page-breadcrumb">
                <h2>
                  Checkout<span>.</span>
                </h2>
              </div>
            </div>
            <div className="col-lg-8">
              <img src="./src/img/add.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* Cart Total Section */}
      <section className="cart-total-page spad">
        <div className="container">
          <form className="checkout-form">
            <div className="row">
              <div className="col-lg-12">
                <h3>Your Information</h3>
              </div>
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-2">
                    <p className="in-name">Name*</p>
                  </div>
                  <div className="col-lg-5">
                    <input type="text" placeholder="First Name" />
                  </div>
                  <div className="col-lg-5">
                    <input type="text" placeholder="Last Name" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2">
                    <p className="in-name">Street Address*</p>
                  </div>
                  <div className="col-lg-10">
                    <input type="text" placeholder="Address Line 1" />
                    <input type="text" placeholder="Address Line 2" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2">
                    <p className="in-name">Country*</p>
                  </div>
                  <div className="col-lg-10">
                    <select className="cart-select country-usa">
                      <option>USA</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2">
                    <p className="in-name">City*</p>
                  </div>
                  <div className="col-lg-10">
                    <input type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2">
                    <p className="in-name">Post Code/ZIP*</p>
                  </div>
                  <div className="col-lg-10">
                    <input type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-2">
                    <p className="in-name">Phone*</p>
                  </div>
                  <div className="col-lg-10">
                    <input type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 text-right">
                    <div className="diff-addr">
                      <input type="radio" id="one" />
                      <label htmlFor="one">Ship to different address</label>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cart Summary Section */}
              <div className="col-lg-3">
                <div className="order-table">
                  <div className="cart-item">
                    <span>Product</span>
                    {cartItems.map((item) => (
                      <p key={item.id} className="product-name">
                        {item.title}
                      </p>
                    ))}
                  </div>
                  <div className="cart-item">
                    <span>Price</span>
                    {cartItems.map((item) => (
                      <p key={item.id}>${item.price}</p>
                    ))}
                  </div>
                  <div className="cart-item">
                    <span>Quantity</span>
                    <p>{qyt}</p>
                  </div>
                  <div className="cart-item">
                    <span>Shipping</span>
                    <p>${shippingCost}</p>
                  </div>
                  <div className="cart-total">
                    <span>Total</span>
                    <p>${total.toFixed(2)}</p>
                  </div>
                </div>
                {/* PayPal Payment Button */}
                <div className="paypal-button">
                  <PayPalScriptProvider
                    options={{
                      "client-id":
                        " AUGGkV2vkifRYo1bWlPLvb54m9HTFBkSgB7KKQU2903azVCTgUs_6ZZ32HMOupH9Kvl20VIdSNlJwMqX",
                    }}
                  >
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: total.toFixed(2),
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order.capture().then(() => {
                          setPaymentComplete(true); // Mark payment as complete
                          handlePlaceOrder();
                        });
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
