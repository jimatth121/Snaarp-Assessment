import { useState } from "react";
import { Globe } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const initialActivities = [
  { id: "chrome", name: "Chrome", icon: "🌐", pct: 78, color: "bg-chart-green", hours: "5 hours 12 minutes" },
  { id: "gmail", name: "Gmail", icon: "✉️", pct: 67, color: "bg-chart-red", hours: "2 hours 24 minutes" },
  { id: "firefox", name: "Firefox", icon: "🦊", pct: 45, color: "bg-chart-orange", hours: "40 minutes" },
  { id: "instagram", name: "Instagram", icon: "📷", pct: 78, color: "bg-chart-green", hours: "5 hours 8 minutes" },
  { id: "xcom", name: "X.com", icon: "𝕏", pct: 55, color: "bg-chart-blue", hours: "1 hours 8 minutes" },
  { id: "facebook", name: "Facebook", icon: "📘", pct: 8, color: "bg-chart-red", hours: "3 hours 1 minute" },
];

const timeFilters = ["Month", "Week", "Day"];

function reorder<T>(list: T[], s: number, e: number): T[] {
  const r = Array.from(list);
  const [removed] = r.splice(s, 1);
  r.splice(e, 0, removed);
  return r;
}

export default function WebActivityWidget() {
  const [timeFilter, setTimeFilter] = useState("Month");
  const [activities, setActivities] = useState(initialActivities);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setActivities((prev) => reorder(prev, result.source.index, result.destination!.index));
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Globe size={18} className="text-primary" />
          <h2 className="font-semibold text-foreground">Web Activity</h2>
        </div>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="text-xs bg-secondary rounded-lg px-3 py-1.5 text-muted-foreground border-none outline-none"
        >
          {timeFilters.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <p className="text-xs text-muted-foreground mb-4">View your comprehensive organizations web report</p>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="web-activity-rows">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
              {activities.map((a, i) => (
                <Draggable key={a.id} draggableId={a.id} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex items-center gap-3 p-1 rounded-lg cursor-grab active:cursor-grabbing transition-all ${
                        snapshot.isDragging ? "bg-accent shadow-md" : "hover:bg-secondary/50"
                      }`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-xs font-bold text-foreground">
                        {a.icon}
                      </div>
                      <span className="text-xs font-medium text-foreground w-20 truncate">{a.name}</span>
                      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${a.color}`} style={{ width: `${a.pct}%` }} />
                      </div>
                      <span className="text-[10px] text-muted-foreground w-8 text-right">{a.pct}%</span>
                      <span className="text-[10px] text-muted-foreground w-28 text-right">{a.hours}</span>
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
