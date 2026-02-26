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
        <h2 className="text-2xl font-semibold text-textPrimary">
          Create New Ad
        </h2>
        <p className="text-sm text-textSecondary">
          Fill in the details below to publish your advertisement
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Ad Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Summer Sale Campaign"
              className="w-full rounded-lg bg-bgPrimary border border-borderColorCustom
                         px-4 py-2.5 text-textPrimary placeholder:text-textSecondary
                         outline-none transition
                         focus:border-accent focus:ring-2
                         focus:ring-accent/30"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe your ad and what users should know..."
              className="w-full rounded-lg bg-bgPrimary border border-borderColorCustom
                         px-4 py-2.5 text-textPrimary placeholder:text-textSecondary
                         outline-none resize-none transition
                         focus:border-accent focus:ring-2
                         focus:ring-accent/30"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com/ad-image.jpg"
              className="w-full rounded-lg bg-bgPrimary border border-borderColorCustom
                         px-4 py-2.5 text-textPrimary placeholder:text-textSecondary
                         outline-none transition
                         focus:border-accent focus:ring-2
                         focus:ring-accent/30"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/publisher/my-ads")}
              className="rounded-lg border border-borderColorCustom
                         px-5 py-2.5 text-textSecondary
                         hover:bg-bgPrimary transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`rounded-lg px-6 py-2.5 font-medium text-white transition
                ${
                  loading
                    ? "bg-borderColorCustom cursor-not-allowed"
                    : "bg-accent hover:bg-accentHover"
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