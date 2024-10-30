import React, { useState } from "react";
import illus from "/illus.svg";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // Prevent default form submission
    setShow(!show);
  };

  const handleForm = (e) => {
    
    e.preventDefault()

  }

  return (
    <div className="container">
      <div className="login-card">
        <div className="form-container">
          <h1 className="title">Login</h1>
          <p className="subtitle"></p>

          <form className="login-form" onSubmit={handleForm}>

            <div className="input-group">

              <label htmlFor="email">Email</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                placeholder="Enter your email"
                required
              />

            </div>

            <div className="input-group password-group">

              <label htmlFor="password">Password</label>

              <div className="password-wrapper">

                <input
                  type={show ? "text" : "password"} // Change input type based on visibility
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  className="password-toggle"
                  onClick={handleClick}
                  type="button" // Prevents form submission on click
                >
                  {show ? "Hide" : "Show"}
                </button>

              </div>

            </div>

            <button type="submit" className="login-btn">
              Log in Now
            </button>

            <button
              className="gestUser"
              onClick={() => {
                setEmail("guest@example.com");
                setPassword("123456");
              }}
            >
              Get Guest User Credentials
            </button>

          </form>

          {/* Redirect to Sign Up */}
          <div className="form-switch">
            <p>
              Don't have an account?{" "}
              <span
                className="signup-link"
                onClick={() => (window.location.href = "/signUp")}
              >
                Sign Up Now
              </span>
            </p>
          </div>
        </div>
        <div className="image-container">
          <img src={illus} alt="A woman using a tablet" className="image" />
        </div>
      </div>
    </div>
  );
};

export default Login;
