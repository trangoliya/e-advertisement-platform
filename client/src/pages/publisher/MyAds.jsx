import { useEffect, useState } from "react";
import { getMyAds, updateAdStatus } from "../../services/ad.service";

const MyAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const data = await getMyAds();
       console.log("API response:", data);
      setAds(data.data);
    } catch (error) {
      console.error("Error fetching ads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateAdStatus(id, status);
      console.log("Status updated");
      fetchAds(); // refresh list
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  if (loading) return <p>Loading ads...</p>;

  return (
    <div>
      <h2>My Ads</h2>

      {ads.length === 0 ? (
        <p>No ads found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Impressions</th>
              <th>Clicks</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id}>
                <td>{ad.title}</td>
                <td>{ad.status}</td>
                <td>{ad.impressions}</td>
                <td>{ad.clicks}</td>
                <td>
                  <select
                    value={ad.status}
                    onChange={(e) =>
                      handleStatusChange(ad._id, e.target.value)
                    }
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyAds;