import api from "./api";

// send request
export const sendConnectionRequest = async (receiverId) => {
  const res = await api.post("/connections/send", {
    receiverId: receiverId,
  });

  return res.data;
};

// get pending requests
export const getPendingRequests = async () => {
  const res = await api.get("/connections/pending");
  return res.data;
};

// respond to request
export const respondToRequest = async (id, accept) => {
  const res = await api.post(`/connections/respond/${id}?accept=${accept}`);
  return res.data;
};

export const getMyConnections = async () => {
  const res = await api.get("/connections/my-connections");
  return res.data;
};

// export const getMyMutualConnections = async () => {
//   const response = await api.get("/connections/my-connections");
//   return response.data;
// };