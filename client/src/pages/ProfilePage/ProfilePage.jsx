import defaultPicture from "../../images/defaultPicture.png";
import "./ProfilePage.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context";

function ProfilePage() {
  const { user } = useContext(AuthContext);

  const { name, email } = user;

  return (
    <div className="container">
      <div className="info">
        <h1>{`${name}`}</h1>
        <p>Email: {`${email}`} </p>
        <p>Open Tasks: 0</p>
        <p>Closed Tasks: 0</p>
      </div>
      <div className="pic">
        <img src={defaultPicture} alt="profile-pic" className="profile-pic" />
      </div>
    </div>
  );
}

export default ProfilePage;
