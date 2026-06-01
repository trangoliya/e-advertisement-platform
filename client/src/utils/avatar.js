export const getAvatar = (user) => {
  return (
    user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.name || "User"
    )}`
  );
};