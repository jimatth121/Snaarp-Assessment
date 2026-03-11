import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  BarChart3,
  CreditCard,
  UserCircle,
  HardDrive,
  Settings,
  Monitor,
  TrendingUp,
  Users,
  HeadphonesIcon,
  ChevronLeft,
  Menu,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Building2, label: "Organization & Req" },
  { icon: BarChart3, label: "Reporting" },
  { icon: CreditCard, label: "Billing" },
  { icon: UserCircle, label: "Account" },
  { icon: HardDrive, label: "Storage" },
  { icon: Settings, label: "Settings" },
  { icon: Monitor, label: "Device Management" },
  { icon: TrendingUp, label: "Productivity Report" },
];

const bottomItems = [
  { icon: Users, label: "User Panel" },
  { icon: HeadphonesIcon, label: "Support" },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-foreground/30 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full bg-sidebar-bg z-50 flex flex-col transition-all duration-300 ${
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-5 py-6">
          <div className="w-8 h-8 rounded-lg bg-sidebar-active flex items-center justify-center">
            <span className="text-sidebar-active-fg font-bold text-sm">S</span>
          </div>
          {!collapsed && (
            <span className="text-sidebar-fg font-bold text-xl tracking-tight">
              Snaarp
            </span>
          )}
          <button
            onClick={onToggle}
            className="ml-auto text-sidebar-fg/70 hover:text-sidebar-fg transition-colors"
          >
            <ChevronLeft size={18} className={collapsed ? "rotate-180" : ""} />
          </button>
        </div>

        {/* Main nav */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                item.active
                  ? "bg-sidebar-active text-sidebar-active-fg shadow-sm"
                  : "text-sidebar-fg/80 hover:bg-sidebar-hover hover:text-sidebar-fg"
              }`}
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Bottom nav */}
        <div className="px-3 pb-4 space-y-1">
          {bottomItems.map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-fg/80 hover:bg-sidebar-hover hover:text-sidebar-fg transition-all"
            >
              <item.icon size={18} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          ))}

          {/* User */}
          {!collapsed && (
            <div className="flex items-center gap-3 px-3 py-3 mt-2 border-t border-sidebar-fg/20">
              <div className="w-9 h-9 rounded-full bg-sidebar-hover flex items-center justify-center text-sidebar-fg font-semibold text-xs">
                CS
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-sidebar-fg truncate">
                  Chidinma Snaarp
                </p>
                <p className="text-xs text-sidebar-fg/60 truncate">
                  chidinma@snaarp.com
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
