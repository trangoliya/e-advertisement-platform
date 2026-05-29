import { useEffect, useState } from "react";
import api from "../../services/api";

const Profile = () => {
  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [bio, setBio] = useState("");

  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  //  LOAD PROFILE (AUTO-FILL)
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/api/users/profile");
        const data = res.data.data;

        setUser(data);

        // AUTO-FILL (IMPORTANT)
        setName(data.name || "");
        setAge(data.age || "");
        setCity(data.city || "");
        setInterests(data.interests || "");
        setCompanyName(data.companyName || "");
        setBio(data.bio || "");
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("age", age);
      formData.append("city", city);
      formData.append("interests", interests);
      formData.append("companyName", companyName);
      formData.append("bio", bio);

      if (avatar) {
        formData.append("avatar", avatar);
      }

      const res = await api.put("/api/users/profile", formData);

    
      setUser(res.data.data);

      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  const avatarUrl =
    preview || user.avatar || `https://ui-avatars.com/api/?name=${user.name}`;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow mt-10">
      {/* PROFILE */}
      <div className="text-center">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border"
        />

        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-gray-500">{user.email}</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleUpdate} className="mt-6 space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg"
        />

        <input type="file" onChange={handleFileChange} />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
