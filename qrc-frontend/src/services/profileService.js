import api from "./api";

// CREATE PROFILE
export const createProfile = async (profileData) => {
  const response = await api.post("/profile/create", profileData);
  return response.data;
};

// GET LOGGED IN USER PROFILE
export const getMyProfile = async () => {
  const response = await api.get("/profile/me");
  return response.data;
};

// GET PROFILE BY ID (for QR scan)
export const getProfileById = async (id) => {
  const response = await api.get(`/profile/${id}`);
  return response.data;
};