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
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
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

      if (response.data.success) {
        setSuccessMessage("Profile saved successfully!");

        // Small delay so user sees success
        setTimeout(() => {
          setUser((prev) => ({
            ...prev,
            profileCompleted: true,
          }));
        }, 800);
      }
    } catch (error) {
      console.error("Profile save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Complete Your Profile</h2>

        <input
          type="number"
          placeholder="Age"
          className="w-full mb-3 p-2 border rounded-lg"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={loading}
        />

        <input
          type="text"
          placeholder="City"
          className="w-full mb-3 p-2 border rounded-lg"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
        />

        <div className="mb-4">
          <p className="mb-2 font-medium">Interests</p>
          {interestsList.map((interest) => (
            <label key={interest} className="block mb-1">
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

        {successMessage && (
          <p className="text-green-600 text-sm mb-3">{successMessage}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

export default ViewerOnboardingModal;
