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

//upload user image
export const uploadProfileImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/profile/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// update profile
export const updateProfile = async (profileData) => {
  const res = await api.put("/profile/update", profileData);
  return res.data;
};