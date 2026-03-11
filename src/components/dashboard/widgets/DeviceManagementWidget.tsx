import { useState } from "react";
import { Monitor, TrendingUp, TrendingDown } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

const sparkData: Record<string, number[]> = {
  "Number Of Devices": [30, 50, 40, 60, 45, 55, 50, 65, 55, 60, 50, 60],
  "Users": [45, 35, 50, 40, 55, 45, 35, 50, 40, 45, 35, 40],
  "Emails": [50, 40, 35, 30, 25, 35, 30, 25, 20, 25, 20, 25],
};

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 70;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface CardData {
  id: string;
  title: string;
  value: string;
  change: number;
  subs: { label: string; value: string; icon: string }[];
  platforms: { label: string; value: string }[];
}

const initialCards: CardData[] = [
  {
    id: "devices",
    title: "Number Of Devices",
    value: "3,836",
    change: 11,
    subs: [
      { label: "Plugged", value: "1,923", icon: "🔌" },
      { label: "Unplugged", value: "1,913", icon: "🔋" },
    ],
    platforms: [
      { label: "Windows", value: "1,403 devices" },
      { label: "Mac", value: "632 devices" },
      { label: "Linux", value: "1,801 devices" },
    ],
  },
  {
    id: "users",
    title: "Users",
    value: "3,836",
    change: -15,
    subs: [
      { label: "Active", value: "592", icon: "🟢" },
      { label: "Offline", value: "3,836", icon: "⚫" },
    ],
    platforms: [
      { label: "Organizations", value: "1,403 users" },
      { label: "Departments", value: "632 users" },
      { label: "Groups", value: "1,801 users" },
    ],
  },
  {
    id: "emails",
    title: "Emails",
    value: "316",
    change: -23,
    subs: [
      { label: "Sent", value: "592", icon: "📤" },
      { label: "Received", value: "3,836", icon: "📥" },
    ],
    platforms: [
      { label: "Read", value: "1,403 emails" },
      { label: "Unread", value: "632 emails" },
    ],
  },
];

interface RightCard {
  id: string;
  title: string;
  value: string;
  change: number;
}

const initialRightCards: RightCard[] = [
  { id: "apps", title: "Number of Apps", value: "316", change: -23 },
  { id: "downloads", title: "Number of Downloads", value: "316", change: 23 },
];

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function DeviceManagementWidget() {
  const [cards, setCards] = useState(initialCards);
  const [rightCards, setRightCards] = useState(initialRightCards);

  const onDragEndCards = (result: DropResult) => {
    if (!result.destination) return;
    setCards((prev) => reorder(prev, result.source.index, result.destination!.index));
  };

  const onDragEndRight = (result: DropResult) => {
    if (!result.destination) return;
    setRightCards((prev) => reorder(prev, result.source.index, result.destination!.index));
  };

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Monitor size={18} className="text-primary" />
          <h2 className="font-semibold text-foreground">Device Management Dashboard</h2>
        </div>
        <button className="text-xs font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
          ✦ Upgrade Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <DragDropContext onDragEnd={onDragEndCards}>
          <Droppable droppableId="device-cards" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                {cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-secondary/50 rounded-lg p-4 space-y-3 cursor-grab active:cursor-grabbing transition-all ${
                          snapshot.isDragging ? "shadow-lg opacity-90 scale-[1.02]" : "hover:shadow-sm hover:ring-1 hover:ring-primary/10"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground">{card.title}</p>
                          <Sparkline
                            data={sparkData[card.title]}
                            color={card.change > 0 ? "hsl(var(--success))" : "hsl(var(--destructive))"}
                          />
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-bold text-foreground">{card.value}</span>
                          <span className={`text-xs font-medium flex items-center gap-0.5 ${card.change > 0 ? "text-success" : "text-destructive"}`}>
                            {card.change > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            {Math.abs(card.change)}%
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground">Compared to last week</p>
                        <div className="flex gap-4">
                          {card.subs.map((s) => (
                            <div key={s.label}>
                              <p className="text-[10px] text-muted-foreground">{s.icon} {s.label}</p>
                              <p className="text-sm font-semibold text-foreground">{s.value}</p>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1 border-t border-border">
                          {card.platforms.map((p) => (
                            <div key={p.label} className="text-[10px] text-muted-foreground">
                              <span className="font-medium text-foreground">{p.label}</span>{" "}
                              {p.value}
                            </div>
                          ))}
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

        <DragDropContext onDragEnd={onDragEndRight}>
          <Droppable droppableId="device-right-cards">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                {rightCards.map((rc, index) => (
                  <Draggable key={rc.id} draggableId={rc.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`bg-secondary/50 rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all ${
                          snapshot.isDragging ? "shadow-lg opacity-90 scale-[1.02]" : "hover:shadow-sm hover:ring-1 hover:ring-primary/10"
                        }`}
                      >
                        <p className="text-xs text-muted-foreground">{rc.title}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-2xl font-bold text-foreground">{rc.value}</span>
                          <span className={`text-xs font-medium flex items-center gap-0.5 ${rc.change > 0 ? "text-success" : "text-destructive"}`}>
                            {rc.change > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            {Math.abs(rc.change)}%
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Compared to last week</p>
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
    </div>
  );
}
