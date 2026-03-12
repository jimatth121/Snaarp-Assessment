import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  CreditCard,
  HardDrive,
  HeadphonesIcon,
  LayoutDashboard,
  Monitor,
  Settings,
  TrendingUp,
  UserCircle,
  Users,
} from "lucide-react";

export type NavigationItem = {
  icon: LucideIcon;
  label: string;
  path: string;
};

export const menuItems: NavigationItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Building2, label: "Organization & Reg.", path: "/organization-registration" },
  { icon: BarChart3, label: "Reporting", path: "/reporting" },
  { icon: CreditCard, label: "Billing", path: "/billing" },
  { icon: UserCircle, label: "Account", path: "/account" },
  { icon: HardDrive, label: "Storage", path: "/storage" },
  { icon: Settings, label: "Settings", path: "/settings" },
  { icon: Monitor, label: "Device Management", path: "/device-management" },
  { icon: TrendingUp, label: "Productivity Report", path: "/productivity-report" },
];

export const bottomItems: NavigationItem[] = [
  { icon: Users, label: "User Panel", path: "/user-panel" },
  { icon: HeadphonesIcon, label: "Support", path: "/support" },
];

