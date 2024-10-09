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

    // const authToken = localStorage.getItem("authToken");
    axios
      .post(
        `${process.env.REACT_APP_SERVER_URL}/auth/signup`,
        requestBody /* {headers: { Authorization: `Bearer ${authToken}` },} */
      )
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
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleName} />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
