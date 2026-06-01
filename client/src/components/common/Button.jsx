const Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  className = "",
}) => {
  const variants = {
    primary: `
      bg-blue-600 text-white
      hover:bg-blue-700
    `,
    secondary: `
      bg-gray-200 text-gray-800
      hover:bg-gray-300
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
    `,
    success: `
      bg-green-600 text-white
      hover:bg-green-700
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2
        rounded-lg
        font-medium
        transition-all
        duration-200
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:bg-inherit
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
