import React, { useState } from "react";
import Layout from "../Layout/Layout";
import axios from "axios";

const Shop = () => {
  const [pageDetails, setPageDetails] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch page details
    axios.get("http://localhost:3000/api/page-details").then((response) => {
      setPageDetails(response.data);
    });

    // Fetch products
    axios.get("http://localhost:3000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <Layout>
      <div>
        {pageDetails && (
          <section className="page-add">
            <div className="container">
              <div className="row">
                <div className="col-lg-4">
                  <div className="page-breadcrumb">
                    <h2>
                      {pageDetails.title}
                      <span>.</span>
                    </h2>
                    {pageDetails.breadcrumbs.map((breadcrumb, index) => (
                      <a
                        key={index}
                        href={breadcrumb.link}
                        className={breadcrumb.active ? "active" : ""}
                      >
                        {breadcrumb.name}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="col-lg-8">
                  <img src={pageDetails.bannerImage} alt="Banner" />
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="categories-page spad">
          <div className="container">
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="col-lg-3 col-md-6">
                  <div className="single-product-item">
                    <figure>
                      <img src={product.image} alt={product.name} />
                      <div className={`p-status ${product.status}`}>
                        {product.status}
                      </div>
                    </figure>
                    <div className="product-text">
                      <a href="#">
                        <h6>{product.name}</h6>
                      </a>
                      <p>${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Shop;
