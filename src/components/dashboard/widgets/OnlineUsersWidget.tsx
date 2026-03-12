import { useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd";
import { Users } from "lucide-react";
import { FilterButton, SectionHeader, SectionShell, SortHeader } from "./shared";
import { ActivityBrandIcon, DeviceBrandIcon } from "./brandIcons";
import { applyStoredOrder, readStoredOrder, reorder, saveStoredOrder } from "@/lib/layout-storage";

const ONLINE_USERS_STORAGE_KEY = "snaarp:online-user-rows";

const initialRows = [
  { id: "annette-ottawa", name: "Annette Black", location: "Ottawa, Canada", organization: "MSBM, Ottawa", device: "Windows", activity: "Google Chrome", timeUsage: "3 hours 12 minutes", isOnline: true },
  { id: "floyd-lagos", name: "Floyd Miles", location: "Lagos, Nigeria", organization: "MSBM, Lagos", device: "Windows", activity: "Instagram", timeUsage: "2 hours 8 minutes", isOnline: true },
  { id: "ronald-dubai", name: "Ronald Richards", location: "Dubai, UAE", organization: "MSBM, Dubai", device: "Mac", activity: "Microsoft Teams", timeUsage: "8 hours 45 minutes", isOnline: true },
  { id: "guy-london", name: "Guy Hawkins", location: "London, UK", organization: "MSBM, London", device: "Windows", activity: "Instagram", timeUsage: "1 hour 30 minutes", isOnline: true },
  { id: "jane-frankfurt", name: "Jane Cooper", location: "Frankfurt, Germany", organization: "MSBM, Frankfurt", device: "Mac", activity: "Google Chrome", timeUsage: "9 hours 10 minutes", isOnline: true },
  { id: "leslie-rome", name: "Leslie Alexander", location: "Rome, Italy", organization: "MSBM, Rome", device: "Windows", activity: "YouTube", timeUsage: "45 minutes", isOnline: false },
  { id: "annette-calgary", name: "Annette Black", location: "Calgary, Canada", organization: "MSBM, Calgary", device: "Linux", activity: "Opera Mini", timeUsage: "45 minutes", isOnline: false },
  { id: "floyd-mumbai", name: "Floyd Miles", location: "Mumbai, India", organization: "MSBM, Mumbai", device: "Mac", activity: "WhatsApp", timeUsage: "45 minutes", isOnline: true },
  { id: "cody-lagos", name: "Cody Fisher", location: "Lagos, Nigeria", organization: "MSBM, Lagos", device: "Windows", activity: "Microsoft Teams", timeUsage: "45 minutes", isOnline: false },
  { id: "dianne-london", name: "Dianne Russell", location: "London, UK", organization: "MSBM, London", device: "Linux", activity: "YouTube", timeUsage: "45 minutes", isOnline: true },
] as const;

function avatarTheme(name: string) {
  const themes = [
    "from-[#f1d08a] to-[#c49a50]",
    "from-[#1b1b1d] to-[#46464a]",
    "from-[#8cb4ff] to-[#5378d9]",
    "from-[#1f2024] to-[#5f6069]",
    "from-[#f0d9cf] to-[#c3916b]",
    "from-[#c5dcff] to-[#7fb0ef]",
  ];
  const total = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return themes[total % themes.length];
}

export default function OnlineUsersWidget() {
  const [rows, setRows] = useState(() => applyStoredOrder(Array.from(initialRows), readStoredOrder(ONLINE_USERS_STORAGE_KEY)));
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [organizationFilter, setOrganizationFilter] = useState("All Organization");

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setRows((current) => {
      const nextRows = reorder(current, result.source.index, result.destination.index);
      saveStoredOrder(ONLINE_USERS_STORAGE_KEY, nextRows);
      return nextRows;
    });
  };

  const getDraggingRowStyle = (style: React.CSSProperties | undefined, isDragging: boolean) => {
    if (!isDragging) return style;

    const tableWidth = tableRef.current?.getBoundingClientRect().width;

    return {
      ...style,
      display: "table",
      tableLayout: "fixed",
      width: tableWidth ? `${tableWidth}px` : "100%",
    } satisfies React.CSSProperties;
  };

  return (
    <SectionShell className="rounded-[18px] border border-[#ececee] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      <SectionHeader
        icon={<Users size={14} />}
        title="Online Users"
        subtitle="View your comprehensive online users"
        actions={
          <FilterButton
            label="All Organization"
            value={organizationFilter}
            options={["All Organization", "MSBM Ottawa", "MSBM Lagos", "MSBM London"]}
            onChange={setOrganizationFilter}
            className="h-[40px] w-[148px] rounded-[12px] bg-[#fafafa]"
          />
        }
        className="pb-1"
      />

      <div className="mt-6 overflow-x-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <table ref={tableRef} className="w-full min-w-[1040px] table-fixed border-separate border-spacing-y-[4px] text-left">
            <colgroup>
              <col className="w-[28px]" />
              <col className="w-[20%]" />
              <col className="w-[17%]" />
              <col className="w-[20%]" />
              <col className="w-[14%]" />
              <col className="w-[17%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead>
              <tr className="text-[10px] font-semibold text-[#454a53] ">
                <th className="w-[28px] rounded-tl-[10px] bg-[#ddddde] px-3 py-3"></th>
                <th className="bg-[#ddddde] px-3 py-3">Name</th>
                <th className="bg-[#ddddde] px-3 py-3"><SortHeader label="Location" /></th>
                <th className="bg-[#ddddde] px-3 py-3"><SortHeader label="Organization" /></th>
                <th className="bg-[#ddddde] px-3 py-3"><SortHeader label="Device" /></th>
                <th className="bg-[#ddddde] px-3 py-3"><SortHeader label="Current Activity" /></th>
                <th className="rounded-tr-[10px] bg-[#ddddde] px-3 py-3"><SortHeader label="Time Usage" /></th>
              </tr>
            </thead>
            <Droppable droppableId="online-user-rows">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {rows.map((row, index) => (
                    <Draggable key={row.id} draggableId={row.id} index={index} disableInteractiveElementBlocking>
                      {(dragProvided, snapshot) => (
                        <tr
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className={`drag-row ${snapshot.isDragging ? "drag-row-dragging" : ""} text-[11px] text-[#52565f]`}
                          style={getDraggingRowStyle(dragProvided.draggableProps.style, snapshot.isDragging)}
                        >
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px] first:rounded-l-[10px]`}>
                            <span className={`block h-[8px] w-[8px] rounded-full ${row.isOnline ? "bg-[#69bb2c]" : "bg-[#c8c8cc]"}`} />
                          </td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>
                            <div className="flex items-center gap-2">
                              <div className={`flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-to-br ${avatarTheme(row.name)} text-[8px] font-semibold text-white`}>
                                {row.name.split(" ").map((part) => part[0]).join("")}
                              </div>
                              <span className="font-medium text-[#31343a]">{row.name}</span>
                            </div>
                          </td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>{row.location}</td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>{row.organization}</td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>
                            <span className="inline-flex items-center gap-2">
                              <DeviceBrandIcon device={row.device} className="h-[18px] w-[18px]" iconClassName="h-[16px] w-[16px]" />
                              {row.device}
                            </span>
                          </td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>
                            <span className="inline-flex items-center gap-2">
                              <ActivityBrandIcon activity={row.activity} className="h-[18px] w-[18px]" iconClassName="h-[16px] w-[16px]" />
                              {row.activity}
                            </span>
                          </td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} rounded-r-[10px] px-3 py-[10px]`}>{row.timeUsage}</td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
    </SectionShell>
  );
}
