import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import {
  createCampaign,
  getMyCampaigns,
  getCampaignAnalytics,
} from "../../services/campaign.service";
import StatusBadge from "../../components/common/StatusBadge";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    totalBudget: "",
  });

  const loadCampaigns = async () => {
    try {
      setLoading(true);

      const campaignsData = await getMyCampaigns();

      const campaignsWithAnalytics = await Promise.all(
        campaignsData.map(async (campaign) => {
          const analytics = await getCampaignAnalytics(campaign._id);

          return {
            ...campaign,
            totalClicks: analytics?.totalClicks || 0,
            totalImpressions: analytics?.totalImpressions || 0,
            CTR: analytics?.CTR || 0,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setCreating(true);

      await createCampaign(formData);

      setFormData({
        name: "",
        description: "",
        totalBudget: "",
      });

      await loadCampaigns();

      document
        .getElementById("campaign-list")
        ?.scrollIntoView({ behavior: "smooth" });

      setSuccessMessage("Campaign created successfully.");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error creating campaign", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-6 space-y-8 min-h-150">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Campaigns</h1>

        {successMessage && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 rounded-xl p-4">
            {successMessage}
          </div>
        )}

        <p className="text-gray-400 text-sm">
          Create and manage your advertising campaigns
        </p>
      </div>

      {/* Create Campaign */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">
          Create New Campaign
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Campaign Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="totalBudget"
            placeholder="Total Budget"
            value={formData.totalBudget}
            onChange={handleChange}
            required
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:ring-2 focus:ring-blue-500"
          />

          <div className="md:col-span-3 flex justify-end">
            <Button type="submit" disabled={creating}>
              {creating ? "Creating..." : "Create Campaign"}
            </Button>
          </div>
        </form>
      </div>

      {/* Campaign List */}
      <div
        id="campaign-list"
        className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg min-h-75"
      >
        <h2 className="text-lg font-semibold text-white mb-4">My Campaigns</h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <p className="text-gray-400 font-medium">No campaigns available.</p>
            <p className="text-xs text-gray-500">
              Create a campaign to start running ads.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-400 border-b border-zinc-800 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-6 py-4 text-left">Name</th>
                  <th className="px-6 py-4 text-center">Total</th>
                  <th className="px-6 py-4 text-center">Spent</th>
                  <th className="px-6 py-4 text-center">Remaining</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Progress</th>
                  <th className="px-6 py-4 text-center">Impressions</th>
                  <th className="px-6 py-4 text-center">Clicks</th>
                  <th className="px-6 py-4 text-center">CTR %</th>
                  <th className="px-6 py-4 text-center">Performance</th>
                </tr>
              </thead>

              <tbody>
                {campaigns.map((campaign) => {
                  const spent = campaign.spentBudget || 0;
                  const remaining = campaign.totalBudget - spent;

                  const percentage =
                    campaign.totalBudget > 0
                      ? (spent / campaign.totalBudget) * 100
                      : 0;

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
                      className="border-b border-zinc-800 hover:bg-zinc-800/50 transition duration-200"
                    >
                      <td className="px-6 py-6 text-white font-semibold">
                        {campaign.name}
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-right">
                        ₹ {campaign.totalBudget}
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-right">
                        ₹ {spent}
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-right">
                        ₹ {remaining}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <StatusBadge status={campaign.status} />
                      </td>

                      <td className="px-6 py-5 text-center w-40">
                        <div className="w-full bg-zinc-800 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              percentage >= 100
                                ? "bg-red-500"
                                : percentage >= 70
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                            }`}
                            style={{
                              width: `${Math.min(percentage, 100)}%`,
                            }}
                          />
                        </div>
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-right">
                        {campaign.totalImpressions}
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-right">
                        {campaign.totalClicks}
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-right">
                        {campaign.CTR}%
                      </td>

                      <td className="px-6 py-5 text-center w-64">
                        <ResponsiveContainer width="100%" height={100}>
                          <BarChart data={chartData}>
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <Tooltip />
                            <Bar dataKey="impressions" fill="#3b82f6" />
                            <Bar dataKey="clicks" fill="#22c55e" />
                          </BarChart>
                        </ResponsiveContainer>
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
