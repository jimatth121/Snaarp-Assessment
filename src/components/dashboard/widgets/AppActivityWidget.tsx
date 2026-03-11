import { useState } from "react";
import { AppWindow } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const initialApps = [
  { id: "chrome", name: "Google Chrome", icon: "🌐", users: 34, hours: "3 hours 12 minutes", date: "2024-06-26 15:33:49" },
  { id: "youtube", name: "YouTube", icon: "▶️", users: 12, hours: "2 hours 8 minutes", date: "2024-06-28 12:45:01" },
  { id: "teams", name: "Microsoft Teams", icon: "💬", users: 18, hours: "6 hours 45 minutes", date: "2024 06 21 16:28:21" },
  { id: "whatsapp", name: "WhatsApp", icon: "📱", users: 49, hours: "1 hour 30 minutes", date: "2024-06-28 15:33:49" },
  { id: "opera", name: "Opera Mini", icon: "🔴", users: 3, hours: "9 hours 10 minutes", date: "2024 06 21 16:28:21" },
  { id: "instagram", name: "Instagram", icon: "📷", users: 22, hours: "45 minutes", date: "2024-06-28 12:45:01" },
];

const orgOptions = ["All Organization", "MSBM, Ottawa", "MSBM, Lagos"];
const timeFilters = ["Month", "Week", "Day"];

function reorder<T>(list: T[], s: number, e: number): T[] {
  const r = Array.from(list);
  const [removed] = r.splice(s, 1);
  r.splice(e, 0, removed);
  return r;
}

export default function AppActivityWidget() {
  const [orgFilter, setOrgFilter] = useState("All Organization");
  const [timeFilter, setTimeFilter] = useState("Month");
  const [apps, setApps] = useState(initialApps);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    setApps((prev) => reorder(prev, result.source.index, result.destination!.index));
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <AppWindow size={18} className="text-primary" />
          <h2 className="font-semibold text-foreground">App Activity Report</h2>
        </div>
        <div className="flex gap-2">
          <select
            value={orgFilter}
            onChange={(e) => setOrgFilter(e.target.value)}
            className="text-xs bg-secondary rounded-lg px-3 py-1.5 text-muted-foreground border-none outline-none"
          >
            {orgOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="text-xs bg-secondary rounded-lg px-3 py-1.5 text-muted-foreground border-none outline-none"
          >
            {timeFilters.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-4">View your comprehensive organizations app report</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">↕ Application</th>
              <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">↕ Total Users</th>
              <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">↕ Total Number of Hours</th>
              <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground">↕ Date</th>
            </tr>
          </thead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="app-activity-rows">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {apps.map((app, i) => (
                    <Draggable key={app.id} draggableId={app.id} index={i}>
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`border-b border-border last:border-none transition-all cursor-grab active:cursor-grabbing ${
                            snapshot.isDragging ? "bg-accent shadow-md" : "hover:bg-secondary/50"
                          }`}
                        >
                          <td className="px-3 py-2.5 text-xs font-medium text-foreground flex items-center gap-2">
                            <span>{app.icon}</span>{app.name}
                          </td>
                          <td className="px-3 py-2.5 text-xs text-muted-foreground">{app.users}</td>
                          <td className="px-3 py-2.5 text-xs text-muted-foreground">{app.hours}</td>
                          <td className="px-3 py-2.5 text-xs text-muted-foreground">{app.date}</td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </DragDropContext>
        </table>
      </div>
    </div>
  );
}
