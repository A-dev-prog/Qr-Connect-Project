import api from "./api";

export const getTrendingFeed = async () => {
  const res = await api.get("/feed/trending");
  return res.data;
};

export const getLatestFeed = async () => {
  const res = await api.get("/feed/latest");
  return res.data;
};

export const createPost = async (content) => {
  const email = localStorage.getItem("email");

  const res = await api.post(
    `/feed/create?email=${email}&content=${content}`
  );

  return res.data;
};

export const getExternalFeed = async () => {
  const res = await api.get("/feed/external");
  return res.data;
};