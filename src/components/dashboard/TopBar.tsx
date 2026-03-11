import { Search, Bell, Copy, Menu } from "lucide-react";

interface TopBarProps {
  onMenuToggle: () => void;
}

export default function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border px-4 md:px-6 py-3 flex items-center gap-4">
      <button
        onClick={onMenuToggle}
        className="lg:hidden text-muted-foreground hover:text-foreground"
      >
        <Menu size={22} />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search for users, groups or settings"
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary text-sm text-foreground placeholder:text-muted-foreground border-none outline-none focus:ring-2 focus:ring-ring/20"
        />
      </div>

      <div className="flex items-center gap-3 ml-auto">
        <button className="relative p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors">
          <Bell size={18} />
        </button>
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Agent Code:</span>
          <code className="text-primary font-mono text-xs bg-accent px-2 py-1 rounded">
            0365e2d37742y3b38
          </code>
          <button className="text-muted-foreground hover:text-foreground">
            <Copy size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}
