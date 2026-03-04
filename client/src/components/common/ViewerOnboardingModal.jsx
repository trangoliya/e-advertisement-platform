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
        : [...prev, interest],
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

      if (response) {
        setSuccessMessage("Profile saved successfully!");

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h2 className="mb-4 text-xl font-semibold">Complete Your Profile</h2>

        <input
          type="number"
          placeholder="Age"
          className="w-full p-2 mb-3 border rounded-lg"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={loading}
        />

        <input
          type="text"
          placeholder="City"
          className="w-full p-2 mb-3 border rounded-lg"
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
          <p className="mb-3 text-sm text-green-600">{successMessage}</p>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 text-white bg-black rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

export default ViewerOnboardingModal;
