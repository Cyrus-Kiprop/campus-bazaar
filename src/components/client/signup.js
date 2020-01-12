import React, {Component} from "react";

class Signup extends Component{
  render(){
    return(
      <div className="login-wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form>
            <div className="firstname">
              <label htmlFor="firstname">Full Name</label>
              <input type="text"
                     className=""
                     placeholder="First Name"
                     type="text"
                     name="firstname"/>

            </div>
            {/* <div className="lastname">
              <label htmlFor="lastname">Last Name</label>
              <input type="text"
                     className=""
                     placeholder="Last Name"
                     type="text"
                     name="Lastname"/>

            </div> */}
            <div className="email">
              <label htmlFor="email">Email</label>
              <input type="email"
                     className=""
                     placeholder="Email Account"
                     type="text"
                     name="email"/>

            </div>
            <div className="id">
              <label htmlFor="id">Id Number</label>
              <input type="id"
                     className=""
                     placeholder="ID Number"
                     type="text"
                     name="id"/>

            </div>
            <div className="phone">
              <label htmlFor="phone">Phone Number</label>
              <input type="number"
                     className=""
                     placeholder="Phone Number"
                     type="number"
                     name="phone"/>

            </div>
            <div className="password">
              <label htmlFor="phone">Password</label>
              <input type="password"
                     className=""
                     placeholder="Password"
                     type="text"
                     name="password"/>

            </div>
            {/* <div className="passcode">
              <label htmlFor="phone">Re- Password</label>
              <input type="text"
                     className=""
                     placeholder="Password"
                     type="number"
                     name="passcode"/>

            </div> */}
            <div className="createAccount">
            <button type="submit">Create Account</button>
            <small>Already Have an Account?</small></div>
          </form>
          </div>
          

          </div>
      
    )
  }
}

export default Signup;
 