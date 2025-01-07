import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [cartItems, setCartItems] = useState([]);

  // Get cart items from localStorage
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  // Calculate total quantity of items in the cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header className="header-section">
      <div className="container-fluid">
        <div className="inner-header">
          <div className="logo">
            <Link to="/">
              <img src="./src/img/logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="header-right">
            <img
              src="./src/img/icons/search.png"
              alt="Search"
              className="search-trigger"
            />
            <img src="./src/img/icons/man.png" alt="User" />
            <Link to="/cart">
              <img src="./src/img/icons/bag.png" alt="Bag" />
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
  );
};

export default Nav;
