import homeIcon from "../../images/home.png";
import logoutIcon from "../../images/logout.png";
import profileIcon from "../../images/profile.png";

import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { logOutUser } = useContext(AuthContext);

  return (
    <nav>
      <div>
        <Link to="/">
          <img src={homeIcon} alt="dashboard" className="icon" />
        </Link>
      </div>
      <div>
        <Link to="/profile">
          <img src={profileIcon} alt="profile" className="icon" />
        </Link>
      </div>

      <div>
        <Link>
          <img
            src={logoutIcon}
            alt="logout"
            className="icon"
            onClick={logOutUser}
          />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
