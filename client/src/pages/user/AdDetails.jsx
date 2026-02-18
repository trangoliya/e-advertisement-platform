import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAdById, incrementClick } from "../../services/viewer.service";

const AdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ad, setAd] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await getAdById(id);
        setAd(res.data.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchAd();
  }, [id]);

  const handleVisit = async () => {
    console.log("Handle visit triggered");
    console.log("ad id: ", ad?._id);
    console.log("target url: ", ad?.targetUrl);
    try {
      await incrementClick(ad._id);
      console.log("clicked", ad._id);
      setAd((prev) => ({
        ...prev,
        clicks: prev.clicks + 1,
      }));
      window.open(ad.targetUrl, "_blank");
    } catch (error) {
      console.error("Error increment click: ", error);
    }
  };

  if (!ad) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>{ad.title}</h2>
      <p>{ad.description} </p>
      <div style={{ marginTop: "15px" }}>
        <p>👁️ Impressions:{ad.impressions}</p>
        <p>👆 Click: {ad.clicks}</p>
      </div>

      <button onClick={handleVisit} style={{ marginTop: "15px" }}>
        visit Website
      </button>
    </div>
  );
};

export default AdDetails;
