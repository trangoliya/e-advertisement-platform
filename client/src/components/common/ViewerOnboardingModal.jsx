import { useState } from "react";
import { saveViewerProfile } from "../../services/viewer.service";
import Button from "./Button.jsx";

const interestsOptions = [
  "Technology",
  "Fitness",
  "Finance",
  "Travel",
  "Gaming",
  "Education",
];

const ViewerOnboardingModal = ({ user, onClose, onComplete }) => {
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInterestChange = (value) => {
    setInterests((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!age || !city) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      await saveViewerProfile({
        age: Number(age),
        city: city.trim(),
        interests,
      });

      onComplete(); // updates profileCompleted
      onClose(); // close modal
    } catch (error) {
      console.error("Profile save error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg">
        {/* Greeting Section */}
        <h2 className="text-2xl font-semibold mb-1">
          Good to see you, {user?.name} 👋
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Let’s personalize your experience.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <input
            type="text"
            placeholder="Your City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded-lg p-2"
          />

          <div>
            <p className="mb-2 font-medium">Select Interests:</p>
            <div className="grid grid-cols-2 gap-2">
              {interestsOptions.map((interest) => (
                <label key={interest} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={interests.includes(interest)}
                    onChange={() => handleInterestChange(interest)}
                  />
                  {interest}
                </label>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !age || !city}
            
          >
            {loading ? "Saving..." : "Save & Continue"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ViewerOnboardingModal;
