// src/HomePage.js
import React from "react";
import mainPic from "/mainPic.png";

const HomePage = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Chatty</h2>
        <div style={styles.navLinks}>
          <a href="#" style={styles.navLink}>
            Login
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.textContainer}>
          <h1 style={styles.title}>Have your best chat</h1>
          <p style={styles.subtitle}>Fast, easy & unlimited team chat.</p>
          <div style={styles.buttonContainer}>
            <button style={styles.button}>Try it Free</button>
            <button style={styles.buttonOutline}>Get a Demo</button>
          </div>
        </div>
        <div style={styles.imageContainer}>
          <img src={mainPic} alt="Chat illustration" style={styles.image} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#0056b3", // Change this color as needed
    padding: "10px 50px",
    color: "#ffffff",
    position: "fixed", // Make navbar fixed at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000, // Keep navbar on top of other elements
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "20px",
  },
  navLink: {
    // color: "#ffffff",
    // textDecoration: "none",
    // fontSize: "16px",
    // transition: "color 0.3s", // Add transition for hover effect

  },
  navLinkHover: {
    color: "#cccccc", // Lighter shade for hover effect
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#007bff", // Blue background
    backgroundColor: "#6c63ff",
    padding: "100px 50px 50px", // Add padding at the top to avoid overlap with navbar
    color: "#ffffff",
    minHeight: "100vh", // Ensure full viewport height
    boxSizing: "border-box", // Include padding in height
  },
  textContainer: {
    flex: 1,
    paddingRight: "20px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: "24px",
    margin: "20px 0",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  button: {
    backgroundColor: "#ffffff",
    color: "#007bff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    color: "#ffffff",
    border: "2px solid #ffffff",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
  imageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end", // Align the image to the right
    alignItems: "center",
    maxHeight: "400px", // Adjust max height to prevent scroll
    overflow: "hidden", // Hide overflow
  },
  image: {
    width: "80%",
    height: "auto", // Maintain aspect ratio
    objectFit: "contain", // Ensure the image scales correctly
  },
};

export default HomePage;
