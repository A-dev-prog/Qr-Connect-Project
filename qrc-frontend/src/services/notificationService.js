export const getNotifications = async (userId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:8080/api/notifications/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.json();
};