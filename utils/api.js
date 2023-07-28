import axios from "axios";

export const getUserNameById = async (id) => {
  try {
    const response = await axios.get(
      `https://still-inlet-25058-4d5eca4f4cea.herokuapp.com/api/users/${id}`
    );
    console.log(response.data.displayName);
    return toString(response.data.displayName);
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
  }
};
