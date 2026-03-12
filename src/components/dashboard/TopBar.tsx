import { Bell, Copy, Menu, Search } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const AGENT_CODE = "0365o2j37742y3b38";

export default function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const handleCopyAgentCode = async () => {
    try {
      await navigator.clipboard.writeText(AGENT_CODE);
      toast.success("Agent code has been copied", {
        duration: 1600,
        className: "w-auto min-w-0 max-w-[260px] px-3 py-2 pr-7",
      });
    } catch {
      toast.error("Copy failed", {
        description: "Unable to copy the Agent code.",
        duration: 2200,
        className: "w-auto min-w-0 max-w-[260px] px-3 py-2 pr-7",
      });
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-[#f5f5f6] px-[6px] pb-2 pt-[6px] sm:px-[8px] lg:px-[10px]">
      <div className="flex items-center gap-2 rounded-[10px] border border-[#ebebed] bg-white px-3 py-[7px] shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <button
          className="flex h-8 w-8 items-center justify-center rounded-[9px] border border-[#ececef] text-[#6e7380] lg:hidden"
          onClick={onMenuToggle}
        >
          <Menu size={14} />
        </button>

        <div className="relative max-w-[374px] flex-1">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#b1b5bd]"
          />
          <input
            type="text"
            placeholder="Search for users, groups or settings"
            className="h-[34px] w-full rounded-[8px] border border-[#e4e5e8] bg-[#fbfbfb] pl-9 pr-4 text-[10px] text-[#40444c] outline-none placeholder:text-[#b1b5bd]"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <button className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#ececef] bg-[#fafafa] text-[#747986]">
            <Bell size={14} />
          </button>
          <button
            type="button"
            onClick={handleCopyAgentCode}
            className="hidden items-center gap-1.5 rounded-[8px] border border-[#ececef] bg-[#fafafa] px-3 py-[9px] text-[10px] sm:flex"
          >
            <span className="text-[#70757f]">Agent Code:</span>
            <span className="font-semibold text-[#5468ff]">{AGENT_CODE}</span>
            <Copy size={12} className="text-[#8b8f99]" />
          </button>
        </div>
      </div>
    </header>
  );
}
