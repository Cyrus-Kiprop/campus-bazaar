import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import {
  saveProduct,
  getProduct,
  deleteProduct
} from "../../../api/productApi";

export default function AddProduct(props) {
  //one state for everything
  const [productData, setProductData] = useState({});
  // const [file, setFile] = useState();

  // const handleFile = event => {
  //   event.preventDefault();
  //   setFile({
  //     ...event.target.files
  //   });
  // };

  console.log(productData);

  // handler functions
  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    // handler function that updates the state
    setProductData({
      ...productData,
      [name]: value
      // UploadedFile: files
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(productData);
    const data = {
      ...productData
    };
    const response = await axios.post(`/api/addProduct`, data);
    console.log(response.data);
    console.log(props.history);
    props.history.push("/products");
  };

  return (
    <div className="container  add-product-container">
      <div className="Back">
        <i className="fa fa-arrow-left" />
      </div>
      <p className="h2 text-center">Add Product</p>
      <form onSubmit={handleSubmit}>
        {/* <div className="preview text-center">
          <img
            className="preview-img"
            src="http://simpleicon.com/wp-content/uploads/account.png"
            alt="Product"
            width={200}
            height={200}
          />
          <div className="browse-button">
            <i className="fa fa-pencil-alt" />
            <input
              className="browse-input"
              type="file"
              onChange={handleFile}
              required
              name="UploadedFile"
              id="UploadedFile"
            />
          </div>
          <span className="Error" />
        </div> */}

        <div className="form-group">
          <label>Image Url:</label>
          <input
            className="form-control"
            type="text"
            name="imageUrl"
            onChange={handleChange}
            required
            placeholder="Enter image url"
          />
          <span className="Error" />
        </div>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            className="form-control"
            type="text"
            name="productName"
            onChange={handleChange}
            required
            placeholder="Enter product name"
          />
          <span className="Error" />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            className="form-control"
            type="text"
            name="description"
            onChange={handleChange}
            required
            placeholder="Enter Your Description"
          />
          <span className="Error" />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input
            className="form-control"
            type="text"
            name="location"
            required
            onChange={handleChange}
            placeholder="Enter Location"
          />
          <span className="Error" />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            className="form-control"
            name="price"
            type="number"
            required
            onChange={handleChange}
            placeholder="Enter Price"
          />
          <span className="Error" />
        </div>

        <div className="form-group">
          <input
            className="btn btn-primary btn-block"
            type="submit"
            defaultValue="Submit"
          />
        </div>
      </form>
    </div>
  );
}
