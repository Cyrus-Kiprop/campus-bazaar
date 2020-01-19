import React, { useEffect, useState } from "react";
import "./AddProduct.css";
import axios from "axios";
import {
  saveProduct,
  getProduct,
  deleteProduct
} from "../../../api/productApi";
import ImageUpload from "./imageUpload";

export default function AddProduct(props) {
  //one state for everything
  const [productData, setProductData] = useState({});
  const [dropDownValue, setDropDown] = useState("");
  const [files, setFiles] = useState();

  const handleDropdown = event => {
    let selectedValue = event.target.value;
    console.log([...dropDownValue]);

    setDropDown(selectedValue);
  };

  // console.log(productData);

  console.log(files);

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
    const formData = new FormData();
    console.log(productData);
    const data = {
      ...productData,
      category: dropDownValue
    };
    formData.append("image", files);

    console.log(formData);
    const response = await (axios.post(`/api/addProduct`, formData, {
      header: { "Content-Type": "multipart/form-data" }
    }) && axios.post(`/api/addProduct`, data));
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
        <ImageUpload files={files} setFiles={setFiles} />

        <select
          name="customSearch"
          className="custom-search-select"
          onChange={handleDropdown}
        >
          <option>Category</option>
          <option>Laptops</option>
          <option>Phones</option>
          <option>Clothes</option>
        </select>

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
