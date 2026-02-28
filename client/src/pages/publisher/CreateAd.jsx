import { useNavigate } from "react-router-dom";
import { getMyCampaigns } from "../../services/campaign.service";
import { createAd } from "../../services/ad.service";
import { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const CreateAd = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await getMyCampaigns();
        setCampaigns(res);
      } catch (err) {
        console.error("Error fetching campaigns", err);
      }
    };

    fetchCampaigns();
  }, []);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    campaignId: "",
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
      navigate("/publisher/my-ads", {
        state: { success: "Ad created successfully" },
      });
    } catch (error) {
      console.error("Error creating ad:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-150">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold text-textPrimary">Create New Ad</h1>
        <p className="text-sm text-textSecondary mt-1">
          Fill in the details below to publish your advertisement
        </p>
      </div>

      {/* Form Card */}
      <div
        className="bg-bgSecondary border border-borderColorCustom
                   rounded-2xl p-6
                   transition-all duration-200 hover:shadow-sm"
      >
        <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
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
              className="w-full rounded-xl bg-bgPrimary border border-borderColorCustom
                         px-4 py-2.5 text-textPrimary placeholder:text-textSecondary
                         outline-none transition-all duration-200
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
              className="w-full rounded-xl bg-bgPrimary border border-borderColorCustom
                         px-4 py-2.5 text-textPrimary placeholder:text-textSecondary
                         outline-none resize-none transition-all duration-200
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
              className="w-full rounded-xl bg-bgPrimary border border-borderColorCustom
                         px-4 py-2.5 text-textPrimary placeholder:text-textSecondary
                         outline-none transition-all duration-200
                         focus:border-accent focus:ring-2
                         focus:ring-accent/30"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Select Campaign
            </label>

            <select
              name="campaignId"
              value={formData.campaignId}
              onChange={handleChange}
              required
              className="w-full rounded-xl bg-bgPrimary border border-borderColorCustom
               px-4 py-2.5 text-textPrimary
               outline-none transition duration-200
               focus:border-accent focus:ring-2 focus:ring-accent/30"
            >
              <option value="">Select Campaign</option>
              {campaigns.map((campaign) => (
                <option key={campaign._id} value={campaign._id}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>
          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
            {/* Cancel */}
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate("/publisher/my-ads")}
              className="rounded-xl border border-borderColorCustom
                         px-5 py-2.5 text-textSecondary font-medium
                         transition-all duration-200
                         hover:bg-bgPrimary
                         disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            {/* Create */}
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader />
                  Creating...
                </div>
              ) : (
                "Create Ad"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAd;
