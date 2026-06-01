const statusConfig = {
  // Campaign / Ad Status
  active: {
    label: "Active",
    classes: "bg-green-500/20 text-green-400 border-green-500/30",
  },

  paused: {
    label: "Paused",
    classes: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  },

  completed: {
    label: "Completed",
    classes: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },

  rejected: {
    label: "Rejected",
    classes: "bg-red-500/20 text-red-400 border-red-500/30",
  },

  draft: {
    label: "Draft",
    classes: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  },

  // User Roles
  admin: {
    label: "Admin",
    classes: "bg-red-500/20 text-red-400 border-red-500/30",
  },

  publisher: {
    label: "Publisher",
    classes: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  },

  user: {
    label: "User",
    classes: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  },
};

const StatusBadge = ({ status = "draft", className = "" }) => {
  const config = statusConfig[status?.toLowerCase()] || statusConfig.draft;

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        text-xs
        font-semibold
        rounded-full
        border
        tracking-wide
        capitalize
        ${config.classes}
        ${className}
      `}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
