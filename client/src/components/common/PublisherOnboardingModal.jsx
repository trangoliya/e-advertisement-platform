import { useState } from "react";
import { createPublisherProfile } from "../../services/publisher.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoClose } from "react-icons/io5";

const PublisherOnboardingModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!businessName.trim()) {
      alert("Business name is required");
      return;
    }

    try {
      setLoading(true);

      const res = await createPublisherProfile({
        businessName: businessName.trim(),
        website: website.trim(),
        category: category.trim(),
      });

      if (!res) {
        throw new Error("Invalid server response");
      }

      // Save new token
      if (res.token) {
        localStorage.setItem("token", res.token);
      }

      // Update user roles locally
      const updatedUser = {
        ...user,
        roles: res.user?.roles || [...(user.roles || []), "publisher"],
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setUser(updatedUser);

      onClose();

      navigate("/publisher/dashboard");
    } catch (error) {
      console.error("Publisher profile error:", error);

      alert(
        error?.response?.data?.message ||
          error.message ||
          "Failed to create publisher profile",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-2xl w-96 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Become a Publisher</h2>

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
        </div>

        <input
          type="text"
          placeholder="Business Name"
          className="border p-2 w-full mb-3 rounded-lg"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Website"
          className="border p-2 w-full mb-3 rounded-lg"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-2 w-full mb-4 rounded-lg"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            w-full
            bg-blue-600
            text-white
            py-2
            rounded-lg
            font-medium
            hover:bg-blue-700
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Creating..." : "Create Publisher Profile"}
        </button>
      </div>
    </div>
  );
};

export default PublisherOnboardingModal;
