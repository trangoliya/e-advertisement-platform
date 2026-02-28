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

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    totalBudget: "",
  });

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        const data = await getMyCampaigns();

        // Fetch analytics for each campaign
        const campaignsWithAnalytics = await Promise.all(
          data.map(async (campaign) => {
            const analytics = await getCampaignAnalytics(campaign._id);

            return {
              ...campaign,
              totalClicks: analytics.data.totalClicks,
              totalImpressions: analytics.data.totalImpressions,
              CTR: analytics.data.CTR,
            };
          }),
        );

        setCampaigns(campaignsWithAnalytics);
      } catch (error) {
        console.error("Error fetching campaigns", error);
      }
    };

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
      await createCampaign(formData);
      setFormData({ name: "", description: "", totalBudget: "" });

      const data = await getMyCampaigns();
      setCampaigns(data);
    } catch (error) {
      console.error("Error creating campaign", error);
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-black">Campaigns</h1>
        <p className="text-gray-400 text-sm">
          Create and manage your advertising campaigns
        </p>
      </div>

      {/* Create Campaign Card */}
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
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="totalBudget"
            placeholder="Total Budget"
            value={formData.totalBudget}
            onChange={handleChange}
            required
            className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-xl text-white font-medium"
            >
              Create Campaign
            </button>
          </div>
        </form>
      </div>

      {/* Campaign List */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-white mb-4">My Campaigns</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/60 text-gray-400 border-b border-zinc-800 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-center">Total</th>
                <th className="px-6 py-4 text-center">Spent</th>
                <th className="px-6 py-4 text-center">Remaining</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Progress</th>
                <th className="px-6 py-4 text-center">Impressions</th>
                <th className="px-6 py-4 text-center">Clicks</th>
                <th className="px-6 py-4 text-center whitespace-nowrap">CTR %</th>
                <th className="px-6 py-4 text-center">Performance</th>
              </tr>
            </thead>

            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-8 text-center text-gray-500">
                    No campaigns created yet
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => {
                  const remaining = campaign.totalBudget - campaign.spentBudget;

                  const percentage =
                    (campaign.spentBudget / campaign.totalBudget) * 100;
                  const chartData = [
                    {
                      name: "Performance",
                      impressions: campaign.totalImpressions || 0,
                      clicks: campaign.totalClicks || 0,
                    },
                  ];
                  return (
                    <tr
                      key={campaign._id}
                      className="border-b border-zinc-800 hover:bg-zinc-800/50 transition duration-200"
                    >
                      <td className="px-6 py-6 text-white font-semibold text-left">
                        {campaign.name}
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-right whitespace-nowrap">
                        ₹ {campaign.totalBudget}
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-right">
                        ₹ {campaign.spentBudget}
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
                        {campaign.totalImpressions || 0}
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-right">
                        {campaign.totalClicks || 0}
                      </td>

                      <td className="px-6 py-5 text-gray-300 text-right">
                        {campaign.CTR || 0}%
                      </td>
                      <td className="px-6 py-5 text-center w-64">
                        <div className="w-full min-h-25">
                          <ResponsiveContainer width="100%" height={100}>
                            <BarChart data={chartData}>
                              <XAxis dataKey="name" hide />
                              <YAxis hide />
                              <Tooltip />
                              <Bar dataKey="impressions" fill="#3b82f6" />
                              <Bar dataKey="clicks" fill="#22c55e" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
