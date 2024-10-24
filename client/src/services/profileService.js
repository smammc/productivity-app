import axios from "axios";

// Get profile info

export const getProfileInfo = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error retrieving profile info: ", error);
  }
};

// Change profile picture
export const updateProfilePicture = async (userId, file) => {
  try {
    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append("picture", file);

    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/user/${userId}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.log("Error updating profile picture: ", error);
  }
};
