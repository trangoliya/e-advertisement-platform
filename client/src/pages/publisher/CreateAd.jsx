import { useNavigate } from "react-router-dom";
import { createAd } from "../../services/ad.service";
import { useState } from "react";

const CreateAd = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await createAd(formData);
      navigate("/publisher/my-ads");
    } catch (error) {
      console.error("Error creating ad:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create New Ad</h2>
        <p className="text-sm text-gray-500">
          Fill in the details below to publish your advertisement
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Summer Sale Campaign"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         outline-none transition
                         focus:border-blue-500 focus:ring-2
                         focus:ring-blue-500/30"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe your ad and what users should know..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         outline-none resize-none transition
                         focus:border-blue-500 focus:ring-2
                         focus:ring-blue-500/30"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/ad-image.jpg"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         outline-none transition
                         focus:border-blue-500 focus:ring-2
                         focus:ring-blue-500/30"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/publisher/my-ads")}
              className="rounded-lg border border-gray-300 px-5 py-2.5
                         text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`rounded-lg px-6 py-2.5 font-medium text-white transition
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {loading ? "Creating..." : "Create Ad"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAd;