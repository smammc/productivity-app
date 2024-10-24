import tasksIcon from "../../images/tasks.png";
import logoutIcon from "../../images/logout.png";
import profileIcon from "../../images/profile.png";

import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { logOutUser, user } = useContext(AuthContext);
  const { _id } = user;

  return (
    <nav>
      <div>
        <Link to={`/dashboard/:${_id}`}>
          <img src={tasksIcon} alt="dashboard" className="icon" />
        </Link>
      </div>
      <div>
        <Link to={`/profile/:${_id}`}>
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
