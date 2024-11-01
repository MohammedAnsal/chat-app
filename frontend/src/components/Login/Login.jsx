import React, { useState } from "react";
import illus from "/illus.svg";
import "./Login.css";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  //  Handle SignIn :-

  const handleSignIn = async (e) => {
    e.preventDefault();
    setisLoading(true);

    if (!email || !password) {
      toast.warning("Please fill all the fields");
      setisLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };  

      const { data } = await axios.post("/user/sign-in", { email }, config);
      if (data) {
        toast.success("SignIn Successfully");
        localStorage.setItem('userAuth', JSON.stringify(data));
        setisLoading(false);
        navigate('/')
      } else {
        toast.warning("Somthing Went Wrong..");
        setisLoading(false);
      }
    } catch (error) {
      toast.error("Error Occured");
      setisLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-card">
        <div className="form-container">
          <h1 className="title">Login</h1>
          <p className="subtitle"></p>

          <form className="login-form">
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
                  type={show ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  placeholder="Enter your password"
                  required
                />
                <button
                  className="password-toggle"
                  onClick={handleClick}
                  type="button"
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="button" className="login-btn" onClick={handleSignIn}>
              {isLoading ? "Loading..." : "Login in now"}
            </button>

            <button
              className="gestUser"
              type="button"
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
