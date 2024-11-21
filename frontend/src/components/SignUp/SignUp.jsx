import React, { useState } from "react";
import illus from "/illus.svg";
import "./SignUp.css";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [show, setshow] = useState(false);
  const [pics, setPics] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Upload Image :-
  const imageUpload = (image) => {
    setIsLoading(true);

    if (!image) {
      toast.custom("Please select an image");
      setIsLoading(false);
      return;
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "chatt-app");
      data.append("cloud_name", "dujykhkai");

      fetch("https://api.cloudinary.com/v1_1/dujykhkai/image/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Failed to upload image. Please check your network."
            );
          }
          return response.json();
        })
        .then((data) => {
          setPics(data.url.toString());
          setIsLoading(false);
          toast.success("Image uploaded successfully!");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("Image upload failed. Please try again.");
        });
    } else {
      toast.warning("Only JPEG or PNG files are allowed!");
      setIsLoading(false);
    }
  };

  // Handle SignUp :-
  const handleSignUp = async (e) => {
    e.preventDefault(); 
    setIsLoading(true);

    if (!name || !email || !password) {
      toast.warning("Please fill all the fields");
      setIsLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/user/sign-up",
        { name, email, password, pics },
        config
      );

      setIsLoading(true )
      console.log(data);

      toast.success("Registration Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setIsLoading(false);
      navigate("/");
    } catch (error) {
       console.log(error.response?.data || error.message);
       toast.error("Error Occurred!");
       setIsLoading(false);
    }
  };

  return (
    <div className="signUp-container">
      <div className="signUp-card">
        <div className="signUp-form-container">
          <h1 className="signUp-title">Sign Up</h1>

          <p className="signUp-subtitle">
            {/* Let's get this party started! */}
          </p>

          <form className="signUp-form" onSubmit={handleSignUp}>
            <div className="signUp-input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <div className="signUp-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="signUp-input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <div className="image-upload-container">
              <p>Upload Image</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => imageUpload(e.target.files[0])}
              />
            </div>

            <button type="submit" className="signUp-btn" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign Up Now"}
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
