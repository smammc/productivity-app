import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    console.log("Stored token: ", storedToken);

    // If the token exists in the localStorage
    if (storedToken) {
      // Send a request to the server using axios
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log("User authenticated: ", response);
          // If the server verifies that JWT token is valid  ✅
          const user = response.data;
          // Update state variables
          setIsLoggedIn(true);
          setUser(user);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error during token verification: ", error);
          // If the server sends an error response (invalid token) ❌
          // Update state variables
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      // If the token is not available
      console.log("No token found.");
      setIsLoggedIn(false);
      setUser(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("isLoggedIn changed: ", isLoggedIn);
  }, [isLoggedIn]);

  // Keeps the user logged in after reloading the page
  useEffect(() => {
    authenticateUser();
  }, []);

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    // Upon logout, remove the token from the localStorage
    removeToken();
    authenticateUser();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
