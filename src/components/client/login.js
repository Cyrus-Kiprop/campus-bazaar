import React, { useState, useEffect } from "react";
import Axios from "axios";
import ls from "local-storage";

function Login(props) {
  // state
  const [authData, setauthData] = useState();

  // handler function
  const handleChange = event => {
    event.preventDefault();
    // const {name, value} = event.target;
    setauthData({
      ...authData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(authData);
    Axios.post(`/api/login`, authData).then(result => {
      console.log(result.data);
      // ls.set(("user", result.data.user.phone));
      localStorage.setItem("phone", result.data.user.phone);
      localStorage.setItem("id", result.data.user._id);

      // set the browser storage with the token
      // if (typeof result.data === Object) {
      props.history.push(`/products`);
      // } else {
      // console.log(result.data);
      // props.history.push(`/login`);
      // }
    });
  };

  console.log(authData);
  return (
    <div className="login-wrapper">
      <div className="form-wrapper">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={handleChange}
              placeholder="Email Account"
              name="email"
            />
          </div>
          <div className="password">
            <label htmlFor="phone">Password</label>
            <input
              type="password"
              className=""
              onChange={handleChange}
              placeholder="Password"
              name="password"
            />
          </div>
        </form>
        <button onClick={handleSubmit}>Log In</button>
        <a href="#!">
          <small>Forgot Password?</small>
        </a>
      </div>
    </div>
  );
}

export default Login;
