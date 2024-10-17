import defaultPicture from "../../images/defaultPicture.png";
import "./ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";

function ProfilePage({ tasks, getTasks }) {
  const { user } = useContext(AuthContext);

  const { name, email, _id } = user;

  useEffect(() => {
    getTasks(_id);
  }, []);

  console.log("Profile: ", tasks);

  return (
    <div className="profile-container">
      <div className="info">
        <h1>{`${name}`}</h1>
        <p>Email: {`${email}`} </p>
        <p>
          Open Tasks: {tasks.filter((task) => task.status === "Ongoing").length}
        </p>
        <p>
          Closed Tasks:{" "}
          {tasks.filter((task) => task.status !== "Ongoing").length}
        </p>
      </div>
      <div className="pic">
        <img src={defaultPicture} alt="profile-pic" className="profile-pic" />
      </div>
    </div>
  );
}

export default ProfilePage;
