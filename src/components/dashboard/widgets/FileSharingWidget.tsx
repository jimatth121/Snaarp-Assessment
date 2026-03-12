import { useMemo, useState } from "react";
import { BarChart3, FileText, LineChart } from "lucide-react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardTooltip, Dot, FilterButton, SectionHeader, SectionShell } from "./shared";

const monthlyData = [
  { month: "JAN", Public: 46, Link: 27, Organization: 22 },
  { month: "FEB", Public: 65, Link: 36, Organization: 29 },
  { month: "MAR", Public: 49, Link: 32, Organization: 35 },
  { month: "APR", Public: 46, Link: 31, Organization: 33 },
  { month: "MAY", Public: 74, Link: 43, Organization: 29 },
  { month: "JUN", Public: 80, Link: 58, Organization: 46 },
  { month: "JUL", Public: 67, Link: 54, Organization: 55 },
  { month: "AUG", Public: 49, Link: 26, Organization: 22 },
  { month: "SEP", Public: 46, Link: 31, Organization: 0 },
  { month: "OCT", Public: 49, Link: 33, Organization: 22 },
  { month: "NOV", Public: 73, Link: 39, Organization: 67 },
  { month: "DEC", Public: 48, Link: 29, Organization: 22 },
];

const weekData = [
  { month: "W1", Public: 52, Link: 31, Organization: 21 },
  { month: "W2", Public: 64, Link: 35, Organization: 28 },
  { month: "W3", Public: 71, Link: 39, Organization: 33 },
  { month: "W4", Public: 58, Link: 30, Organization: 24 },
];

const dayData = [
  { month: "Mon", Public: 8, Link: 5, Organization: 3 },
  { month: "Tue", Public: 10, Link: 7, Organization: 5 },
  { month: "Wed", Public: 15, Link: 9, Organization: 7 },
  { month: "Thu", Public: 12, Link: 8, Organization: 6 },
  { month: "Fri", Public: 18, Link: 10, Organization: 8 },
  { month: "Sat", Public: 16, Link: 8, Organization: 6 },
  { month: "Sun", Public: 11, Link: 6, Organization: 4 },
];

const filterMap = {
  Month: monthlyData,
  Week: weekData,
  Day: dayData,
} as const;

export default function FileSharingWidget() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [filter, setFilter] = useState<keyof typeof filterMap>("Day");
  const data = useMemo(() => filterMap[filter], [filter]);

  return (
    <SectionShell className="h-full p-3 bg-white rounded-2xl">
      <SectionHeader
        icon={<FileText size={13} />}
        title="File Sharing"
        subtitle="Keep track of files and how they're shared"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setChartType("bar")}
              className={`flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#e8e8eb] ${
                chartType === "bar" ? "bg-[#edf2ff] text-[#5468ff]" : "bg-white text-[#7e838f]"
              }`}
            >
              <BarChart3 size={14} />
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#e8e8eb] ${
                chartType === "line" ? "bg-[#edf2ff] text-[#5468ff]" : "bg-white text-[#7e838f]"
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

      <div className="mt-5 h-[272px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 4, left: -18, bottom: 0 }} barGap={6}>
            <CartesianGrid vertical={false} stroke="#ececf0" strokeDasharray="4 4" />
            <XAxis dataKey="month" tick={{ fontSize: 9, fill: "#777c88" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "#9ca1ab" }} axisLine={false} tickLine={false} />
            <Tooltip content={<DashboardTooltip formatter={(value) => `${value} files`} />} />
            {chartType === "bar" ? (
              <>
                <Bar dataKey="Public" fill="#3547f3" radius={[6, 6, 0, 0]} maxBarSize={20} />
                <Bar dataKey="Link" fill="#5162fb" radius={[6, 6, 0, 0]} maxBarSize={20} />
                <Bar dataKey="Organization" fill="#8693ff" radius={[6, 6, 0, 0]} maxBarSize={20} />
              </>
            ) : (
              <>
                <Line type="monotone" dataKey="Public" stroke="#3547f3" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="Link" stroke="#5162fb" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
                <Line type="monotone" dataKey="Organization" stroke="#8693ff" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} />
              </>
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-[9.5px] text-[#50555f]">
        <div className="flex items-center gap-2">
          <Dot color="#3547f3" square />
          <span>Public</span>
        </div>
        <div className="flex items-center gap-2">
          <Dot color="#5162fb" square />
          <span>Anyone with link</span>
        </div>
        <div className="flex items-center gap-2">
          <Dot color="#8693ff" square />
          <span>Within Organisation</span>
        </div>
      </div>
    </SectionShell>
  );
}
