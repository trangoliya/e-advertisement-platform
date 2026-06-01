const Loader = ({ size = "md" }) => {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div
        className={`
          ${sizes[size]}
          border-4
          border-gray-300
          border-t-blue-600
          rounded-full
          animate-spin
        `}
      />
    </div>
  );
};

export default Loader;
