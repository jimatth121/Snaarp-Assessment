// @ts-nocheck
import { useMemo, useState, type ComponentType, type ReactNode } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd";
import { ChevronDown, Globe, HardDrive, OctagonAlert, Upload, UserRound, Users2, UsersRound, Zap } from "lucide-react";
import type { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { DragHandle, SparkAreaChart, useWidgetDragHandle } from "./shared";

type StatCard = {
  id: string;
  label: string;
  value: string;
  change: number;
  icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  tone: "positive" | "negative";
  points: number[];
};

type StorageSlice = {
  label: string;
  color: string;
  value: number;
};

type StorageTooltip = {
  x: number;
  y: number;
  label: string;
  value: number;
  color: string;
};

const initialCards: StatCard[] = [
  {
    id: "users",
    label: "Users",
    value: "3,836",
    change: -15,
    icon: UserRound,
    tone: "negative",
    points: [88, 84, 79, 78, 78, 76, 62, 53, 35],
  },
  {
    id: "groups",
    label: "Groups",
    value: "316",
    change: 23,
    icon: Users2,
    tone: "positive",
    points: [28, 46, 62, 83, 100, 101, 101, 110, 116],
  },
  {
    id: "uploads",
    label: "Uploads",
    value: "316",
    change: 23,
    icon: Upload,
    tone: "positive",
    points: [20, 40, 56, 72, 95, 96, 97, 108, 116],
  },
  {
    id: "departments",
    label: "Departments",
    value: "316",
    change: -23,
    icon: UsersRound,
    tone: "negative",
    points: [82, 78, 73, 72, 71, 69, 51, 39, 20],
  },
];

const storageSlices: StorageSlice[] = [
  { label: "Files", color: "#A335D6", value: 15 },
  { label: "Folders", color: "#F3B000", value: 15 },
  { label: "Videos", color: "#8CC004", value: 18 },
  { label: "Apps", color: "#4AA8EE", value: 14 },
  { label: "Audios", color: "#FF4B55", value: 8 },
  { label: "Miscellaneous", color: "#5568F3", value: 10 },
  { label: "Available Space", color: "#D8D8DB", value: 20 },
];

const donutSliceOrder = ["Apps", "Available Space", "Files", "Miscellaneous", "Videos", "Folders", "Audios"];

const storageUsed = storageSlices
  .filter((slice) => slice.label !== "Available Space")
  .reduce((sum, slice) => sum + slice.value, 0);

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function IconTile({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] bg-[#F4F4F4] text-[#4E4E4F]">
      {children}
    </span>
  );
}

function toSparkChartData(points: number[]) {
  return points.map((value, index) => ({ label: `${index + 1}`, value }));
}

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function describeArc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function StatCardView({
  card,
  dragHandleProps,
}: {
  card: StatCard;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}) {
  const positive = card.change > 0;
  const changeColor = positive ? "#64B52B" : "#FF5A57";
  const chartData = toSparkChartData(card.points);
  const stroke = card.tone === "positive" ? "#56B60F" : "#FF5252";
  const fill = card.tone === "positive" ? "#93D84D" : "#FF938B";

  return (
    <article className="h-full rounded-[14px] border border-[#ECECED] bg-white px-[14px] py-[18px]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-[12px]">
          <IconTile>
            <card.icon size={17} strokeWidth={1.85} />
          </IconTile>
          <span className="text-[17px] font-medium tracking-[-0.03em] text-[#454545]">{card.label}</span>
        </div>
        <DragHandle dragHandleProps={dragHandleProps} className="drag-handle-child" />
      </div>

      <div className="mt-[26px] grid grid-cols-[minmax(0,1fr)_120px] items-end gap-x-[12px] xl:grid-cols-[minmax(0,1fr)_150px]">
        <div className="self-end">
          <div className="flex items-center gap-[10px] leading-none">
            <span className="text-[18px] font-semibold tracking-[-0.05em] text-[#3F3F40]">{card.value}</span>
            <span className="inline-flex items-center gap-[5px] text-[12px] font-medium leading-none" style={{ color: changeColor }}>
              <span className="text-[16px] leading-none">{positive ? "\u2191" : "\u2193"}</span>
              {Math.abs(card.change)}%
            </span>
          </div>
          <p className="mt-[28px] text-[11px] leading-none text-[#535457]">Compared to last week</p>
        </div>

        <div className="flex items-end justify-end">
          <SparkAreaChart
            className="h-[56px] w-[120px] xl:h-[72px] xl:w-[150px]"
            data={chartData}
            dataKey="value"
            stroke={stroke}
            fill={fill}
          />
        </div>
      </div>
    </article>
  );
}

function StorageDonut() {
  const [tooltip, setTooltip] = useState<StorageTooltip | null>(null);

  const segments = useMemo(() => {
    const orderedSlices = donutSliceOrder
      .map((label) => storageSlices.find((slice) => slice.label === label))
      .filter((slice): slice is StorageSlice => Boolean(slice));
    let currentAngle = -36;

    return orderedSlices.map((slice) => {
      const sweep = (slice.value / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + sweep;
      currentAngle = endAngle;
      const tooltipPoint = polarToCartesian(120, 120, 104, startAngle + sweep / 2);

      return {
        ...slice,
        path: describeArc(120, 120, 84, startAngle, endAngle),
        tooltipX: tooltipPoint.x,
        tooltipY: tooltipPoint.y,
      };
    });
  }, []);

  return (
    <div className="relative h-[204px] w-[204px] shrink-0">
      <svg viewBox="0 0 240 240" className="h-full w-full overflow-visible">
        {segments.map((segment) => (
          <path
            key={segment.label}
            d={segment.path}
            fill="none"
            stroke={segment.color}
            strokeWidth="24"
            strokeLinecap="butt"
            className="cursor-pointer transition-opacity duration-150 hover:opacity-90"
            onMouseEnter={() => setTooltip({ x: segment.tooltipX, y: segment.tooltipY, label: segment.label, value: segment.value, color: segment.color })}
            onMouseLeave={() => setTooltip(null)}
          />
        ))}
        <circle cx="120" cy="120" r="58" fill="#FBFBFB" />
        <circle cx="120" cy="120" r="57" fill="none" stroke="#586AF5" strokeWidth="6" strokeDasharray="6 7" />
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[17px] font-semibold leading-none text-[#3E3E3F]">80%</span>
        <span className="mt-[5px] text-[16px] leading-[1.02] text-[#4A4A4B]">Used</span>
      </div>

      {tooltip ? (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-[10px] border border-[#E9E9EE] bg-white px-[10px] py-[8px] text-[11px] shadow-[0_10px_24px_rgba(15,23,42,0.12)]"
          style={{ left: (tooltip.x / 240) * 204, top: (tooltip.y / 240) * 204 - 8 }}
        >
          <div className="flex items-center gap-[8px] whitespace-nowrap">
            <span className="h-[10px] w-[10px] rounded-[3px]" style={{ backgroundColor: tooltip.color }} />
            <span className="font-medium text-[#3F3F44]">{tooltip.label}</span>
            <span className="font-semibold text-[#2F3137]">{tooltip.value}%</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StoragePanel() {
  return (
    <article className="h-full min-w-0 rounded-[14px] border border-[#ECECED] bg-white px-[14px] py-[18px]">
      <div className="grid h-full min-w-0 grid-cols-[188px_minmax(0,1fr)] gap-x-0">
        <div>
          <div className="flex items-center gap-[12px]">
            <IconTile>
              <HardDrive size={17} strokeWidth={1.85} />
            </IconTile>
            <span className="text-[17px] font-medium tracking-[-0.03em] text-[#454545]">Storage</span>
          </div>

          <div className="mt-[6px] flex justify-start -ml-[18px] pl-0">
            <StorageDonut />
          </div>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col pt-[15px]">
          <div className="relative rounded-[14px] bg-white px-[14px] py-[11px] shadow-[0_8px_24px_rgba(31,41,55,0.08)]">
            <span className="absolute inset-y-0 left-[1px] w-[7px] rounded-l-[18px] bg-[#F2B100]" />
            <span className="absolute inset-y-0 right-[1px] w-[7px] rounded-r-[18px] bg-[#F2B100]" />
            <span className="absolute inset-y-0 left-[3px] w-[6px] rounded-l-[14px] bg-white" />
            <span className="absolute inset-y-0 right-[3px] w-[6px] rounded-r-[14px] bg-white" />
            <div className="relative flex items-start gap-[11px]">
              <span className="mt-[1px] flex h-[18px] w-[18px] items-center justify-center rounded-[6px] bg-[#F7B502] text-white">
                <OctagonAlert size={11} strokeWidth={2.6} />
              </span>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold text-[#7B2BE2]">Note</div>
                <p className="mt-[2px] text-[12px] leading-[1.5] text-[#505057]">
                  You&apos;ve almost reached your limit
                  <br />
                  You have used {storageUsed}% of your available storage. Upgrade
                  <br />
                  plan to access more space.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-[24px] grid grid-cols-3 gap-x-[28px] gap-y-[18px]">
            {storageSlices.map((slice) => (
              <div key={slice.label} className="flex min-w-0 items-center gap-[10px] text-[12px] font-medium text-[#3F3F44]">
                <span className="h-[15px] w-[15px] shrink-0 rounded-[3px]" style={{ backgroundColor: slice.color }} />
                <span className="whitespace-nowrap">{slice.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto flex justify-end pr-[4px] pt-[24px]">
            <button className="inline-flex h-[44px] items-center gap-[10px] rounded-[11px] border border-[#5A6CFF] bg-[#FBFBFF] px-[20px] text-[14px] font-medium text-[#5A6CFF]">
              <Zap size={16} />
              <span>Upgrade Plan</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function CloudNetworkWidget() {
  const [cards, setCards] = useState(initialCards);
  const widgetDragHandleProps = useWidgetDragHandle();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setCards((current) => reorder(current, result.source.index, result.destination!.index));
  };

  return (
    <section className="space-y-[10px]">
      <div className="rounded-[14px] border border-[#ECECED] bg-white px-[20px] py-[13px]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-[12px]">
            <IconTile>
              <Globe size={18} strokeWidth={1.9} />
            </IconTile>
            <h2 className="text-[20px] font-semibold tracking-[-0.04em] text-[#3F3F40]">Cloud Network</h2>
          </div>

          <button className="text-[#4B4B4E]">
            <ChevronDown size={20} strokeWidth={1.8} />
          </button>
        </div>
        <div>
          <DragHandle dragHandleProps={widgetDragHandleProps} className="drag-handle-parent" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-[10px] sm:grid-cols-[minmax(0,1.2fr)_minmax(340px,1.2fr)] xl:grid-cols-2 sm:items-stretch">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="cloud-network-cards">
            {(dropProvided) => (
              <div
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                className="grid gap-[10px] sm:h-full sm:grid-cols-2 sm:grid-rows-[minmax(160px,184px)_minmax(160px,184px)]"
              >
                {cards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index} disableInteractiveElementBlocking>
                    {(dragProvided, snapshot) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        className={`drag-surface drag-child h-full ${snapshot.isDragging ? "drag-surface-dragging" : ""}`}
                        style={dragProvided.draggableProps.style}
                      >
                        <StatCardView card={card} dragHandleProps={dragProvided.dragHandleProps} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {dropProvided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <div className="sm:h-full">
          <StoragePanel />
        </div>
      </div>
    </section>
  );
}
