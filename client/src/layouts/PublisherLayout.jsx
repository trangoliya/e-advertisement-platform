const PublisherLayout = () => {
  return (
    <div className="min-h-screen bg-bgPrimary text-textPrimary flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-bgSecondary border-r border-borderColorCustom">
        Sidebar
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ">
        {/* Outlet or children */}
      </div>

    </div>
  );
};

export default PublisherLayout;