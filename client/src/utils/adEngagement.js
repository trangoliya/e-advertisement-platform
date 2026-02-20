export const getSavedAds = () =>
  JSON.parse(localStorage.getItem("savedAds")) || [];

export const toggleSaveAd = (adId) => {
  const saved = getSavedAds();
  const updated = saved.includes(adId)
    ? saved.filter((id) => id !== adId)
    : [...saved, adId];

  localStorage.setItem("savedAds", JSON.stringify(updated));
  return updated;
};

export const getLikedAds = () =>
  JSON.parse(localStorage.getItem("likedAds")) || [];

export const toggleLikeAd = (adId) => {
  const liked = getLikedAds();
  const updated = liked.includes(adId)
    ? liked.filter((id) => id !== adId)
    : [...liked, adId];

  localStorage.setItem("likedAds", JSON.stringify(updated));
  return updated;
};