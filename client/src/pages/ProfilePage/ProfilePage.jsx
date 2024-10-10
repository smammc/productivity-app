import picture from "../../images/home.png";
import "./ProfilePage.css";

function ProfilePage() {
  return (
    <div className="container">
      <div className="info">
        <h1>Nome</h1>
        <p>Email: </p>
        <p>Open Tasks: 0</p>
        <p>Closed Tasks: 0</p>
      </div>
      <div className="pic">
        <img src={picture} alt="profile-pic" className="profile-pic" />
      </div>
    </div>
  );
}

export default ProfilePage;
