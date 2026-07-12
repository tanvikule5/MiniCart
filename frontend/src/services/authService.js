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

export const changePassword = async (
  passwordData,
  token
) => {
  return api.put(
    "/auth/change-password",
    passwordData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteAccount = async (password, token) => {
  return api.delete("/auth/delete-account", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      password,
    },
  });
};