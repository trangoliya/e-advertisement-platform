import { useState } from "react";
import { createPublisherProfile } from "../../services/publisher.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const PublisherOnboardingModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

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

      // save new token
      localStorage.setItem("token", res.token);

      // save updated user
      localStorage.setItem("user", JSON.stringify(res.user));

      // update AuthContext
      setUser(res.user);

      onClose();

      // redirect to publisher dashboard
      navigate("/publisher/dashboard");

    } catch (error) {
      console.error("Publisher profile error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to create publisher profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Become a Publisher</h2>

        <input
          type="text"
          placeholder="Business Name"
          className="border p-2 w-full mb-3 rounded"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Website"
          className="border p-2 w-full mb-3 rounded"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-2 w-full mb-4 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Publisher Profile"}
        </button>
      </div>
    </div>
  );
};

export default PublisherOnboardingModal;