import { useState } from "react";
import { Share2, BarChart2, LineChart as LineChartIcon } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const allData = [
  { month: "JAN", Public: 30, Link: 50, Organization: 20 },
  { month: "FEB", Public: 55, Link: 40, Organization: 35 },
  { month: "MAR", Public: 45, Link: 55, Organization: 25 },
  { month: "APR", Public: 60, Link: 35, Organization: 40 },
  { month: "MAY", Public: 50, Link: 70, Organization: 30 },
  { month: "JUN", Public: 75, Link: 60, Organization: 55 },
  { month: "JUL", Public: 85, Link: 65, Organization: 60 },
  { month: "AUG", Public: 70, Link: 50, Organization: 45 },
  { month: "SEP", Public: 55, Link: 40, Organization: 35 },
  { month: "OCT", Public: 45, Link: 55, Organization: 25 },
  { month: "NOV", Public: 60, Link: 45, Organization: 40 },
  { month: "DEC", Public: 50, Link: 35, Organization: 30 },
];

const timeFilters = ["Month", "Week", "Day"];

export default function FileSharingWidget() {
  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const [timeFilter, setTimeFilter] = useState("Month");

  const data = timeFilter === "Week" ? allData.slice(0, 4) : timeFilter === "Day" ? allData.slice(0, 7) : allData;

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-primary" />
            <h2 className="font-semibold text-foreground">File Sharing</h2>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Keep track of files and how they're shared</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChartType("bar")}
            className={`p-1.5 rounded ${chartType === "bar" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <BarChart2 size={14} />
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`p-1.5 rounded ${chartType === "line" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <LineChartIcon size={14} />
          </button>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="text-xs bg-secondary rounded-lg px-3 py-1.5 text-muted-foreground border-none outline-none"
          >
            {timeFilters.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart data={data} barGap={2} barSize={10}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Bar dataKey="Public" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Link" fill="hsl(var(--chart-blue))" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Organization" fill="hsl(var(--chart-cyan))" radius={[3, 3, 0, 0]} />
            </BarChart>
          ) : (
            <LineChart data={data}>
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
              <Line type="monotone" dataKey="Public" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Link" stroke="hsl(var(--chart-blue))" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Organization" stroke="hsl(var(--chart-cyan))" strokeWidth={2} dot={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-primary" /><span className="text-xs text-muted-foreground">Public</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-chart-blue" /><span className="text-xs text-muted-foreground">Anyone with link</span></div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm bg-chart-cyan" /><span className="text-xs text-muted-foreground">Within Organisation</span></div>
      </div>
    </div>
  );
}
