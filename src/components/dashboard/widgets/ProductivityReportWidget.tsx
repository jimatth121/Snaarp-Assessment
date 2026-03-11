import { useState } from "react";
import { TrendingUp, TrendingDown, Clock, CalendarDays, Users, Globe, type LucideIcon } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const sparkData: Record<string, number[]> = {
  "Hours Productivity": [40, 55, 35, 50, 45, 30, 50, 40, 35, 45, 30, 40],
  "Days Activity": [20, 35, 45, 55, 40, 60, 50, 65, 55, 60, 50, 65],
  "Users": [50, 45, 60, 40, 55, 35, 50, 45, 40, 35, 45, 40],
  "Web Activity": [30, 40, 35, 45, 30, 40, 35, 25, 35, 30, 25, 30],
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 70;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="ml-auto">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface Metric {
  id: string;
  icon: LucideIcon;
  title: string;
  value: string;
  unit: string;
  change: number;
}

const initialMetrics: Metric[] = [
  { id: "hours", icon: Clock, title: "Hours Productivity", value: "576", unit: "Hrs", change: -15 },
  { id: "days", icon: CalendarDays, title: "Days Activity", value: "267", unit: "Days", change: 15 },
  { id: "users", icon: Users, title: "Users", value: "3,836", unit: "", change: -15 },
  { id: "web", icon: Globe, title: "Web Activity", value: "178", unit: "Activities", change: -15 },
];

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function ProductivityReportWidget() {
  const [metrics, setMetrics] = useState(initialMetrics);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setMetrics((prev) => reorder(prev, result.source.index, result.destination!.index));
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          <h2 className="font-semibold text-foreground">Productivity Report</h2>
        </div>
        <button className="text-xs font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          ✦ Upgrade Plan
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="productivity-metrics" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
            >
              {metrics.map((m, index) => (
                <Draggable key={m.id} draggableId={m.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`bg-secondary/50 rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all ${
                        snapshot.isDragging ? "shadow-lg opacity-90 scale-[1.02]" : "hover:shadow-sm hover:ring-1 hover:ring-primary/10"
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <m.icon size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{m.title}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xl font-bold text-foreground">{m.value}</span>
                            <span className="text-xs text-muted-foreground">{m.unit}</span>
                            <span className={`text-xs font-medium flex items-center gap-0.5 ${m.change > 0 ? "text-success" : "text-destructive"}`}>
                              {m.change > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                              {Math.abs(m.change)}%
                            </span>
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-1">Compared to last week</p>
                        </div>
                        <Sparkline
                          data={sparkData[m.title]}
                          color={m.change > 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
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
    </div>
  );
}
