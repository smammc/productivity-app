import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    // Validate there is email password and name
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log("Signup successfull", response);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.log("Error signing up ", error);
        alert("An error occured during signup. Please try again.");
      });
  };

  return (
    <div className="SignupPage">
      <div className="title-container">
        <h1 className="title">Productivity App</h1>
      </div>
      <div className="motto">
        <p>
          A productivity app that helps you organize and prioritize your tasks
        </p>
      </div>
      <div className="signup-container">
        <div className="heading">Signup</div>

        <form onSubmit={handleSignupSubmit} className="signup-form">
          <input
            required=""
            class="input"
            type="name"
            name="name"
            id="name"
            placeholder="Name"
            value={name}
            onChange={handleName}
          />
          <input
            required=""
            class="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={handleEmail}
          />
          <input
            required=""
            class="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <button className="login-button" type="submit">
            Sign Up
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <hr className="signup-divider" />
        <p className="signup-text">
          Already have account? <Link to={"/"}> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
