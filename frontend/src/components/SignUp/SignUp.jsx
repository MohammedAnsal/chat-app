import React, { useState } from "react";
import illus from "/illus.svg";
import "./SignUp.css";

const SignUp = () => {

  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [show, setshow] = useState(false)
  const [loading, isLoading] = useState(false);

  return (

    <div className="signUp-container">
      
      <div className="signUp-card">
        <div className="signUp-form-container">
          <h1 className="signUp-title">Sign Up</h1>

          <p className="signUp-subtitle">
            {/* Let's get this party started! */}
          </p>

          <form className="signUp-form">

            <div className="signUp-input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" placeholder="Username" required/>
            </div>

            <div className="signUp-input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Email" required/>
            </div>

            <div className="signUp-input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Password" required/>
            </div>

            <button type="submit" className="signUp-btn">
              SignUp Now 
            </button>

          </form>

          {/* Redirect to login */}
          <div className="form-switch">

            <p>
              Already have an account?{" "}
              <span
                className="login-link"
                onClick={() => (window.location.href = "/login")}
              >
                Sign In Now
              </span>
            </p>

          </div>

        </div>

        <div className="signUp-image-container">

          <img
            src={illus}
            alt="A woman using tablet"
            className="signUp-image"
          />

        </div>

      </div>
    </div>
  );
};

export default SignUp;
