import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { sendConnectionRequest } from "../services/connectionService";
import api from "../services/api";
import toast from "react-hot-toast";
import BackButton from "../components/BackButton";

function PublicProfilePage() {

   const navigate = useNavigate();
  const { id } = useParams();
  

  // ✅ STATE (TOP ALWAYS)
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("NONE");
  

  // ✅ SINGLE CLEAN useEffect
  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await api.get(`/profile/${id}`);
      console.log("API RESPONSE:", res.data); // 🔥 DEBUG

      setProfile(res.data);
      setConnectionStatus(res.data.connectionStatus);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    }
  };

  fetchProfile();
}, [id]);

  // ✅ SEND CONNECTION REQUEST
  const handleConnect = async () => {
    try {
      setLoading(true);

      await sendConnectionRequest(id);

      setConnectionStatus("PENDING");
      toast.success("Connection request sent");

    } catch (err) {
      console.error(err);
      toast.error("Failed to send connection request");
    }
    setLoading(false);
  };

  // ✅ SAVE CONTACT (vCard)
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

  // ✅ LOADING UI
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl w-full max-w-md shadow-xl">

        {/* ✅ PROFILE IMAGE */}
       <img
  src={
    profile?.profileImageUrl
      ? profile.profileImageUrl
      : "https://via.placeholder.com/100"
  }
  alt="profile"
  className="w-24 h-24 rounded-full object-cover border border-gray-700"
/>

        {/* ✅ BASIC INFO */}
        <h2 className="text-xl font-semibold text-center">
          {profile.name}
        </h2>

        <p className="text-gray-400 text-center">
          {profile.profession}
        </p>

        <p className="text-gray-400 text-center text-sm mt-2">
          {profile.bio}
        </p>

        {/* ✅ FULL PROFILE IF CONNECTED */}
        {connectionStatus === "ACCEPTED" && (
          <div className="mt-6 space-y-3 text-sm text-gray-300 text-center">

            <p>Email: {profile.email}</p>
            <p>Phone: {profile.contactNumber}</p>

            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-blue-400 block">
                GitHub
              </a>
            )}

            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-400 block">
                LinkedIn
              </a>
            )}

            {profile.instagram && (
              <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-400 block">
                Instagram
              </a>
            )}

            {profile.twitter && (
              <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-400 block">
                Twitter
              </a>
            )}

            {profile.facebook && (
              <a href={profile.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500 block">
                Facebook
              </a>
            )}
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

        {/* ✅ PENDING BUTTON */}
        {connectionStatus === "PENDING" && (
          <button
            disabled
            className="mt-6 w-full bg-gray-700 py-2 rounded-lg"
          >
            Request Sent
          </button>
        )}

        {/* ✅ CONNECTED ACTIONS */}
        {connectionStatus === "ACCEPTED" && (
          <div className="mt-6 space-y-3">

            <button
             onClick={() => navigate(`/chat/${id}`)}
             className="w-full bg-emerald-600 hover:bg-emerald-700 py-2 rounded-lg">
              Chat
            </button>

            <button
              onClick={saveContact}
              className="w-full border border-blue-500 text-blue-400 py-2 rounded-lg"
            >
              Save Contact
            </button>

          </div>
        )}

        {/* ✅ WORK / POSTS SECTION 
        {connectionStatus === "ACCEPTED" && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-3 text-center">
              Work / Posts
            </h3>

            <div className="space-y-3">

              <div className="p-3 bg-white/10 border border-white/20 rounded-lg">
                <p className="text-sm">
                  Built QR-based connection app using Spring Boot & React 🚀
                </p>
              </div>

              <div className="p-3 bg-white/10 border border-white/20 rounded-lg">
                <p className="text-sm">
                  Working on AI-based healthcare assistant 🤖
                </p>
              </div>

            </div>
          </div>
        )} */}

      </div>

    </div>
  );
}

export default PublicProfilePage;