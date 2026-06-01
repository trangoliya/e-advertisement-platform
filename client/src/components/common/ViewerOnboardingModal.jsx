import { useState } from "react";
import { saveViewerProfile } from "../../services/viewer.service";
import { useAuth } from "../../context/AuthContext";
import { IoClose } from "react-icons/io5";

const interestsList = [
  "Technology",
  "Finance",
  "Gaming",
  "Fitness",
  "Travel",
  "Education",
];

const ViewerOnboardingModal = ({ onClose }) => {
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

      if (response?.data?.user) {
        setUser(response.data.user);

        localStorage.setItem("user", JSON.stringify(response.data.user));

        setSuccessMessage("Profile saved successfully!");

        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error("Profile save error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Complete Your Profile</h2>

          {onClose && (
            <button
              onClick={onClose}
              className="
                text-gray-500
                hover:text-red-500
                transition
                text-2xl
              "
            >
              <IoClose />
            </button>
          )}
        </div>

        {/* Age */}
        <input
          type="number"
          placeholder="Age"
          className="w-full p-3 mb-3 border rounded-lg"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          disabled={loading}
        />

        {/* City */}
        <input
          type="text"
          placeholder="City"
          className="w-full p-3 mb-4 border rounded-lg"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
        />

        {/* Interests */}
        <div className="mb-5">
          <p className="mb-3 font-medium">Select Your Interests</p>

          <div className="flex flex-wrap">
            {interestsList.map((interest) => (
              <label
                key={interest}
                className={`
                  inline-flex
                  items-center
                  px-3
                  py-2
                  rounded-full
                  border
                  cursor-pointer
                  mr-2
                  mb-2
                  transition
                  ${
                    interests.includes(interest)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
                  }
                `}
              >
                <input
                  type="checkbox"
                  className="hidden"
                  checked={interests.includes(interest)}
                  onChange={() => handleInterestChange(interest)}
                  disabled={loading}
                />

                {interest}
              </label>
            ))}
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <p className="mb-4 text-sm font-medium text-green-600">
            {successMessage}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            w-full
            py-2.5
            bg-blue-600
            text-white
            rounded-lg
            font-medium
            hover:bg-blue-700
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>
    </div>
  );
};

export default ViewerOnboardingModal;
