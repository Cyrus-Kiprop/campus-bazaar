import React, { useState, useEffect } from "react";
import "./Products.css";

import {
  saveProduct,
  getProduct,
  deleteProduct
} from "../../../api/productApi";

export default function Products() {
  const [data, setData] = useState([]);

  // fetching data from the local database
  useEffect(() => {
    getProduct(`/api/getProducts`).then(fetchedData => {
      // console.log(fetchedData);
      setData([...fetchedData]);
    });
  }, []);

  console.log(data);

  return (
    <div className="container">
      <h3 className="h3">All Products </h3>
      <div className="row">
        {data &&
          data.map(product => {
            return (
              <div className="col-md-3 col-sm-6">
                <div className="product-grid6">
                  <div className="product-image6">
                    <a href="#">
                      <img className="pic-1" src={product.imageUrl} />
                    </a>
                  </div>
                  <div className="product-content">
                    <h3 className="title">
                      <a href="#">{product.productName}</a>
                    </h3>
                    <div className="price">
                      {product.price}
                      {/* <span>$14.00</span> */}
                    </div>
                    <div className="description">
                      <p>{product.description}</p>
                    </div>
                  </div>
                  <ul className="social">
                    <li>
                      <a href data-tip="Quick View">
                        <i class="fas fa-search"></i>
                      </a>
                    </li>
                    <li>
                      <a href data-tip="Add to Wishlist">
                        <i className="fa fa-shopping-bag" />
                      </a>
                    </li>
                    <li>
                      <a href data-tip="Add to Cart">
                        <i className="fa fa-shopping-cart" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}{" "}
      </div>
    </div>
  );
}
