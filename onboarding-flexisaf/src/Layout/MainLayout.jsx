import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar";
import TopBar from "../Components/TopBar";

function MainLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* TopBar */}
        <TopBar />

        {/* Page content */}
        <main className="p-4 md:p-8 overflow-y-auto flex-1 min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;