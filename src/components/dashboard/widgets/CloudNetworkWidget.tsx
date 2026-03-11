import { useState } from "react";
import { Cloud, Users, Layers, Upload, Building2, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const sparkData = {
  Users: [30, 45, 35, 60, 40, 55, 35, 50, 40, 60, 45, 55],
  Groups: [20, 35, 50, 40, 60, 45, 55, 70, 50, 65, 55, 70],
  Uploads: [40, 55, 45, 60, 50, 65, 55, 70, 45, 60, 50, 65],
  Departments: [25, 40, 30, 50, 35, 45, 30, 55, 40, 50, 35, 45],
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="ml-auto">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface StatItem {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: LucideIcon;
}

const initialStats: StatItem[] = [
  { id: "users", label: "Users", value: "3,836", change: -15, icon: Users },
  { id: "groups", label: "Groups", value: "316", change: 23, icon: Layers },
  { id: "uploads", label: "Uploads", value: "316", change: 23, icon: Upload },
  { id: "departments", label: "Departments", value: "316", change: -23, icon: Building2 },
];

const storageItems = [
  { label: "Files", color: "hsl(var(--chart-blue))" },
  { label: "Folders", color: "hsl(var(--chart-green))" },
  { label: "Videos", color: "hsl(var(--chart-red))" },
  { label: "Apps", color: "hsl(var(--chart-yellow))" },
  { label: "Audios", color: "hsl(var(--chart-purple))" },
  { label: "Miscellaneous", color: "hsl(var(--chart-cyan))" },
];

// Pie chart segments (percentages)
const pieSegments = [
  { pct: 25, color: "hsl(var(--chart-blue))" },
  { pct: 18, color: "hsl(var(--chart-green))" },
  { pct: 15, color: "hsl(var(--chart-red))" },
  { pct: 12, color: "hsl(var(--chart-yellow))" },
  { pct: 10, color: "hsl(var(--chart-purple))" },
  { pct: 10, color: "hsl(var(--chart-cyan))" },
  { pct: 10, color: "hsl(var(--border))" }, // available
];

function StoragePieChart() {
  const total = pieSegments.reduce((s, seg) => s + seg.pct, 0);
  const r = 42;
  const cx = 50;
  const cy = 50;
  const circumference = 2 * Math.PI * r;
  let cumulative = 0;

  return (
    <div className="relative w-28 h-28 mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        {pieSegments.map((seg, i) => {
          const dashLength = (seg.pct / total) * circumference;
          const dashOffset = -(cumulative / total) * circumference;
          cumulative += seg.pct;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth="14"
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-foreground">80%</span>
        <span className="text-[10px] text-muted-foreground">Used</span>
      </div>
    </div>
  );
}

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function CloudNetworkWidget() {
  const [stats, setStats] = useState(initialStats);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setStats((prev) => reorder(prev, result.source.index, result.destination!.index));
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center gap-2 mb-4">
        <Cloud size={18} className="text-primary" />
        <h2 className="font-semibold text-foreground">Cloud Network</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stats grid - draggable */}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="cloud-stats">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="md:col-span-2 grid grid-cols-2 gap-3"
              >
                {stats.map((stat, index) => (
                  <Draggable key={stat.id} draggableId={stat.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-secondary/50 rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all ${
                          snapshot.isDragging ? "shadow-lg opacity-90 scale-[1.02]" : "hover:shadow-sm hover:ring-1 hover:ring-primary/10"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <stat.icon size={14} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{stat.label}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            <div className="flex items-center gap-1 mt-1">
                              {stat.change > 0 ? (
                                <TrendingUp size={12} className="text-success" />
                              ) : (
                                <TrendingDown size={12} className="text-destructive" />
                              )}
                              <span className={`text-xs font-medium ${stat.change > 0 ? "text-success" : "text-destructive"}`}>
                                {Math.abs(stat.change)}%
                              </span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-0.5">Compared to last week</p>
                          </div>
                          <Sparkline
                            data={sparkData[stat.label as keyof typeof sparkData]}
                            color={stat.change > 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {/* Storage */}
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold text-foreground">Storage</h3>
          </div>
          {/* Note banner */}
          <div className="bg-success/10 border border-success/20 rounded-lg p-3 mb-3">
            <p className="text-xs font-semibold text-success">Note</p>
            <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
              You've almost reached your limit. You have used 80% of your available storage. Upgrade plan to access more space.
            </p>
          </div>
          {/* Pie chart */}
          <StoragePieChart />
          {/* Legend */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-3">
            {storageItems.map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[10px] text-muted-foreground">{item.label}</span>
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-border" />
              <span className="text-[10px] text-muted-foreground">Available Space</span>
            </div>
          </div>
          <button className="mt-3 w-full py-2 text-xs font-medium border border-border rounded-lg text-foreground hover:bg-secondary transition-colors">
            ✦ Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
}
