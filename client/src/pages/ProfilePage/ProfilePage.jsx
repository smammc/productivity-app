import editIcon from "../../images/editPicture.png";
import "./ProfilePage.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth.context";

import axios from "axios";

function ProfilePage({ tasks, getTasks, updatePicture, profilePicture }) {
  const { user } = useContext(AuthContext);
  const { name, email, _id } = user;
  const [profilePic, setProfilePicture] = useState(profilePicture);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    getTasks(_id);
  }, []);

  const changeProfilePicture = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];

    if (file) {
      // setProfilePicture(file);
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }

    updatePicture(_id, file);
  };

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
      <div className="picture-container">
        <div className="picture">
          <img
            src={!imageUrl ? profilePic : imageUrl}
            alt="profile-pic"
            className="profile-pic"
          />
        </div>
        <div className="empty"></div>
        <div className="edit-button">
          <input
            type="file"
            id="upload"
            className="upload-input"
            accept="image/*"
            onChange={changeProfilePicture}
          />
          <label htmlFor="upload">
            <img
              src={editIcon}
              alt="edit-picture"
              className="edit-button"
              // onClick={changeProfilePicture}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
