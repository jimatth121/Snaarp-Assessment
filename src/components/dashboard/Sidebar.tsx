import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { NavLink } from "react-router-dom";
import { bottomItems, menuItems } from "./navigation";

export default function Sidebar({
  open,
  collapsed,
  onToggle,
  onCollapseToggle,
}: {
  open: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onCollapseToggle: () => void;
}) {
  return (
    <>
      {open ? <button className="fixed inset-0 z-40 bg-black/25 lg:hidden" onClick={onToggle} /> : null}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col rounded-r-[10px] border-r border-[#ececec] bg-white py-[9px] transition-[width,transform] duration-200 lg:translate-x-0 ${
          collapsed ? "w-[72px] px-[8px]" : "w-[184px] px-[10px]"
        } ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className={`flex items-center pb-4 pt-3 ${collapsed ? "justify-center px-0" : "justify-between px-3"}`}>
          {collapsed ? null : (
            <h1 className="text-[18px] font-extrabold tracking-[-0.04em] text-[#17181b]">Snaarp</h1>
          )}
          <button
            className="hidden h-8 w-8 items-center justify-center rounded-lg border border-[#ececee] text-[#6c7280] lg:flex"
            onClick={onCollapseToggle}
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#ececee] text-[#6c7280] lg:hidden"
            onClick={onToggle}
          >
            <Menu size={16} />
          </button>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex w-full items-center rounded-[10px] py-[9px] text-left text-[11px] font-medium transition-colors ${
                  collapsed ? "justify-center px-0" : "gap-2.5 px-3"
                } ${
                  isActive ? "bg-[#eef2ff] text-[#5468ff]" : "text-[#70757f] hover:bg-[#f7f7f8] hover:text-[#2f3137]"
                }`
              }
            >
              <item.icon size={13} strokeWidth={2.1} />
              {collapsed ? null : <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-1">
          {bottomItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={({ isActive }) =>
                `flex w-full items-center rounded-[10px] py-[9px] text-left text-[11px] font-medium transition-colors ${
                  collapsed ? "justify-center px-0" : "gap-2.5 px-3"
                } ${
                  isActive ? "bg-[#eef2ff] text-[#5468ff]" : "text-[#70757f] hover:bg-[#f7f7f8] hover:text-[#2f3137]"
                }`
              }
            >
              <item.icon size={13} strokeWidth={2.1} />
              {collapsed ? null : <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}

          {collapsed ? (
            <div className="mt-2 flex justify-center py-2.5">
              <div
                title="Chidinma Snaarp"
                className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#2c4eff] to-[#8ec5ff] text-[10px] font-semibold text-white"
              >
                CS
              </div>
            </div>
          ) : (
            <div className="mt-2 flex items-center gap-2 rounded-[12px] px-2 py-2.5">
              <div className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#2c4eff] to-[#8ec5ff] text-[10px] font-semibold text-white">
                CS
              </div>
              <div className="min-w-0">
                <div className="truncate text-[10px] font-medium text-[#2f3137]">Chidinma Snaarp</div>
                <div className="truncate text-[8px] text-[#9a9faa]">sffv.ha80@gmail.com</div>
              </div>
            </div>
          )}
        </div>
      </aside>

      <button
        className="fixed left-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#e9e9eb] bg-white text-[#606571] shadow-sm lg:hidden"
        onClick={onToggle}
      >
        <Menu size={16} />
      </button>
    </>
  );
}
