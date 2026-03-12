import { Globe } from "lucide-react";
import { FilterButton, Progress, SectionHeader, SectionShell } from "./shared";
import { WebBrandIcon } from "./brandIcons";

const items = [
  { name: "Chrome", pct: 78, time: "5 hours 12 minutes" },
  { name: "Gmail", pct: 61, time: "2 hours 24 minutes" },
  { name: "Firefox", pct: 45, time: "40 minutes" },
  { name: "Instagram", pct: 78, time: "5 hours 6 minutes" },
  { name: "x.com", pct: 59, time: "1 hours 8 minutes" },
  { name: "Facebook", pct: 61, time: "3 hours 1 minute" },
];

export default function WebActivityWidget() {
  return (
    <SectionShell className="p-3 bg-white rounded-2xl">
      <SectionHeader
        icon={<Globe size={14} />}
        title="Web Activity"
        subtitle="View your comprehensive organizational web report"
        actions={<FilterButton label="Month" options={["Month", "Week", "Day"]} className="w-[84px]" />}
      />

      <div className="mt-5 space-y-4">
        {items.map((item) => (
          <div key={item.name} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-[#efeff1] pb-4 last:border-b-0 last:pb-0">
            <div className="inline-flex  items-center gap-3 whitespace-nowrap text-[11px] font-medium text-[#31343a]">
              <WebBrandIcon name={item.name} className="h-8 w-8" iconClassName="h-[23px] w-[23px]" />
              <span>{item.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <Progress value={item.pct} />
              </div>
              <span className="text-[10px] text-[#787d88]">{item.pct}%</span>
            </div>
            <div className="text-[10px] text-[#565b65]">{item.time}</div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
