import "@fontsource/roboto-mono";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import AddTaskPage from "./pages/AddTask/AddTaskPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import TaskCard from "./components/Card/TaskCard";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/auth.context";

import { fetchTasks, deleteTask, addTask } from "./services/tasksService";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoggedIn, user } = useContext(AuthContext);

  // Get user _id if logged in
  const _id = isLoggedIn && user ? user._id : null;

  // Get user tasks
  useEffect(() => {
    if (_id) {
      fetchTasks(_id).then((data) => setTasks(data));
    }
  }, [_id]);

  // Delete task
  const removeTask = (userId, taskId) => {
    deleteTask(userId, taskId)
      .then(() => {
        setTasks(tasks.filter((task) => task._id !== taskId));
      })
      .catch((error) => console.log("Error deleting task: ", error));
  };

  // New task
  const newTask = (userId, task) => {
    addTask(userId, task)
      .then((newTask) => {
        console.log("APP: ", newTask);
        setTasks([...tasks, newTask.data]);
      })
      .catch((error) => console.log("Error creating task: ", error));
  };

  return (
    <div className="App">
      {isLoggedIn && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <IsAnon>
              <HomePage />
            </IsAnon>
          }
        />

        <Route
          path={`/profile/:userId`}
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />

        <Route
          path={`/dashboard/:userId`}
          element={
            <IsPrivate>
              <DashboardPage tasks={tasks} deleteTask={removeTask} />
            </IsPrivate>
          }
        />

        <Route
          path={`/task/:taskId`}
          element={
            <IsPrivate>
              <TaskCard />
            </IsPrivate>
          }
        />

        <Route
          path={`/add-task`}
          element={
            <IsPrivate>
              <AddTaskPage addTask={newTask} />
            </IsPrivate>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
