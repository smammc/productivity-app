import trash from "../../images/trash.png";
import "./TaskCard.css";

export default function TaskCard({ task }) {
  //   console.log("Task Card: ", task);

  return (
    <div className="card-container">
      <div className="first">
        <div className="complete-button"></div>
      </div>
      <div className="second">
        <h3 className="card-title">{task.name}</h3>
      </div>
      <div className="third">
        <img src={trash} className="img" alt="trash-button" />
      </div>
    </div>
  );
}
