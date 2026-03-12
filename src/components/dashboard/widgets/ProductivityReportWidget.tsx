// @ts-nocheck
import { useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd";
import type { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { ChevronDown, Clock3, CalendarDays, UserRound, Globe, ChartNoAxesCombined } from "lucide-react";
import { DragHandle, SectionHeader, SectionShell, SparkAreaChart, TrendBadge, UpgradeButton } from "./shared";
import { applyStoredOrder, readStoredOrder, reorder, saveStoredOrder } from "@/lib/layout-storage";

type ProductivityCard = {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  unit: string;
  change: number;
  points: Array<{ label: string; value: number }>;
  stroke: string;
  fill: string;
};

const initialCards: ProductivityCard[] = [
  {
    id: "hours",
    title: "Hours Productivity",
    icon: Clock3,
    value: "576",
    unit: "Hrs",
    change: -15,
    points: [
      { label: "Jan", value: 84 },
      { label: "Feb", value: 78 },
      { label: "Mar", value: 72 },
      { label: "Apr", value: 71 },
      { label: "May", value: 70 },
      { label: "Jun", value: 61 },
      { label: "Jul", value: 50 },
      { label: "Aug", value: 35 },
    ],
    stroke: "#ff5b56",
    fill: "#ff988b",
  },
  {
    id: "days",
    title: "Days Activity",
    icon: CalendarDays,
    value: "267",
    unit: "Days",
    change: 15,
    points: [
      { label: "Jan", value: 28 },
      { label: "Feb", value: 43 },
      { label: "Mar", value: 54 },
      { label: "Apr", value: 67 },
      { label: "May", value: 71 },
      { label: "Jun", value: 72 },
      { label: "Jul", value: 73 },
      { label: "Aug", value: 81 },
    ],
    stroke: "#73c63a",
    fill: "#b8eb87",
  },
  {
    id: "users",
    title: "Users",
    icon: UserRound,
    value: "3,836",
    unit: "",
    change: -15,
    points: [
      { label: "Jan", value: 84 },
      { label: "Feb", value: 78 },
      { label: "Mar", value: 72 },
      { label: "Apr", value: 71 },
      { label: "May", value: 70 },
      { label: "Jun", value: 61 },
      { label: "Jul", value: 50 },
      { label: "Aug", value: 35 },
    ],
    stroke: "#ff5b56",
    fill: "#ff988b",
  },
  {
    id: "web",
    title: "Web Activity",
    icon: Globe,
    value: "178",
    unit: "Activities",
    change: 15,
    points: [
      { label: "Jan", value: 28 },
      { label: "Feb", value: 43 },
      { label: "Mar", value: 54 },
      { label: "Apr", value: 67 },
      { label: "May", value: 71 },
      { label: "Jun", value: 72 },
      { label: "Jul", value: 73 },
      { label: "Aug", value: 81 },
    ],
    stroke: "#73c63a",
    fill: "#b8eb87",
  },
];

const PRODUCTIVITY_STORAGE_KEY = "snaarp:productivity-cards";

function MetricCard({
  card,
  dragHandleProps,
}: {
  card: ProductivityCard;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}) {
  return (
    <div className="rounded-[12px] border border-[#efeff1] bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] text-[#4b4f58]">
          <span className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#f4f4f5] text-[#5d616c]">
            <card.icon size={15} />
          </span>
          <span>{card.title}</span>
        </div>
        <DragHandle dragHandleProps={dragHandleProps} className="drag-handle-child" />
      </div>

      <div className="mt-6 flex items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[24px] font-semibold tracking-[-0.03em] text-[#3a3d44]">{card.value}</span>
            {card.unit ? <span className="text-[11px] text-[#8a8f99]">{card.unit}</span> : null}
            <TrendBadge change={card.change} />
          </div>
          <p className="mt-7 text-[10px] text-[#6e737d]">Compared to last week</p>
        </div>
        <SparkAreaChart className="h-[72px] w-[150px]" data={card.points} dataKey="value" stroke={card.stroke} fill={card.fill} />
      </div>
    </div>
  );
}

export default function ProductivityReportWidget() {
  const [cards, setCards] = useState(() => applyStoredOrder(initialCards, readStoredOrder(PRODUCTIVITY_STORAGE_KEY)));

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setCards((current) => {
      const nextCards = reorder(current, result.source.index, result.destination.index);
      saveStoredOrder(PRODUCTIVITY_STORAGE_KEY, nextCards);
      return nextCards;
    });
  };

  return (
    <SectionShell className="">
      <div className="flex items-center justify-between border-b bg-white pt-4 rounded-2xl border-[#efeff1] px-2 pb-3">
        <SectionHeader icon={<ChartNoAxesCombined size={13} />} title="Productivity Report" />
        <div className="flex items-center gap-3">
          <UpgradeButton />
          <button className="text-[#8c9099]">
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="productivity-cards" direction="horizontal">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-4"
            >
              {cards.map((card, index) => (
                <Draggable key={card.id} draggableId={card.id} index={index} disableInteractiveElementBlocking>
                  {(dragProvided, snapshot) => (
                    <div
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      className={`drag-surface drag-child ${snapshot.isDragging ? "drag-surface-dragging" : ""}`}
                      style={dragProvided.draggableProps.style}
                    >
                      <MetricCard card={card} dragHandleProps={dragProvided.dragHandleProps} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </SectionShell>
  );
}
