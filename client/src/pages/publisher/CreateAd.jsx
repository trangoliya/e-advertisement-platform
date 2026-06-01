import { useNavigate } from "react-router-dom";
import { getMyCampaigns } from "../../services/campaign.service";
import { createAd } from "../../services/ad.service";
import { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";
import {
  FiTarget,
  FiType,
  FiFileText,
  FiImage,
  FiLink,
  FiLayout,
  FiX,
  FiPlusCircle,
  FiEye,
  FiMonitor,
  FiSmartphone,
} from "react-icons/fi";
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
        setCampaigns(res?.data || res || []);
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

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setMedia(file);

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]); 

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Create Advertisement
          </h1>

          <p className="text-gray-500 mt-2">
            Design, preview and publish advertisements for your campaigns
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50">
              <FiTarget className="text-xl text-indigo-600" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Available Campaigns
              </p>

              <p className="text-2xl font-bold text-indigo-600">
                {campaigns.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FiType className="text-indigo-600" />
              Ad Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Summer Sale Campaign"
              className="w-full rounded-2xl border border-gray-300 bg-white
    px-4 py-3 text-gray-900 placeholder:text-gray-400
    outline-none transition
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FiFileText className="text-indigo-600" />
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe your ad and what users should know..."
              className="w-full rounded-2xl border border-gray-300 bg-white
    px-4 py-3 text-gray-900 placeholder:text-gray-400
    outline-none resize-none transition
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Upload Media */}
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:border-indigo-400 transition">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
              <FiImage className="text-indigo-600" />
              Upload Image / Video
            </label>

            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleMediaChange}
              className="block w-full text-sm text-gray-600
    file:mr-4 file:rounded-xl file:border-0
    file:bg-indigo-50 file:px-4 file:py-2
    file:text-indigo-600 file:font-medium
    hover:file:bg-indigo-100 cursor-pointer"
            />

            <p className="mt-3 text-xs text-gray-500">
              Supported formats: JPG, PNG, JPEG, MP4
            </p>
          </div>

          {/* Target URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FiLink className="text-indigo-600" />
              Advertisement URL
            </label>
            <input
              type="url"
              name="targetUrl"
              value={formData.targetUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com"
              className="w-full rounded-2xl border border-gray-300 bg-white
    px-4 py-3 text-gray-900 placeholder:text-gray-400
    outline-none transition
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            />

            <p className="mt-2 text-xs text-gray-500">
              Enter the destination URL users will visit after clicking the ad.
            </p>
          </div>

          {/* Campaign Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FiTarget className="text-indigo-600" />
              Select Campaign
            </label>

            <select
              name="campaignId"
              value={formData.campaignId}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-gray-300 bg-white
    px-4 py-3 text-gray-900
    outline-none transition
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="">Choose a Campaign</option>

              {campaigns.map((campaign) => (
                <option key={campaign._id} value={campaign._id}>
                  {campaign.name}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-gray-500">
              Associate this advertisement with an existing campaign.
            </p>
          </div>

          {/* Template Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <FiLayout className="text-indigo-600" />
              Ad Template
            </label>

            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 bg-white
    px-4 py-3 text-gray-900
    outline-none transition
    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="standard">Standard Ad</option>

              <option value="banner">Banner Style</option>

              <option value="compact">Compact Card</option>
            </select>

            <p className="mt-2 text-xs text-gray-500">
              Choose how your advertisement will be displayed to users.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-4 pt-6 border-t border-gray-100">
            <button
              type="button"
              disabled={loading}
              onClick={() => navigate("/publisher/my-ads")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-300 px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiX />
              Cancel
            </button>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader />
                  Creating Advertisement...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <FiPlusCircle />
                  Create Advertisement
                </div>
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Live Preview */}
      <div className="max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <FiEye className="text-indigo-600 text-xl" />

          <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Preview how your advertisement will appear to users.
        </p>

        {/* Standard Template */}
        {template === "standard" && (
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <FiMonitor className="text-indigo-600" />

              <span className="text-sm font-medium text-gray-600">
                Standard Template
              </span>
            </div>

            {previewUrl ? (
              media?.type?.startsWith("video") ? (
                <video
                  src={previewUrl}
                  controls
                  className="w-full max-h-72 rounded-2xl object-cover mb-4"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Ad Preview"
                  className="w-full max-h-72 rounded-2xl object-cover mb-4"
                />
              )
            ) : (
              <div className="h-52 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                No media selected
              </div>
            )}

            <h3 className="text-xl font-bold text-gray-900">
              {formData.title || "Ad Title Preview"}
            </h3>

            <p className="text-gray-500 mt-2">
              {formData.description ||
                "Your advertisement description will appear here."}
            </p>

            {formData.targetUrl && (
              <div className="mt-4 flex items-center gap-2 text-sm text-indigo-600">
                <FiLink />
                <span className="truncate">{formData.targetUrl}</span>
              </div>
            )}
          </div>
        )}

        {/* Banner Template */}
        {template === "banner" && (
          <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <FiLayout className="text-indigo-600" />

              <span className="text-sm font-medium text-gray-600">
                Banner Template
              </span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-5">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Banner Preview"
                  className="w-full md:w-56 h-36 object-cover rounded-2xl"
                />
              ) : (
                <div className="w-full md:w-56 h-36 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                  No media selected
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900">
                  {formData.title || "Banner Title"}
                </h3>

                <p className="text-gray-500 mt-2">
                  {formData.description ||
                    "Banner description will appear here."}
                </p>

                {formData.targetUrl && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-indigo-600">
                    <FiLink />
                    <span className="truncate">{formData.targetUrl}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Compact Template */}
        {template === "compact" && (
          <div className="bg-white border border-gray-100 rounded-3xl p-4 shadow-sm max-w-sm">
            <div className="mb-3 flex items-center gap-2">
              <FiSmartphone className="text-indigo-600" />

              <span className="text-sm font-medium text-gray-600">
                Compact Template
              </span>
            </div>

            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Compact Preview"
                className="w-full h-40 object-cover rounded-2xl mb-3"
              />
            ) : (
              <div className="h-40 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-3">
                No media selected
              </div>
            )}

            <h3 className="text-base font-bold text-gray-900">
              {formData.title || "Compact Ad"}
            </h3>

            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {formData.description ||
                "Compact advertisement preview will appear here."}
            </p>

            {formData.targetUrl && (
              <div className="mt-3 flex items-center gap-2 text-xs text-indigo-600">
                <FiLink />
                <span className="truncate">{formData.targetUrl}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateAd;
