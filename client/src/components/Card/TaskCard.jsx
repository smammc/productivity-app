import trash from "../../images/trash.png";
import "./TaskCard.css";
import { useContext } from "react";

import { AuthContext } from "../../context/auth.context";

export default function TaskCard({ task, deleteTask, index }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="card-container" key={index}>
      <div className="first">
        <div className="complete-button"></div>
      </div>
      <div className="second">
        <h3 className="card-title">{task.name}</h3>
      </div>
      <div className="third">
        <img
          src={trash}
          className="img"
          alt="trash-button"
          onClick={() => deleteTask(user._id, task._id)}
        />
      </div>
    </div>
  );
}
