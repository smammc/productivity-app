import "./HomePage.css";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import axios from "axios";

function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, isLoading, isLoggedIn, authenticateUser, user } =
    useContext(AuthContext);

  // Get user _id if logged in
  const _id = isLoggedIn && user ? user._id : null;

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Validate there is email and password
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const userCredentials = { email, password };

    // Send a request to the server using axios
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, userCredentials)
      .then((response) => {
        // Save token in localstorage
        const token = response.data.authToken;
        storeToken(token);
        // Authenticate user
        authenticateUser();
        console.log("Login successful: ", response);
      })
      .catch((error) => {
        console.error("Error loggin in: ", error);
        alert("Login failed. Please check your credentials");
      });
  };

  // Redirect to dashboard when the user successfully logs in
  useEffect(() => {
    console.log("useEffect triggered. isLoggedIn:", isLoggedIn);

    // Ensure both `isLoggedIn` is true and `user._id` exists before navigating
    if (isLoggedIn) {
      navigate(`/dashboard/`);
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <div className="title-container">
        <h1 className="title">Productivity App</h1>
      </div>
      <div className="motto">
        <p>
          A productivity app that helps you organize and prioritize your tasks
        </p>
      </div>
      <div className="login-container">
        <div className="heading">Sign In</div>
        <form onSubmit={handleLoginSubmit} className="login-form">
          <input
            required=""
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            onChange={handleEmail}
          />
          <input
            required=""
            className="input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handlePassword}
          />
          <button className="login-button" type="submit">
            Log in
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <hr className="login-divider" />
        <div className="signup">
          <p className="signup-text">
            Don't have an account? <Link to={"/signup"}> Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
