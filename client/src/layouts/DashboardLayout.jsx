const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-bgPrimary text-textPrimary">

      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-bgSecondary border-r border-borderColorCustom">
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1">

        <header className="sticky top-0 z-40 bg-bgSecondary border-b border-borderColorCustom">
          <Topbar />
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;