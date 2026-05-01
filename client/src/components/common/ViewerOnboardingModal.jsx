import { useState } from "react";
import { saveViewerProfile } from "../../services/viewer.service";
import { useAuth } from "../../context/AuthContext";

const interestsList = [
  "Technology",
  "Finance",
  "Gaming",
  "Fitness",
  "Travel",
  "Education",
];

const ViewerOnboardingModal = () => {
  const { setUser } = useAuth();

  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInterestChange = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    try {
      if (!age || !city) {
        alert("Age and city are required");
        return;
      }

      if (interests.length === 0) {
        alert("Select at least one interest");
        return;
      }

      setLoading(true);

      const response = await saveViewerProfile({
        age: Number(age),
        city: city.trim(),
        interests,
      });

      // FULL USER UPDATE
      if (response?.data?.data) {
        setSuccessMessage("Profile saved successfully!");

        setTimeout(() => {
          setUser(response.data.data); 
        }, 800);
      }

    } catch (error) {
      console.error("Profile save error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">

        <h2 className="mb-4 text-xl font-semibold">
          Complete Your Profile
        </h2>

        {/* Age */}
        <input
          type="number"
          placeholder="Age"
          className="w-full p-2 mb-3 border rounded-lg"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={loading}
        />

        {/* City */}
        <input
          type="text"
          placeholder="City"
          className="w-full p-2 mb-3 border rounded-lg"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
        />

        {/* Interests */}
        <div className="mb-4">
          <p className="mb-2 font-medium">Interests</p>

          {interestsList.map((interest) => (
            <label key={interest} className="block mb-1 cursor-pointer">
              <input
                type="checkbox"
                checked={interests.includes(interest)}
                onChange={() => handleInterestChange(interest)}
                disabled={loading}
              />
              <span className="ml-2">{interest}</span>
            </label>
          ))}
        </div>

        {/* Success */}
        {successMessage && (
          <p className="mb-3 text-sm text-green-600">
            {successMessage}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 text-white bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>

      </div>
    </div>
  );
};

export default ViewerOnboardingModal;