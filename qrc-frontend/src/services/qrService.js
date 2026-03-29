import api from "./api";

export const generateQR = async () => {
  const response = await api.get("/qr/generate", {
    responseType: "blob", // important for image
  });

  return URL.createObjectURL(response.data);
};



// SCAN USER QR → calls backend /api/qr/scan/{userId}
export const scanUserQR = async (userId) => {
  const response = await api.get(`/qr/scan/${userId}`);
  return response.data;
};