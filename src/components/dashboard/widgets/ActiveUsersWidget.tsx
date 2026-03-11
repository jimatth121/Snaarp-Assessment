import { useState } from "react";
import { Users } from "lucide-react";

const countries = [
  { name: "United Kingdom", flag: "🇬🇧", pct: 78 },
  { name: "Nigeria", flag: "🇳🇬", pct: 61 },
  { name: "UAE", flag: "🇦🇪", pct: 45 },
  { name: "Canada", flag: "🇨🇦", pct: 59 },
  { name: "United States of America", flag: "🇺🇸", pct: 78 },
];

const timeFilters = ["Month", "Week", "Day"];

// SVG World Map simplified outlines
function WorldMap() {
  return (
    <div className="relative w-full h-44 mb-2 overflow-hidden rounded-lg bg-secondary/30">
      <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        {/* Simplified world continents */}
        <g fill="hsl(var(--border))" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.4">
          {/* North America */}
          <path d="M150,80 L180,60 L220,55 L260,60 L280,80 L290,120 L270,160 L250,180 L230,200 L200,220 L180,200 L160,170 L140,140 L130,110 Z" />
          {/* South America */}
          <path d="M220,240 L250,230 L270,250 L280,290 L285,330 L275,370 L260,400 L240,420 L220,410 L210,380 L200,340 L205,300 L210,260 Z" />
          {/* Europe */}
          <path d="M440,60 L460,55 L490,60 L510,70 L520,90 L510,110 L500,130 L480,140 L460,135 L440,120 L430,100 L435,80 Z" />
          {/* Africa */}
          <path d="M450,160 L480,150 L510,160 L530,190 L540,230 L535,270 L520,310 L500,340 L480,350 L460,340 L445,310 L440,270 L435,230 L440,190 Z" />
          {/* Asia */}
          <path d="M540,50 L580,40 L640,45 L700,50 L750,60 L780,80 L790,110 L780,140 L750,160 L720,170 L680,175 L640,170 L600,160 L570,140 L550,120 L540,90 Z" />
          {/* Australia */}
          <path d="M750,300 L790,290 L830,300 L850,320 L845,350 L820,370 L790,375 L760,365 L745,340 L740,320 Z" />
        </g>

        {/* Location markers */}
        {/* UK */}
        <circle cx="458" cy="85" r="5" fill="hsl(var(--primary))" opacity="0.9" />
        <circle cx="458" cy="85" r="8" fill="hsl(var(--primary))" opacity="0.3" />
        {/* Nigeria */}
        <circle cx="470" cy="240" r="5" fill="hsl(var(--chart-green))" opacity="0.9" />
        <circle cx="470" cy="240" r="8" fill="hsl(var(--chart-green))" opacity="0.3" />
        {/* UAE */}
        <circle cx="600" cy="170" r="5" fill="hsl(var(--chart-orange))" opacity="0.9" />
        <circle cx="600" cy="170" r="8" fill="hsl(var(--chart-orange))" opacity="0.3" />
        {/* Canada */}
        <circle cx="210" cy="80" r="5" fill="hsl(var(--chart-blue))" opacity="0.9" />
        <circle cx="210" cy="80" r="8" fill="hsl(var(--chart-blue))" opacity="0.3" />
        {/* USA */}
        <circle cx="220" cy="140" r="5" fill="hsl(var(--chart-red))" opacity="0.9" />
        <circle cx="220" cy="140" r="8" fill="hsl(var(--chart-red))" opacity="0.3" />
      </svg>

      {/* User photo cards overlaid on the map */}
      <div className="absolute bottom-2 left-2 flex gap-1.5">
        {["Stanley", "Fraser", "Sample"].map((name, i) => (
          <div
            key={name}
            className={`relative h-14 w-16 rounded-lg overflow-hidden ${
              i === 0 ? "bg-chart-blue/30" : i === 1 ? "bg-chart-green/30" : "bg-chart-orange/30"
            }`}
          >
            <div className="absolute bottom-0.5 left-0.5 bg-card/80 backdrop-blur-sm rounded px-1 py-0.5 text-[8px] font-medium text-foreground">
              {name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ActiveUsersWidget() {
  const [filter, setFilter] = useState("Month");

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-primary" />
          <h2 className="font-semibold text-foreground">Active Users</h2>
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="text-xs bg-secondary rounded-lg px-3 py-1.5 text-muted-foreground border-none outline-none"
        >
          {timeFilters.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <WorldMap />

      {/* Country list */}
      <div className="space-y-3">
        {countries.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="text-lg">{c.flag}</span>
            <span className="text-sm text-foreground flex-1 truncate">{c.name}</span>
            <span className="text-sm font-semibold text-foreground">{c.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
