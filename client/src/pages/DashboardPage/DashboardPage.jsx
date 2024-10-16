import addButton from "../../images/add.png";
import "./DashboardPage.css";

import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import TaskCard from "../../components/Card/TaskCard";
import AddTaskPage from "../AddTask/AddTaskPage";

export default function DashboardPage(props) {
  const { tasks, deleteTask, updateTaskStatus } = props;

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
