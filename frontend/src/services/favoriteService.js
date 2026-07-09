import axios from "axios";

const API = "http://localhost:5000/api/favorites";

export const addFavorite = async (productId, token) => {
  return axios.post(
    `${API}/${productId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const getFavorites = async (token) => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFavorite = async (productId, token) => {
  return axios.delete(`${API}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};