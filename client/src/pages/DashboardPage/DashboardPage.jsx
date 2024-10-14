import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import TaskCard from "../../components/Card/TaskCard";

export default function DashboardPage(props) {
  const { tasks } = props;

  // const { user } = useContext(AuthContext);
  // const { _id } = user;

  console.log("Dashboard: ", tasks);
  return (
    <div className="list-container">
      {tasks.map((task) => {
        return (
          <Link
            to={`/task/${task._id}`}
            key={task._id}
            style={{ textDecoration: "none" }}
          >
            <TaskCard task={task} />
          </Link>
        );
      })}
    </div>
  );
}
