import { useMemo, useState } from "react";
import { BarChart3, LineChart, Mail } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardTooltip, Dot, FilterButton, SectionHeader, SectionShell } from "./shared";

const donutData = [
  { name: "Sent", value: 40, color: "#f7a300" },
  { name: "Received", value: 42, color: "#626ef6" },
  { name: "Unsent", value: 18, color: "#e2e2e6" },
];

const monthlyData = [
  { month: "JAN", Sent: 420, Received: 312, Unsent: 110, Total: 842 },
  { month: "FEB", Sent: 680, Received: 438, Unsent: 120, Total: 1238 },
  { month: "MAR", Sent: 540, Received: 310, Unsent: 95, Total: 945 },
  { month: "APR", Sent: 920, Received: 584, Unsent: 140, Total: 1644 },
  { month: "MAY", Sent: 1320, Received: 838, Unsent: 162, Total: 2320 },
  { month: "JUN", Sent: 863, Received: 932, Unsent: 52, Total: 1847 },
  { month: "JUL", Sent: 1747, Received: 1390, Unsent: 120, Total: 3257 },
  { month: "AUG", Sent: 2880, Received: 1840, Unsent: 175, Total: 4895 },
  { month: "SEP", Sent: 3320, Received: 2055, Unsent: 180, Total: 5555 },
  { month: "OCT", Sent: 3560, Received: 2190, Unsent: 155, Total: 5905 },
  { month: "NOV", Sent: 3410, Received: 2140, Unsent: 180, Total: 5730 },
  { month: "DEC", Sent: 3680, Received: 2215, Unsent: 165, Total: 6060 },
];

const weekData = [
  { month: "W1", Sent: 690, Received: 510, Unsent: 48, Total: 1248 },
  { month: "W2", Sent: 742, Received: 561, Unsent: 44, Total: 1347 },
  { month: "W3", Sent: 703, Received: 534, Unsent: 40, Total: 1277 },
  { month: "W4", Sent: 811, Received: 603, Unsent: 55, Total: 1469 },
];

const dayData = [
  { month: "Mon", Sent: 94, Received: 70, Unsent: 8, Total: 172 },
  { month: "Tue", Sent: 116, Received: 88, Unsent: 10, Total: 214 },
  { month: "Wed", Sent: 102, Received: 79, Unsent: 6, Total: 187 },
  { month: "Thu", Sent: 128, Received: 92, Unsent: 9, Total: 229 },
  { month: "Fri", Sent: 141, Received: 104, Unsent: 11, Total: 256 },
  { month: "Sat", Sent: 119, Received: 83, Unsent: 7, Total: 209 },
  { month: "Sun", Sent: 111, Received: 80, Unsent: 8, Total: 199 },
];

const filterMap = {
  Month: monthlyData,
  Week: weekData,
  Day: dayData,
} as const;

function EmailDonut() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="relative h-[248px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip content={<DashboardTooltip formatter={(value) => `${value}%`} />} />
          <Pie
            data={donutData}
            dataKey="value"
            nameKey="name"
            innerRadius={64}
            outerRadius={88}
            activeIndex={activeIndex}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            paddingAngle={0}
            strokeWidth={0}
          >
            {donutData.map((entry, index) => (
              <Cell key={entry.name} fill={entry.color} opacity={activeIndex === index ? 1 : 0.92} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-[13px] leading-none text-[#4c5059]">Emails</div>
        <div className="mt-1 text-[13px] font-semibold text-[#31343a]">Chart</div>
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[94px] w-[94px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-dashed border-[#5468ff]" />
    </div>
  );
}

export default function EmailChartWidget() {
  const [filter, setFilter] = useState<keyof typeof filterMap>("Month");
  const [chartMode, setChartMode] = useState<"area" | "line">("line");
  const data = useMemo(() => filterMap[filter], [filter]);

  return (
    <SectionShell className="">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-[minmax(255px,312px)_minmax(0,1fr)]">
        <div className="rounded-[10px] border border-[#efeff1] bg-white p-4">
          <SectionHeader icon={<Mail size={13} />} title="Email Chart" />
          <EmailDonut />

          <div className="mt-2 flex items-center justify-center gap-6 text-[10.5px] text-[#50555f]">
            {donutData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <Dot color={item.color} square />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-7 text-center">
            <div className="text-[11px] font-semibold uppercase tracking-[0.02em] text-[#50555f]">Total Emails Sent</div>
            <div className="text-[30px] font-semibold tracking-[-0.03em] text-[#2f3137]">5,421</div>
          </div>
        </div>

        <div className="rounded-[10px] border border-[#efeff1] bg-white p-3">
          <SectionHeader
            icon={<Mail size={13} />}
            title="Total Email"
            actions={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChartMode("area")}
                  className={`flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#e8e8eb] ${
                    chartMode === "area" ? "bg-[#edf2ff] text-[#5468ff]" : "bg-white text-[#7e838f]"
                  }`}
                >
                  <BarChart3 size={14} />
                </button>
                <button
                  onClick={() => setChartMode("line")}
                  className={`flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#e8e8eb] ${
                    chartMode === "line" ? "bg-[#edf2ff] text-[#5468ff]" : "bg-white text-[#7e838f]"
                  }`}
                >
                  <LineChart size={14} />
                </button>
                <FilterButton
                  label={filter}
                  value={filter}
                  options={["Month", "Week", "Day"]}
                  onChange={(value) => setFilter(value as keyof typeof filterMap)}
                  className="w-[84px]"
                />
              </div>
            }
          />

          <div className="mt-4 h-[248px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 6, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalEmailFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5468ff" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#5468ff" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#ececf0" />
                <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#777c88" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#9ca1ab" }} axisLine={false} tickLine={false} />
                <Tooltip content={<DashboardTooltip formatter={(value) => `${value} emails`} />} />
                <Area
                  type="monotone"
                  dataKey="Total"
                  name="Total"
                  stroke="#5468ff"
                  strokeWidth={2}
                  fill={chartMode === "area" ? "url(#totalEmailFill)" : "transparent"}
                  activeDot={{ r: 4, fill: "#fff", stroke: "#5468ff", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
