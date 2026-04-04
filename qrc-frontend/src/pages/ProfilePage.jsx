import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import MobileNav from "../components/MobileNav";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import {
  createProfile,
  getMyProfile,
  uploadProfileImage,
  updateProfile,
} from "../services/profileService";

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
    github: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  // FETCH PROFILE
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
          github: data.github || "",
        });

        setIsProfileCreated(true);

        if (data.profileImageUrl) {
          setPreview(data.profileImageUrl);
        }

      } catch (err) {
        console.log("No profile found yet");
        setIsProfileCreated(false);
        setIsEditing(true); // 👉 auto open edit for new user
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT (CREATE / UPDATE)
  const handleSubmit = async () => {
    try {
      if (isProfileCreated) {
        await updateProfile(profile);
      } else {
        await createProfile(profile);
        setIsProfileCreated(true);
      }

      if (imageFile) {
        await uploadProfileImage(imageFile);
      }

      alert("Profile saved successfully ✅");

      setIsEditing(false);

    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
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
                {isProfileCreated ? "Your Profile" : "Create Your Profile"}
              </h2>

              <div className="space-y-4">

                {/* IMAGE */}
                <div>
                  <label className="cursor-pointer block">
                    <div className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl 
                      ${isEditing ? "border-gray-600 hover:border-blue-500" : "border-gray-700 opacity-60"}
                      bg-gray-800/40`}>

                      {preview ? (
                        <img
                          src={preview}
                          alt="preview"
                          className="w-20 h-20 rounded-full object-cover mb-2 border border-gray-600"
                        />
                      ) : (
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-700 mb-2">
                          📷
                        </div>
                      )}

                      <p className="text-sm text-gray-300">
                        {imageFile ? imageFile.name : "Upload profile image"}
                      </p>
                    </div>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={!isEditing}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* INPUTS */}
                {Object.keys(profile).map((key) => (
                  key !== "bio" ? (
                    <input
                      key={key}
                      name={key}
                      value={profile[key]}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder={key}
                      className={`w-full p-3 bg-gray-800 rounded border border-gray-700 
                        ${!isEditing && "opacity-60 cursor-not-allowed"}`}
                    />
                  ) : (
                    <textarea
                      key={key}
                      name={key}
                      value={profile[key]}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="Bio"
                      className={`w-full p-3 bg-gray-800 rounded border border-gray-700 
                        ${!isEditing && "opacity-60 cursor-not-allowed"}`}
                    />
                  )
                ))}

              </div>

              {/* BUTTONS */}
              <div className="mt-6 flex gap-3">

                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg"
                  >
                    {isProfileCreated ? "Edit Profile" : "Create Profile"}
                  </button>
                )}

                {isEditing && (
                  <>
                    <button
                      onClick={handleSubmit}
                      className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg"
                    >
                      Save
                    </button>

                    <button
                      onClick={handleCancel}
                      className="w-full bg-gray-700 hover:bg-gray-600 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </>
                )}

              </div>
            </div>

            {/* PREVIEW */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-6">
                
                <div className="flex flex-col items-center">
                  <img
                    src={preview || "https://via.placeholder.com/100"}
                    alt="profile"
                    className="w-24 h-24 rounded-full mb-4 object-cover border border-gray-700"
                  />

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

                <div className="mt-6 border-t border-gray-800 pt-4 space-y-2">
                  {profile.instagram && <div className="flex gap-2"><FaInstagram /> Instagram</div>}
                  {profile.facebook && <div className="flex gap-2"><FaFacebook /> Facebook</div>}
                  {profile.twitter && <div className="flex gap-2"><FaTwitter /> Twitter</div>}
                  {profile.linkedin && <div className="flex gap-2"><FaLinkedin /> LinkedIn</div>}
                  {profile.github && <div className="flex gap-2"><FaGithub /> Github</div>}
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