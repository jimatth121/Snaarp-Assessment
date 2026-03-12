// @ts-nocheck
import { useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd";
import type { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronDown,
  LaptopMinimal,
  Mail,
  MonitorSmartphone,
  Power,
  ScanLine,
  SquareUserRound,
  Building2,
  UsersRound,
  AppWindow,
  Download,
  Monitor,
  Apple,
  Laptop,
  MailOpen,
  MailX,
} from "lucide-react";
import { DeviceBrandIcon } from "./brandIcons";
import { DragHandle, SectionHeader, SectionShell, SparkAreaChart, TrendBadge, UpgradeButton } from "./shared";

type CoreCard = {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  change: number;
  points: Array<{ label: string; value: number }>;
  stroke: string;
  fill: string;
  stats: { label: string; value: string; icon: React.ComponentType<{ size?: number; className?: string }> }[];
  footer: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
    iconType?: "device";
  }[];
};

type SideCard = {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  change: number;
  points: Array<{ label: string; value: number }>;
  stroke: string;
  fill: string;
};

const initialCoreCards: CoreCard[] = [
  {
    id: "devices",
    title: "Number Of Devices",
    icon: MonitorSmartphone ,
    value: "3,836",
    change: 15,
    points: [
      { label: "Jan", value: 24 },
      { label: "Feb", value: 39 },
      { label: "Mar", value: 52 },
      { label: "Apr", value: 67 },
      { label: "May", value: 72 },
      { label: "Jun", value: 72 },
      { label: "Jul", value: 79 },
      { label: "Aug", value: 86 },
    ],
    stroke: "#73c63a",
    fill: "#b8eb87",
    stats: [
      { label: "Plugged", value: "1,923", icon: ScanLine },
      { label: "Unplugged", value: "1,913", icon: ScanLine },
    ],
    footer: [
      { label: "Windows", value: "1,403 devices", iconType: "device" },
      { label: "Mac", value: "632 devices", iconType: "device" },
      { label: "Linux", value: "1,801 devices", iconType: "device" },
    ],
  },
  {
    id: "users",
    title: "Users",
    icon: SquareUserRound,
    value: "3,836",
    change: -15,
    points: [
      { label: "Jan", value: 88 },
      { label: "Feb", value: 80 },
      { label: "Mar", value: 73 },
      { label: "Apr", value: 70 },
      { label: "May", value: 70 },
      { label: "Jun", value: 63 },
      { label: "Jul", value: 51 },
      { label: "Aug", value: 37 },
    ],
    stroke: "#ff5b56",
    fill: "#ff988b",
    stats: [
      { label: "Active", value: "592", icon: Power },
      { label: "Offline", value: "3,836", icon: Power },
    ],
    footer: [
      { label: "Organizations", value: "1,403 users", icon: Building2 },
      { label: "Departments", value: "632 users", icon: UsersRound },
      { label: "Groups", value: "1,801 users", icon: UsersRound },
    ],
  },
  {
    id: "emails",
    title: "Emails",
    icon: Mail,
    value: "316",
    change: -23,
    points: [
      { label: "Jan", value: 86 },
      { label: "Feb", value: 80 },
      { label: "Mar", value: 74 },
      { label: "Apr", value: 73 },
      { label: "May", value: 72 },
      { label: "Jun", value: 63 },
      { label: "Jul", value: 51 },
      { label: "Aug", value: 37 },
    ],
    stroke: "#ff5b56",
    fill: "#ff988b",
    stats: [
      { label: "Sent", value: "592", icon: ArrowUpRight },
      { label: "Received", value: "3,836", icon: ArrowDownLeft },
    ],
    footer: [
      { label: "Read", value: "1,403 emails", icon: MailOpen },
      { label: "Unread", value: "632 emails", icon: MailX },
    ],
  },
];

const initialSideCards: SideCard[] = [
  {
    id: "apps",
    title: "Number of Apps",
    icon: AppWindow,
    value: "316",
    change: -23,
    points: [
      { label: "Jan", value: 82 },
      { label: "Feb", value: 76 },
      { label: "Mar", value: 68 },
      { label: "Apr", value: 66 },
      { label: "May", value: 65 },
      { label: "Jun", value: 50 },
      { label: "Jul", value: 43 },
      { label: "Aug", value: 27 },
    ],
    stroke: "#ff5b56",
    fill: "#ff988b",
  },
  {
    id: "downloads",
    title: "Number of Downloads",
    icon: Download,
    value: "316",
    change: 23,
    points: [
      { label: "Jan", value: 22 },
      { label: "Feb", value: 38 },
      { label: "Mar", value: 51 },
      { label: "Apr", value: 63 },
      { label: "May", value: 76 },
      { label: "Jun", value: 77 },
      { label: "Jul", value: 78 },
      { label: "Aug", value: 84 },
    ],
    stroke: "#73c63a",
    fill: "#b8eb87",
  },
];

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

