import React, { useState } from "react";
import Layout from "../Layout/Layout";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    console.log(formData);
  };

  return (
    <>
      <Layout>
        {/* <!-- Header Info Begin --> */}
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
                    Contact us<span>.</span>
                  </h2>
                </div>
              </div>
              <div className="col-lg-8">
                <img src="./src/img/add.jpg" alt="Advertisement" />
              </div>
            </div>
          </div>
        </section>
        <div className="contact-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <div className="col-lg-12 text-right">
                      <button type="submit">Send message</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-3 offset-lg-1">
                <div className="contact-widget">
                  <div className="cw-item">
                    <h5>Location</h5>
                    <ul>
                      <li>1525 Awesome Lane, </li>
                      <li>Los Angeles, CA</li>
                    </ul>
                  </div>
                  <div className="cw-item">
                    <h5>Phone</h5>
                    <ul>
                      <li>+1 (603)535-4592</li>
                      <li>+1 (603)535-4556</li>
                    </ul>
                  </div>
                  <div className="cw-item">
                    <h5>E-mail</h5>
                    <ul>
                      <li>contact@violetstore.com</li>
                      <li>www.violetstore.com</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="map">
              <div className="row">
                <div className="col-lg-12">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26440.72384129847!2d-118.24906619231132!3d34.06719475913053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c659f50c318d%3A0xe2ffb80a9d3820ae!2sChinatown%2C%20Los%20Angeles%2C%20CA%2C%20USA!5e0!3m2!1sen!2sbd!4v1570213740685!5m2!1sen!2sbd"
                    height="560"
                    style={{ border: "0" }}
                    allowFullScreen=""
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Contact;
