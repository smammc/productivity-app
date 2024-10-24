import addButton from "../../images/add.png";
import "./DashboardPage.css";

import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import TaskCard from "../../components/Card/TaskCard";
import { AuthContext } from "../../context/auth.context";

export default function DashboardPage(props) {
  const { tasks, getTasks, deleteTask, updateTaskStatus } = props;

  const { user } = useContext(AuthContext);

  const { _id } = user;

  useEffect(() => {
    getTasks(_id);
  }, []);

  // console.log("Dashboard: ", tasks);
  return (
    <div className="container">
      <div className="list-container">
        {tasks.map((task, index) => {
          return (
            <TaskCard
              key={task._id || index}
              task={task}
              deleteTask={deleteTask}
              index={index}
              updateTaskStatus={updateTaskStatus}
            />
          );
        })}
      </div>
      <div className="add-container">
        <Link to={"/add-task"}>
          <img src={addButton} alt="add-task" />
        </Link>
      </div>
    </div>
  );
}
