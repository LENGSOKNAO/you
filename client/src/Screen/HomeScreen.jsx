import React from "react";
import Layout from "../Layout/Layout";
import Banner from "../Components/Home/Banner";
import CenterPage from "../Components/Home/CenterPage";
import Last from "../Components/Home/Last";
import Api from "../Api/Api";
import Bannerl from "../Components/Home/Bannerl";

const HomeScreen = () => {
  return (
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
      <Banner />
      <CenterPage />
      <Api />
      <Last />
      <Bannerl/>
    </Layout>
  );
};

export default HomeScreen;
