// Separation of concerns; storing all of the CRUDE functions and exporting them.

import axios from "axios";

// Get Tasks
export const fetchTasks = async (id) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/todo/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching tasks: ", error);
  }
};

// Delete Task
export const deleteTask = (userId, taskId) => {
  try {
    const response = axios.delete(
      `${process.env.REACT_APP_SERVER_URL}/api/todo/${userId}/${taskId}`
    );
    return response;
  } catch (error) {
    console.log("Error deleting task: ", error);
  }
};

// Add Task
export const addTask = (userId, task) => {
  try {
    const response = axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/todo/${userId}`,
      { name: task }
    );
    return response;
  } catch (error) {
    console.log("Error creating task: ", error);
  }
};

// Change Task Status
export const changeTaskStatus = async (userId, taskId, status) => {
  // console.log("taskService: ", status);
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/api/todo/${userId}/${taskId}`,
      { status: status }
    );
    console.log("Updated:", response.data);
    return response.data;
  } catch (error) {
    console.log("Error completing task: ", error);
  }
};
