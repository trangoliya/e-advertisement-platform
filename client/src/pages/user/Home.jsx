import { useEffect, useState } from "react";
import { getActiveAds } from "../../services/viewer.service";
import AdCard from "../../components/ads/AdCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [ads, setAds] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchAds = async () => {
      try{
      const res = await getActiveAds();
      setAds(res.data.data);
      } catch(error){
        console.error("Error fetching ads: ", error)
      }
    };
    fetchAds();
  }, []);
  return (
    <div>
      <hr />
      <h1>Welcome to the User Home Page</h1>
      {ads.length === 0 ? (<p>No active ads available</p>): (
        ads.map((ad) => (
        <AdCard
          key={ad._id}
          title={ad.title}
          description={ad.description}
          impressions={ad.impressions}
          clicks={ad.clicks}
          onView={ () => navigate(`/ads/${ad._id}`)}></AdCard>
      )))}
    </div>
  );
};
export default Home;
