import doneIcon from "../../images/done.png";

import "./AddTaskPage.css";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

export default function AddTaskPage({ addTask }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [task, setTask] = useState("");

  const handleNewTask = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task) {
      alert("Please enter a new task");
      return;
    }

    addTask(user._id, task);
    setTask("");
    navigate(`/dashboard/${user._id}`);
  };
  return (
    <div className="new-task-container">
      <form>
        <div className="text-input">
          <input
            type="text"
            className="task"
            value={task}
            onChange={handleNewTask}
          />
        </div>
        <div className="button-container">
          <button>
            <img src={doneIcon} alt="submit-button" onClick={handleSubmit} />
          </button>
        </div>
      </form>
    </div>
  );
}
