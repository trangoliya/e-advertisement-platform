import { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/api/users/profile");
        setUser(res.data.data);
        setName(res.data.data.name);
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, []);

  // Handle image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await api.put("/api/users/profile", formData);

      setUser(res.data.data);
      setPreview(null);
      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  // ✅ Cloudinary direct URL
  const avatarUrl =
    preview || user.avatar || `https://ui-avatars.com/api/?name=${user.name}`;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow mt-10">
      {/* Profile Info */}
      <div className="text-center">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border"
        />

        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleUpdate} className="mt-6 space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;