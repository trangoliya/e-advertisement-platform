import { useEffect, useState } from "react";
import api from "../../services/api";
import { FiUser, FiMapPin, FiCalendar, FiBriefcase } from "react-icons/fi";

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

  // Load profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.get("/api/users/profile");
        const data = res.data.data;

        setUser(data);
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

  // Image preview
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
      setPreview(null);

      alert("Profile updated!");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  if (!user)
    return <p className="text-center mt-10">Loading...</p>;

  const avatarUrl =
    preview ||
    user.avatar ||
    `https://ui-avatars.com/api/?name=${user.name}`;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">

        {/* HEADER */}
        <div className="text-center mb-6">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border"
          />

          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleUpdate} className="space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <FiUser /> Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mt-1"
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <FiCalendar /> Age
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mt-1"
            />
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <FiMapPin /> City
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mt-1"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="text-sm font-medium">
              Interests
            </label>
            <input
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mt-1"
              placeholder="e.g. Tech, Sports, Shopping"
            />
          </div>

          {/* Company */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <FiBriefcase /> Company Name
            </label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mt-1"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="text-sm font-medium">
              Bio
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg mt-1"
              rows={3}
            />
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="text-sm font-medium">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full mt-1"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;