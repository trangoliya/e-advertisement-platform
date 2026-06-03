import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FiPlus, FiX } from "react-icons/fi";
import { useEffect, useState } from "react";
import {
  createCampaign,
  getMyCampaigns,
  getCampaignAnalytics,
  updateCampaign,
  deleteCampaign,
} from "../../services/campaign.service";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    totalBudget: "",
    dailyBudget: "",
    platforms: [],
    ageMin: "",
    ageMax: "",
    locations: "",
    interests: [],
  });

  const interestOptions = [
    "Technology",
    "Gaming",
    "Finance",
    "Travel",
    "Sports",
    "Education",
    "Shopping",
    "Food",
    "Business",
    "Entertainment",
  ];

  const loadCampaigns = async () => {
    try {
      setLoading(true);

      const campaignsData = await getMyCampaigns();

      const campaignsArray = campaignsData?.data || campaignsData || [];

      const campaignsWithAnalytics = await Promise.all(
        campaignsArray.map(async (campaign) => {
          const analytics = await getCampaignAnalytics(campaign._id);

          return {
            ...campaign,
            totalClicks: analytics?.data?.totalClicks || 0,
            totalImpressions: analytics?.data?.totalImpressions || 0,
            CTR: analytics?.data?.CTR || 0,
          };
        }),
      );

      setCampaigns(campaignsWithAnalytics);
    } catch (error) {
      console.error("Error fetching campaigns", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCampaigns();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlatformChange = (platform) => {
    setFormData((prev) => {
      const exists = prev.platforms.includes(platform);

      return {
        ...prev,
        platforms: exists
          ? prev.platforms.filter((p) => p !== platform)
          : [...prev.platforms, platform],
      };
    });
  };

  const handleInterestChange = (interest) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(interest);

      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== interest)
          : [...prev.interests, interest],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);

      const targeting = {
        ageMin: formData.ageMin ? Number(formData.ageMin) : null,
        ageMax: formData.ageMax ? Number(formData.ageMax) : null,
        locations: formData.locations
          ? formData.locations.split(",").map((l) => l.trim())
          : [],
        interests: formData.interests,
      };

      const payload = {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        totalBudget: Number(formData.totalBudget),
        dailyBudget: Number(formData.dailyBudget),
        platforms: formData.platforms,
        targeting,
      };
      const isEditing = !!editingCampaign;
      if (editingCampaign) {
        await updateCampaign(editingCampaign._id, payload);
      } else {
        await createCampaign(payload);
      }
      setEditingCampaign(null);

      setSuccessMessage(
        isEditing
          ? "Campaign updated successfully."
          : "Campaign created successfully.",
      );
      setFormData({
        name: "",
        description: "",
        category: "",
        totalBudget: "",
        dailyBudget: "",
        platforms: [],
        ageMin: "",
        ageMax: "",
        locations: "",
        interests: [],
      });
      await loadCampaigns();
      setShowCreateForm(false);
      document
        .getElementById("campaign-list")
        ?.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error creating campaign", error);
    } finally {
      setCreating(false);
    }
  };
  const handleDelete = async (campaignId) => {
    if (!window.confirm("Delete this campaign?")) return;

    try {
      await deleteCampaign(campaignId);
      await loadCampaigns();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (campaign) => {
    setEditingCampaign(campaign);

    setFormData({
      name: campaign.name,
      description: campaign.description,
      category: campaign.category,
      totalBudget: campaign.totalBudget,
      dailyBudget: campaign.dailyBudget,
      platforms: campaign.platforms || [],
      ageMin: campaign.targeting?.ageMin || "",
      ageMax: campaign.targeting?.ageMax || "",
      locations: campaign.targeting?.locations?.join(", ") || "",
      interests: campaign.targeting?.interests || [],
    });

    setShowCreateForm(true);
  };
  const handleToggleForm = () => {
    if (showCreateForm) {
      setEditingCampaign(null);
    }

    setShowCreateForm(!showCreateForm);
  };
  return (
    <div className="p-6 space-y-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Campaign Management
          </h1>

          <p className="text-gray-500 mt-2">
            Create, monitor and optimize your advertising campaigns
          </p>

          {successMessage && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              {successMessage}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-3 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Total Campaigns
            </p>

            <p className="text-2xl font-bold text-indigo-600 mt-1">
              {campaigns.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 px-5 py-3 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Active
            </p>

            <p className="text-2xl font-bold text-green-600 mt-1">
              {campaigns.filter((c) => c.status === "active").length}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleToggleForm}
          className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 transition"
        >
          {showCreateForm ? (
            <>
              <FiX />
              Close Form
            </>
          ) : (
            <>
              <FiPlus />
              Create Campaign
            </>
          )}
        </button>
      </div>
      {/* Create Campaign */}
      {showCreateForm && (
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingCampaign ? "Update Campaign" : "Create New Campaign"}
            </h2>

            <p className="text-gray-500 mt-1">
              Configure campaign settings, budget and audience targeting
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 xl:grid-cols-4 gap-5"
          >
            {/* Campaign Name */}
            <input
              type="text"
              name="name"
              placeholder="Campaign Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="rounded-2xl border border-gray-300 px-4 py-3 bg-white
      focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
            />

            {/* Description */}
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 bg-white
      focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
            />

            {/* Category */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="rounded-2xl border border-gray-300 px-4 py-3"
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Business">Business</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Food">Food</option>
              <option value="Fashion">Fashion</option>
              <option value="Real Estate">Real Estate</option>
            </select>

            {/* Total Budget */}
            <input
              type="number"
              name="totalBudget"
              placeholder="Total Budget (₹)"
              value={formData.totalBudget}
              onChange={handleChange}
              required
              className="rounded-2xl border border-gray-300 px-4 py-3 bg-white
      focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
            />

            {/* Daily Budget */}
            <input
              type="number"
              name="dailyBudget"
              placeholder="Daily Budget (₹)"
              value={formData.dailyBudget}
              onChange={handleChange}
              min="0"
              className="rounded-2xl border border-gray-300 px-4 py-3 bg-white
      focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
            />
            <div className="md:col-span-2 xl:col-span-4 border-t border-gray-200 pt-6">
              {/* Advertising Platforms */}
              <h3 className="font-semibold text-gray-900 mb-4">
                Advertising Platforms
              </h3>

              <div className="flex flex-wrap gap-4">
                {[
                  "Facebook",
                  "Instagram",
                  "WhatsApp",
                  "LinkedIn",
                  "YouTube",
                  "Website",
                ].map((platform) => (
                  <label
                    key={platform}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.platforms.includes(platform)}
                      onChange={() => handlePlatformChange(platform)}
                    />

                    <span>{platform}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Target Audience */}
            <div className="md:col-span-2 xl:col-span-4 border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-gray-900 mb-5">
                Target Audience
              </h3>

              <div className="grid md:grid-cols-2 gap-5 mb-5">
                <input
                  type="number"
                  name="ageMin"
                  placeholder="Minimum Age"
                  value={formData.ageMin}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-300 px-4 py-3 bg-white
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                />

                <input
                  type="number"
                  name="ageMax"
                  placeholder="Maximum Age"
                  value={formData.ageMax}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-300 px-4 py-3 bg-white
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
                />
              </div>

              <input
                type="text"
                name="locations"
                placeholder="Target Locations (Surat, Ahmedabad, Mumbai)"
                value={formData.locations}
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 bg-white mb-5
        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none transition"
              />

              <div className="flex flex-wrap gap-4">
                {interestOptions.map((interest) => (
                  <label
                    key={interest}
                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 cursor-pointer hover:border-indigo-300 transition"
                  >
                    <input
                      type="checkbox"
                      className="accent-indigo-600"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                    />

                    <span className="text-gray-700">{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 xl:col-span-4 flex justify-end pt-4">
              <Button type="submit" disabled={creating}>
                {creating
                  ? editingCampaign
                    ? "Updating Campaign..."
                    : "Creating Campaign..."
                  : editingCampaign
                    ? "Update Campaign"
                    : "Create Campaign"}
              </Button>
            </div>
          </form>
        </div>
      )}
      {/* Campaign List */}
      <div
        id="campaign-list"
        className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm overflow-hidden"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Campaigns</h2>

            <p className="text-sm text-gray-500 mt-1">
              Monitor and manage all your advertising campaigns
            </p>
          </div>

          <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl font-semibold">
            {campaigns.length} Campaigns
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-6xl mb-4">🚀</div>

            <h3 className="text-xl font-semibold text-gray-800">
              No Campaigns Yet
            </h3>

            <p className="text-gray-500 mt-2">
              Create your first campaign and start reaching your audience.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-300 w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-6 py-4 text-left">Campaign</th>

                  <th className="px-6 py-4 text-center">Budget</th>

                  <th className="px-6 py-4 text-center">Status</th>

                  <th className="px-6 py-4 text-center">Category</th>

                  <th className="px-6 py-4 text-center">Platforms</th>

                  <th className="px-6 py-4 text-center">Impressions</th>

                  <th className="px-6 py-4 text-center">Clicks</th>

                  <th className="px-6 py-4 text-center">CTR</th>

                  <th className="px-6 py-4 text-center">Performance</th>

                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {campaigns.map((campaign) => {
                  const chartData = [
                    {
                      name: "Performance",
                      impressions: campaign.totalImpressions,
                      clicks: campaign.totalClicks,
                    },
                  ];

                  return (
                    <tr
                      key={campaign._id}
                      className="border-b border-gray-100 hover:bg-indigo-50/40 transition"
                    >
                      {/* Campaign */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {campaign.name}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {campaign.description || "No description available"}
                          </p>
                        </div>
                      </td>

                      {/* Budget */}
                      <td className="px-6 py-5 text-center">
                        <div>
                          <p className="font-semibold text-gray-900">
                            ₹{campaign.totalBudget}
                          </p>

                          <p className="text-xs text-gray-500">
                            Daily ₹{campaign.dailyBudget || 0}
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5 text-center">
                        <StatusBadge status={campaign.status} />
                      </td>

                      {/* Category */}
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-medium">
                          {campaign.category}
                        </span>
                      </td>

                      {/* Platforms */}
                      <td className="px-6 py-5 text-center text-gray-600">
                        {campaign.platforms?.join(", ") || "Website"}
                      </td>

                      {/* Impressions */}
                      <td className="px-6 py-5 text-center font-medium text-gray-700">
                        {campaign.totalImpressions || 0}
                      </td>

                      {/* Clicks */}
                      <td className="px-6 py-5 text-center font-medium text-gray-700">
                        {campaign.totalClicks || 0}
                      </td>

                      {/* CTR */}
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex px-3 py-1 rounded-full bg-green-50 text-green-600 font-medium">
                          {campaign.CTR || 0}%
                        </span>
                      </td>

                      {/* Performance Chart */}
                      <td className="px-6 py-5 w-64">
                        <ResponsiveContainer width="100%" height={90}>
                          <BarChart data={chartData}>
                            <XAxis hide />
                            <YAxis hide />
                            <Tooltip />
                            <Bar
                              dataKey="impressions"
                              fill="#6366f1"
                              radius={[4, 4, 0, 0]}
                            />
                            <Bar
                              dataKey="clicks"
                              fill="#22c55e"
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(campaign)}
                            className="px-3 py-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(campaign._id)}
                            className="px-3 py-1 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
