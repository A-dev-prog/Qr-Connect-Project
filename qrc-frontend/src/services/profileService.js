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

export const getProfileImage = (user) => {
  if (user?.profileImageUrl) {
    return user.profileImageUrl.startsWith("http")
      ? user.profileImageUrl
      : `http://localhost:8080/${user.profileImageUrl}`;
  }

  return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=random`;
};

// ai 
export const generateAISummary = async (userId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:8080/api/profile/generate-summary/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to generate summary");

  return res.json();


};