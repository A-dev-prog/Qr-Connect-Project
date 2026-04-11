

export const getChatHistory = async (senderId, receiverId, page = 0) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `http://localhost:8080/ws/history?senderId=${senderId}&receiverId=${receiverId}&page=${page}&size=20`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) throw new Error("Failed to load messages");

  return res.json();
};