import { useNavigate } from "react-router-dom";
import { getMyCampaigns } from "../../services/campaign.service";
import { createAd } from "../../services/ad.service";
import { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const CreateAd = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    campaignId: "",
    targetUrl: "",
  });

  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [template, setTemplate] = useState("standard");
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    setMedia(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("campaignId", formData.campaignId);
      data.append("targetUrl", formData.targetUrl);
      data.append("template", template); 

      if (media) {
        data.append("media", media);
      }

      await createAd(data);

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
                         focus:border-accent focus:ring-2 focus:ring-accent/30"
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
                         focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>

          {/* Upload Media */}
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Upload Image / Video
            </label>

            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="w-full rounded-xl bg-bgPrimary border border-borderColorCustom
                         px-4 py-2.5 text-textPrimary
                         outline-none transition-all duration-200
                         focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>

            {/* Target URL */}
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Advertisement URL
            </label>

            <input
              type="url"
              name="targetUrl"
              value={formData.targetUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com"
              className="w-full rounded-xl bg-bgPrimary border border-borderColorCustom
               px-4 py-2.5 text-textPrimary
               outline-none transition duration-200
               focus:border-accent focus:ring-2 focus:ring-accent/30"
            />
          </div>

          {/* Campaign Selection */}
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

          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">
              Ad Template
            </label>

            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full rounded-xl bg-bgPrimary border border-borderColorCustom
              px-4 py-2.5 text-textPrimary
              outline-none transition duration-200
              focus:border-accent focus:ring-2 focus:ring-accent/30"
            >
              <option value="standard">Standard Ad</option>
              <option value="banner">Banner Style</option>
              <option value="compact">Compact Card</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-4">
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

      {/* Live Preview */}
      <div className="max-w-3xl">
        <h2 className="text-xl font-semibold text-textPrimary mb-3">
          Ad Preview
        </h2>

        {/* Standard Template */}
        {template === "standard" && (
          <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl p-4">
            {previewUrl &&
              (media?.type?.startsWith("video") ? (
                <video
                  src={previewUrl}
                  controls
                  className="rounded-xl mb-3 max-h-60 w-full object-cover"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Ad Preview"
                  className="rounded-xl mb-3 max-h-60 w-full object-cover"
                />
              ))}

            <h3 className="text-lg font-semibold text-textPrimary">
              {formData.title || "Ad Title Preview"}
            </h3>

            <p className="text-sm text-textSecondary mt-1">
              {formData.description || "Your ad description will appear here"}
            </p>
          </div>
        )}

        {/* Banner Template */}
        {template === "banner" && (
          <div className="bg-bgSecondary border border-borderColorCustom rounded-xl p-4 flex items-center gap-4">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Banner"
                className="w-32 h-20 object-cover rounded-lg"
              />
            )}

            <div>
              <h3 className="font-semibold text-textPrimary">
                {formData.title || "Banner Title"}
              </h3>
              <p className="text-sm text-textSecondary">
                {formData.description || "Banner description"}
              </p>
            </div>
          </div>
        )}

        {/* Compact Template */}
        {template === "compact" && (
          <div className="bg-bgSecondary border border-borderColorCustom rounded-lg p-3 max-w-sm">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Compact"
                className="rounded-lg mb-2 w-full h-32 object-cover"
              />
            )}

            <h3 className="text-sm font-semibold text-textPrimary">
              {formData.title || "Compact Ad"}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAd;
