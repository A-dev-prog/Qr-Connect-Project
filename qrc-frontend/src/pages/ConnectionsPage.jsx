import { useEffect, useState } from "react";
import { getMyConnections } from "../services/connectionService";

function ConnectionsPage() {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      const data = await getMyConnections();
      setConnections(data);
    };

    fetchConnections();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Connections</h2>

      {connections.map((user) => (
        <div key={user.id} className="p-4 bg-gray-900 rounded mb-3">
          {user.name}
        </div>
      ))}
    </div>
  );
}

export default ConnectionsPage;