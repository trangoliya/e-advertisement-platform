import { useNavigate } from "react-router-dom";
import StatCard from "../../components/common/StatCard.jsx";

const PublisherPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-textPrimary">
          Publisher Dashboard
        </h1>

        <button
          onClick={() => navigate("/publisher/create-ad")}
          className="rounded-lg bg-accent px-6 py-2
                     text-white font-medium hover:bg-accentHover transition"
        >
          + Add New Ad
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Ads" value="24" />
        <StatCard title="Active Ads" value="18" />
        <StatCard title="Total Clicks" value="1,284" />
        <StatCard title="Impressions" value="12,390" />
      </div>

      {/* Ads Table */}
      <div className="bg-bgSecondary border border-borderColorCustom rounded-2xl overflow-hidden">
        <table className="w-full border-collapse">

          <thead className="bg-bgPrimary border-b border-borderColorCustom">
            <tr className="text-left text-sm text-textSecondary">
              <th className="px-6 py-3">Ad Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Clicks</th>
            </tr>
          </thead>

          <tbody>
            {/* Sample Row 1 */}
            <tr className="border-t border-borderColorCustom hover:bg-bgPrimary transition">
              <td className="px-6 py-4 text-textPrimary">
                Summer Sale Campaign
              </td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-success/20 px-3 py-1 text-xs font-medium text-success">
                  Active
                </span>
              </td>

              <td className="px-6 py-4 text-textSecondary">
                342
              </td>
            </tr>

            {/* Sample Row 2 */}
            <tr className="border-t border-borderColorCustom hover:bg-bgPrimary transition">
              <td className="px-6 py-4 text-textPrimary">
                New Product Launch
              </td>

              <td className="px-6 py-4">
                <span className="rounded-full bg-warning/20 px-3 py-1 text-xs font-medium text-warning">
                  Paused
                </span>
              </td>

              <td className="px-6 py-4 text-textSecondary">
                189
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublisherPage;