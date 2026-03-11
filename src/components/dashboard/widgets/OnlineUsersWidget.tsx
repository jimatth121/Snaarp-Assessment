import { useState } from "react";
import { Users } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const allUsers = [
  { name: "Annette Black", location: "Ottawa, Canada", org: "MSBM, Ottawa", device: "Windows", activity: "Google Chrome", time: "3 hours 12 minutes", status: "online" },
  { name: "Floyd Miles", location: "Lagos, Nigeria", org: "MSBM, Lagos", device: "Windows", activity: "Instagram", time: "2 hours 8 minutes", status: "online" },
  { name: "Ronald Richards", location: "Dubai, UAE", org: "MSBM, Dubai", device: "Mac", activity: "Microsoft Teams", time: "8 hours 43 minutes", status: "away" },
  { name: "Guy Hawkins", location: "London, UK", org: "MSBM, London", device: "Windows", activity: "Instagram", time: "1 hour 30 minutes", status: "online" },
  { name: "Jane Cooper", location: "Frankfurt, Germany", org: "MSBM, Frankfurt", device: "Mac", activity: "Google Chrome", time: "9 hours 10 minutes", status: "online" },
  { name: "Leslie Alexander", location: "Rome, Italy", org: "MSBM, Rome", device: "Windows", activity: "YouTube", time: "45 minutes", status: "away" },
  { name: "Annette Black", location: "Calgary, Canada", org: "MSBM, Calgary", device: "Linux", activity: "Opera Mini", time: "45 minutes", status: "online" },
  { name: "Floyd Miles", location: "Mumbai, India", org: "MSBM, Mumbai", device: "Mac", activity: "WhatsApp", time: "45 minutes", status: "away" },
  { name: "Darly Filner", location: "Lagos, Nigeria", org: "MSBM, Lagos", device: "Windows", activity: "Microsoft Teams", time: "45 minutes", status: "online" },
  { name: "Dianne Russell", location: "London, UK", org: "MSBM, London", device: "Linux", activity: "YouTube", time: "45 minutes", status: "online" },
];

const statusColor: Record<string, string> = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
};

const activityIcons: Record<string, string> = {
  "Google Chrome": "🌐",
  "Instagram": "📷",
  "Microsoft Teams": "💬",
  "YouTube": "▶️",
  "Opera Mini": "🔴",
  "WhatsApp": "📱",
};

const orgOptions = ["All Organization", "MSBM, Ottawa", "MSBM, Lagos", "MSBM, Dubai", "MSBM, London", "MSBM, Frankfurt", "MSBM, Rome", "MSBM, Calgary", "MSBM, Mumbai"];

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function OnlineUsersWidget() {
  const [orgFilter, setOrgFilter] = useState("All Organization");
  const [users, setUsers] = useState(allUsers);

  const filtered = orgFilter === "All Organization" ? users : users.filter((u) => u.org === orgFilter);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setUsers((prev) => reorder(prev, result.source.index, result.destination!.index));
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-primary" />
          <h2 className="font-semibold text-foreground">Online Users</h2>
        </div>
        <select
          value={orgFilter}
          onChange={(e) => setOrgFilter(e.target.value)}
          className="text-xs bg-secondary rounded-lg px-3 py-1.5 text-muted-foreground border-none outline-none"
        >
          {orgOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
      <p className="text-xs text-muted-foreground mb-4">View your comprehensive online users</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="text-left px-3 py-2.5 rounded-l-lg text-xs font-medium">Name</th>
              <th className="text-left px-3 py-2.5 text-xs font-medium">↕ Location</th>
              <th className="text-left px-3 py-2.5 text-xs font-medium">↕ Organization</th>
              <th className="text-left px-3 py-2.5 text-xs font-medium">↕ Device</th>
              <th className="text-left px-3 py-2.5 text-xs font-medium">↕ Current Activity</th>
              <th className="text-left px-3 py-2.5 rounded-r-lg text-xs font-medium">↕ Time Usage</th>
            </tr>
          </thead>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="online-users-rows">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {filtered.map((u, i) => (
                    <Draggable key={`${u.name}-${u.org}-${i}`} draggableId={`user-${i}`} index={i}>
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`border-b border-border last:border-none transition-all cursor-grab active:cursor-grabbing ${
                            snapshot.isDragging ? "bg-accent shadow-md" : "hover:bg-secondary/50"
                          }`}
                        >
                          <td className="px-3 py-2.5 flex items-center gap-2">
                            <div className="relative">
                              <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-[10px] font-semibold text-accent-foreground">
                                {u.name.split(" ").map(n => n[0]).join("")}
                              </div>
                              <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-card ${statusColor[u.status]}`} />
                            </div>
                            <span className="text-xs font-medium text-foreground whitespace-nowrap">{u.name}</span>
                          </td>
                          <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{u.location}</td>
                          <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{u.org}</td>
                          <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                            <span className="inline-flex items-center gap-1">
                              {u.device === "Windows" ? "🪟" : u.device === "Mac" ? "🍎" : "🐧"} {u.device}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">
                            <span className="inline-flex items-center gap-1">
                              {activityIcons[u.activity] || "🌐"} {u.activity}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-xs text-muted-foreground whitespace-nowrap">{u.time}</td>
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
