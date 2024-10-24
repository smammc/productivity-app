import trash from "../../images/trash.png";
import "./TaskCard.css";
import { useContext, useState } from "react";

import { AuthContext } from "../../context/auth.context";

export default function TaskCard({
  task,
  deleteTask,
  index,
  updateTaskStatus,
}) {
  const { user } = useContext(AuthContext);
  const [taskStatus, setTaskStatus] = useState(task.status);

  // console.log("Inital status: ", taskStatus);

  const handleStatus = async () => {
    // Determine the new status before updating the state and backend
    const newStatus = taskStatus === "Ongoing" ? "Done" : "Ongoing";

    try {
      await updateTaskStatus(user._id, task._id, newStatus);
      setTaskStatus(newStatus);
    } catch (error) {
      console.log("Error updating task status: ", error);
    }
  };

  return (
    <div className="card-container" key={index}>
      <div className="first">
        {taskStatus === "Ongoing" && (
          <div className="uncomplete-button" onClick={handleStatus}></div>
        )}
        {taskStatus === "Done" && (
          <div className="complete-button" onClick={handleStatus}>
            <div className="complete-circle"></div>
          </div>
        )}
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
