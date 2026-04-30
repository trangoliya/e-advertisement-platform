import { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const baseUrl = "https://e-advertisement-platform.onrender.com";

  useEffect(() => {
    api.get("/api/users/profile").then((res) => {
      setUser(res.data.data);
      setName(res.data.data.name);
    });
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    const res = await api.put("/api/users/profile", formData);

    setUser(res.data.data);
    alert("Profile updated!");
  };

  if (!user) return <p>Loading...</p>;

  const avatarUrl = user.avatar
    ? `${baseUrl}${user.avatar}`
    : `https://ui-avatars.com/api/?name=${user.name}`;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow mt-10">
      <div className="text-center">
        <img
          src={avatarUrl}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />

        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      <form onSubmit={handleUpdate} className="mt-6 space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;