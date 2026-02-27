import { useEffect, useState } from "react";
import { createCampaign, getMyCampaigns } from "../../services/campaign.service";

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
        setCampaigns(data);
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
        <h1 className="text-2xl font-bold text-white">Campaigns</h1>
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
        <h2 className="text-lg font-semibold text-white mb-4">
          My Campaigns
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-400 border-b border-zinc-800">
              <tr>
                <th className="py-3">Name</th>
                <th className="py-3">Budget</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td colSpan="3" className="py-6 text-center text-gray-500">
                    No campaigns created yet
                  </td>
                </tr>
              ) : (
                campaigns.map((campaign) => (
                  <tr
                    key={campaign._id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/40 transition"
                  >
                    <td className="py-4 text-white font-medium">
                      {campaign.name}
                    </td>
                    <td className="py-4 text-gray-300">
                      ₹ {campaign.totalBudget}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          campaign.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : campaign.status === "paused"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Campaigns;