import api from "./api";

export const registerUser = (userData) => {
  return api.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return api.post("/auth/login", userData);
};


export const getProfile = (token) => {
  return api.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (formData, token) => {

  const response = await api.put(
    "/auth/profile",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
   return response.data;
};


  export const removeProfileImage = async (token) => {
  return await api.delete(
    "/auth/profile-image",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

 

