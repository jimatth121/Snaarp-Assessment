import { useState } from "react";
import { Mail, BarChart2, LineChart as LineChartIcon } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const allData = [
  { month: "JAN", Sent: 500, Received: 300, Unsent: 100 },
  { month: "FEB", Sent: 800, Received: 500, Unsent: 200 },
  { month: "MAR", Sent: 1200, Received: 800, Unsent: 150 },
  { month: "APR", Sent: 1500, Received: 1000, Unsent: 300 },
  { month: "MAY", Sent: 2000, Received: 1200, Unsent: 250 },
  { month: "JUN", Sent: 3000, Received: 2000, Unsent: 400 },
  { month: "JUL", Sent: 5000, Received: 3500, Unsent: 800 },
  { month: "AUG", Sent: 4500, Received: 3000, Unsent: 600 },
  { month: "SEP", Sent: 3500, Received: 2500, Unsent: 400 },
  { month: "OCT", Sent: 3000, Received: 2000, Unsent: 300 },
  { month: "NOV", Sent: 2500, Received: 1800, Unsent: 200 },
  { month: "DEC", Sent: 2000, Received: 1500, Unsent: 150 },
];

const timeFilters = ["Month", "Week", "Day"];

// Donut chart with proper segments
function EmailDonut() {
  const segments = [
    { pct: 45, color: "hsl(var(--chart-orange))" },  // Sent
    { pct: 35, color: "hsl(var(--chart-blue))" },     // Received
    { pct: 20, color: "hsl(var(--chart-green))" },     // Unsent
  ];
  const r = 38;
  const circumference = 2 * Math.PI * r;
  let cumulative = 0;

  return (
    <div className="relative w-32 h-32">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        {segments.map((seg, i) => {
          const dashLength = (seg.pct / 100) * circumference;
          const dashOffset = -(cumulative / 100) * circumference;
          cumulative += seg.pct;
          return (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="10"
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] text-muted-foreground">Emails</span>
        <span className="text-xs font-bold text-foreground">Chart</span>
      </div>
    </div>
  );
}

export default function EmailChartWidget() {
  const [timeFilter, setTimeFilter] = useState("Month");
  const [chartToggle, setChartToggle] = useState<"area" | "bar">("area");

  const data = timeFilter === "Week" ? allData.slice(0, 4) : timeFilter === "Day" ? allData.slice(0, 7) : allData;

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Mail size={18} className="text-primary" />
        <h2 className="font-semibold text-foreground">Email Chart</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Donut */}
        <div className="flex flex-col items-center justify-center">
          <EmailDonut />
          <div className="flex gap-3 mt-3">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-chart-orange" /><span className="text-[10px] text-muted-foreground">Sent</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-chart-blue" /><span className="text-[10px] text-muted-foreground">Received</span></div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-chart-green" /><span className="text-[10px] text-muted-foreground">Unsent</span></div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">TOTAL EMAILS SENT</p>
          <p className="text-lg font-bold text-foreground">5,421</p>
        </div>

        {/* Area chart */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-foreground">Total Email</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setChartToggle("area")}
                className={`p-1.5 rounded ${chartToggle === "area" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <BarChart2 size={14} />
              </button>
              <button
                onClick={() => setChartToggle("bar")}
                className={`p-1.5 rounded ${chartToggle === "bar" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"}`}
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
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-orange))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--chart-orange))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="recvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--chart-blue))" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(var(--chart-blue))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Area type="monotone" dataKey="Sent" stroke="hsl(var(--chart-orange))" fill="url(#sentGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="Received" stroke="hsl(var(--chart-blue))" fill="url(#recvGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="Unsent" stroke="hsl(var(--chart-green))" fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
