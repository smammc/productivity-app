import "@fontsource/roboto-mono";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import TaskCard from "./components/Card/TaskCard";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/auth.context";

import { fetchTasks } from "./services/tasksService";

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
              <DashboardPage tasks={tasks} />
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
      </Routes>
    </div>
  );
}

export default App;
