import { useNavigate } from "react-router-dom";

const PublisherPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Publisher Dashboard
        </h1>

        <button
          onClick={() => navigate("/publisher/create-ad")}
          className="rounded-lg bg-blue-600 px-6 py-2
                     text-white font-medium hover:bg-blue-700 transition"
        >
          + Add New Ad
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Ads</p>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Clicks</p>
          <p className="text-2xl font-bold text-gray-800">1,248</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Active Ads</p>
          <p className="text-2xl font-bold text-gray-800">7</p>
        </div>
      </div>

      {/* Ads Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 border-b">
            <tr className="text-left text-sm text-gray-600">
              <th className="px-6 py-3">Ad Title</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Clicks</th>
            </tr>
          </thead>
          <tbody>
            {/* Replace with real data */}
            <tr className="border-t">
              <td className="px-6 py-4">Summer Sale Campaign</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                  Active
                </span>
              </td>
              <td className="px-6 py-4">342</td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">New Product Launch</td>
              <td className="px-6 py-4">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700">
                  Paused
                </span>
              </td>
              <td className="px-6 py-4">189</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PublisherPage;