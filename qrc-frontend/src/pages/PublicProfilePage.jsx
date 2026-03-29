import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendConnectionRequest } from "../services/connectionService";
import api from "../services/api";

function PublicProfilePage() {

  const { id } = useParams();
  if (!id || id === "undefined") {
  console.error("Invalid ID");
  return;
}

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [connectionStatus, setConnectionStatus] = useState("NONE");

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await api.get(`/profile/${id}`);

        setProfile(res.data);

        setConnectionStatus(res.data.connectionStatus); // ✅ GET STATUS FROM BACKEND

      } catch (err) {

        console.error(err);

      }

    };

    fetchProfile();

  }, [id]);



  const handleConnect = async () => {

    try {

      setLoading(true);

      await sendConnectionRequest(id);

      setConnectionStatus("PENDING"); // ✅ UPDATE UI WITHOUT RELOAD

      alert("Connection request sent");

    } catch (err) {

      console.error(err);

      alert("Failed");

    }

    setLoading(false);
  };
  // ✅ STEP 7 - Save Contact as vCard
const saveContact = () => {

  const vCard = `
BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
TEL:${profile.contactNumber}
END:VCARD
`;

  const blob = new Blob([vCard], { type: "text/vcard" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${profile.name}.vcf`;
  link.click();
};



  if (!profile) return <p className="text-white">Loading...</p>;



  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-gray-900 border border-gray-800 p-8 rounded-xl w-[350px]">

        <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4"></div>

        <h2 className="text-xl font-semibold text-center">
          {profile.name}
        </h2>

        <p className="text-gray-400 text-center">
          {profile.profession}
        </p>

        {/* ✅ LIMITED PROFILE INFO */}
        <p className="text-gray-400 text-center text-sm mt-2">
          {profile.bio}
        </p>

        {/* ✅ FULL PROFILE ONLY IF CONNECTED */}
        {connectionStatus === "ACCEPTED" && (
          <div className="mt-4 text-center text-sm text-gray-300">
            <p>Email: {profile.email}</p>
            <p>Phone: {profile.phone}</p>
          </div>
        )}

        {/* ✅ CONNECT BUTTON */}
        {connectionStatus === "NONE" && (
          <button
            onClick={handleConnect}
            disabled={loading}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
          >
            {loading ? "Sending..." : "Connect"}
          </button>
        )}

        {/* ✅ REQUEST PENDING */}
        {connectionStatus === "PENDING" && (
          <button
            disabled
            className="mt-6 w-full bg-gray-700 py-2 rounded-lg"
          >
            Request Sent
          </button>
        )}

        {/* ✅ CHAT BUTTON IF CONNECTED */}
        {connectionStatus === "ACCEPTED" && (
  <div className="mt-6 space-y-3">

    <button
      className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg"
    >
      Chat
    </button>

    {/* ✅ STEP 7 Save Contact */}
    <button
      onClick={saveContact}
      className="w-full border border-blue-500 text-blue-400 py-2 rounded-lg"
    >
      Save Contact
    </button>

  </div>
)}

      </div>

    </div>
  );
}

export default PublicProfilePage;