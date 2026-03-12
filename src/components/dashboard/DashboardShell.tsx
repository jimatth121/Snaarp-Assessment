import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function DashboardShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f5f6]">
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarOpen((value) => !value)}
        onCollapseToggle={() => setSidebarCollapsed((value) => !value)}
      />

      <div className={`dashboard-shell ${sidebarCollapsed ? "lg:ml-[78px]" : "lg:ml-[190px]"}`}>
        <div className="dashboard-canvas">
          <TopBar onMenuToggle={() => setSidebarOpen((value) => !value)} />

          <main className="px-[6px] pb-8 pt-0.5 sm:px-[8px] lg:px-[10px]">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

