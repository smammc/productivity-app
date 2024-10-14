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