function DeviceCard({
  card,
  dragHandleProps,
}: {
  card: CoreCard;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}) {
  return (
    <div className="flex h-full flex-col gap-3 bg-transparent">
      <div className="flex-1 rounded-[16px] border border-[#ececee] bg-white px-4 pb-5 pt-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-3  text-[12px] font-medium text-[#404247]">
              <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#f1f1f2] text-[#595d66]">
                <card.icon size={15} />
              </span>
              <span className="text-[14px]">{card.title}</span>
            </div>
          </div>
          <DragHandle dragHandleProps={dragHandleProps} className="drag-handle-child" />
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-semibold tracking-[-0.04em] text-[#3c3d41]">{card.value}</span>
              <TrendBadge change={card.change} />
            </div>
            <p className="mt-3 text-[12px] text-[#575b63]">Compared to last week</p>
          </div>
          <div className="shrink-0">
            <SparkAreaChart className="h-[54px] w-[122px]" data={card.points} dataKey="value" stroke={card.stroke} fill={card.fill} />
          </div>
        </div>

        <div className="mt-5 border-t border-[#ececef] pt-5">
          <div className="grid grid-cols-2 gap-5">
            {card.stats.map((item, index) => (
              <div key={item.label}>
                <div className="flex items-center gap-3 text-[12px] text-[#474b53]">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-[8px] ${
                      index === 0 ? "bg-[#eef6e3] text-[#76bc35]" : "bg-[#fff0f0] text-[#ff5a5a]"
                    }`}
                  >
                    <item.icon size={15} />
                  </span>
                  <span>{item.label}</span>
                </div>
                <div className="mt-4 text-[17px] font-semibold tracking-[-0.04em] text-[#3a3d44]">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`grid min-h-[78px] w-full rounded-[14px] border border-[#ececee] bg-white  py-1.5 text-[9px] text-[#555963] shadow-[0_1px_2px_rgba(15,23,42,0.02)] ${
          card.footer.length === 2 ? "grid-cols-2" : "grid-cols-3"
        }`}
      >
        {card.footer.map((item) => (
          <div key={item.label} className="flex flex-col justify-center border-r border-[#e5e6e8] px-1  py-1.5 first:pl-2 last:border-r-0 last:pr-2">
            <div className="flex items-center gap-1.5 text-[8px] leading-tight text-[#4a4d55]">
              {item.iconType === "device" ? <DeviceBrandIcon device={item.label} className="h-[14px] w-[14px]" iconClassName="h-[14px] w-[14px]" /> : null}
              {item.icon ? <item.icon size={12} /> : null}
              <span className="truncate">{item.label}</span>
            </div>
            <div className="mt-2 text-[11px] font-semibold leading-tight text-[#3a3d44]">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SimpleMetricCard({
  card,
  dragHandleProps,
}: {
  card: SideCard;
  dragHandleProps?: DraggableProvidedDragHandleProps | null;
}) {
  return (
    <div className="rounded-[16px] border border-[#ececee] bg-[#fcfcfd] px-4 pb-6 pt-6 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 text-[14px] font-medium text-[#404247]">
          <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#f1f1f2] text-[#595d66]">
            <card.icon size={15} />
          </span>
          <span>{card.title}</span>
        </div>
        <DragHandle dragHandleProps={dragHandleProps} className="drag-handle-child" />
      </div>

      <div className="mt-8 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[18px] font-semibold tracking-[-0.04em] text-[#3a3d44]">{card.value}</span>
            <TrendBadge change={card.change} />
          </div>
          <p className="mt-4 text-[12px] text-[#575b63]">Compared to last week</p>
        </div>
        <div className="shrink-0">
          <SparkAreaChart className="h-[76px] w-[164px]" data={card.points} dataKey="value" stroke={card.stroke} fill={card.fill} />
        </div>
      </div>
    </div>
  );
}

export default function DeviceManagementWidget() {
  const [coreCards, setCoreCards] = useState(initialCoreCards);
  const [sideCards, setSideCards] = useState(initialSideCards);

  const onDragEndCore = (result: DropResult) => {
    if (!result.destination) return;
    setCoreCards((current) => reorder(current, result.source.index, result.destination!.index));
  };

  const onDragEndSide = (result: DropResult) => {
    if (!result.destination) return;
    setSideCards((current) => reorder(current, result.source.index, result.destination!.index));
  };

  return (
    <SectionShell className=" ">
      <div className="flex items-center justify-between rounded-[16px] bg-white   px-4 py-3">
        <SectionHeader icon={<LaptopMinimal size={15} />} title="Device Management Dashboard" className="w-full" />
        <div className="flex shrink-0 items-center gap-3">
          <UpgradeButton />
          <button className="text-[#565a62]">
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px]">
        <DragDropContext onDragEnd={onDragEndCore}>
          <Droppable droppableId="device-core" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-1 gap-3 md:grid-cols-3 md:items-stretch"
              >
                {coreCards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index} disableInteractiveElementBlocking>
                    {(dragProvided, snapshot) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        className={`drag-surface drag-child bg-transparent ${snapshot.isDragging ? "drag-surface-dragging" : ""}`}
                        style={dragProvided.draggableProps.style}
                      >
                        <DeviceCard card={card} dragHandleProps={dragProvided.dragHandleProps} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <DragDropContext onDragEnd={onDragEndSide}>
          <Droppable droppableId="device-side">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-3">
                {sideCards.map((card, index) => (
                  <Draggable key={card.id} draggableId={card.id} index={index} disableInteractiveElementBlocking>
                    {(dragProvided, snapshot) => (
                      <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        className={`drag-surface drag-child bg-transparent ${snapshot.isDragging ? "drag-surface-dragging" : ""}`}
                        style={dragProvided.draggableProps.style}
                      >
                        <SimpleMetricCard card={card} dragHandleProps={dragProvided.dragHandleProps} />
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
    </SectionShell>
  );
}
