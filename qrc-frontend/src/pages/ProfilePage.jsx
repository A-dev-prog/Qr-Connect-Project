import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { createProfile, getMyProfile } from "../services/profileService";

function ProfilePage() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    contact: "",
    profession: "",
    bio: "",
    instagram: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    github: ""
  });

  // FETCH PROFILE FROM BACKEND
  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const data = await getMyProfile();

        setProfile({
          name: data.name || "",
          email: data.email || "",
          contact: data.contact || "",
          profession: data.profession || "",
          bio: data.bio || "",
          instagram: data.instagram || "",
          facebook: data.facebook || "",
          twitter: data.twitter || "",
          linkedin: data.linkedin || "",
          github: data.github || ""
        });

      } catch (err) {
        console.log("No profile found yet");
      }
    };

    fetchProfile();
  }, []);


  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const navigate = useNavigate();

const handleSubmit = async () => {
  try {

    await createProfile(profile);

    alert("Profile saved successfully");

    navigate("/qr"); // go to QR page

  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Topbar />

        <div className="flex-1 overflow-y-auto p-6">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* FORM */}
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-6">

              <h2 className="text-xl font-semibold mb-6">
                Create Your Profile
              </h2>

              <div className="space-y-4">

                <input name="name" value={profile.name} onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700"/>

                <input name="email" value={profile.email} onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700"/>

                <input name="contact" value={profile.contact} onChange={handleChange}
                  placeholder="Contact"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700"/>

                <input name="profession" value={profile.profession} onChange={handleChange}
                  placeholder="Profession"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700"/>

                <textarea name="bio" value={profile.bio} onChange={handleChange}
                  placeholder="Bio"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700"/>

                <input name="instagram" value={profile.instagram} onChange={handleChange}
                  placeholder="Instagram"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700"/>

                <input name="facebook" value={profile.facebook} onChange={handleChange}
                  placeholder="Facebook"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700"/>

                <input name="twitter" value={profile.twitter} onChange={handleChange}
                  placeholder="Twitter"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700"/>

                <input name="linkedin" value={profile.linkedin} onChange={handleChange}
                  placeholder="LinkedIn"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700"/>

                <input name="github" value={profile.github} onChange={handleChange}
                  placeholder="GitHub"
                  className="w-full p-3 bg-gray-800 rounded border border-gray-700"/>

              </div>

              <button
                onClick={handleSubmit}
                className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg w-full"
              >
                Save Profile
              </button>

            </div>

            {/* PREVIEW */}
            <div className="flex justify-center">

              <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-6">

                <div className="flex flex-col items-center">

                  <div className="w-24 h-24 bg-blue-600 rounded-full mb-4"></div>

                  <h3 className="text-xl font-semibold">
                    {profile.name || "Your Name"}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {profile.profession || "Profession"}
                  </p>

                </div>

                <p className="text-gray-400 text-sm mt-4 text-center">
                  {profile.bio || "Your bio will appear here"}
                </p>

                <div className="mt-6 space-y-2 text-sm text-gray-300">
                  <p>📧 {profile.email || "email@example.com"}</p>
                  <p>📞 {profile.contact || "+91 XXXXX XXXXX"}</p>
                </div>

                <div className="mt-6 border-t border-gray-800 pt-4">

                  {profile.instagram && (
                    <div className="flex items-center gap-3">
                      <FaInstagram/> Instagram
                    </div>
                  )}

                  {profile.facebook && (
                    <div className="flex items-center gap-3">
                      <FaFacebook/> Facebook
                    </div>
                  )}

                  {profile.twitter && (
                    <div className="flex items-center gap-3">
                      <FaTwitter/> Twitter
                    </div>
                  )}

                  {profile.linkedin && (
                    <div className="flex items-center gap-3">
                      <FaLinkedin/> LinkedIn
                    </div>
                  )}

                  {profile.github && (
                    <div className="flex items-center gap-3">
                      <FaGithub/> Github
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <MobileNav />

    </div>
  );
}

export default ProfilePage;