import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth.context";

const TaskContext = React.createContext();

function TaskProviderWrapper() {
  // Extract UserId from user info
  const { user, isLoggedIn } = useContext(AuthContext);
  const { _id } = user;

  const [tasks, setTasks] = useState(null);
  console.log(tasks);

  // Get tasks from user if is logged in
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/api//todo/${_id}`
        );
        const data = await response.json();
        // console.log(data);
        setTasks(data);
      } catch (error) {
        console.log("Error fetching tasks: ", error);
      }
    };
    fetchTasks();
  }, [_id]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}></TaskContext.Provider>
  );
}

export { TaskContext, TaskProviderWrapper };
