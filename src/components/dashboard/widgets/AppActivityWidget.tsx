import { useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd";
import { AppWindow } from "lucide-react";
import { FilterButton, SectionHeader, SectionShell, SortHeader } from "./shared";
import { AppBrandIcon } from "./brandIcons";
import { applyStoredOrder, readStoredOrder, reorder, saveStoredOrder } from "@/lib/layout-storage";

const APP_ACTIVITY_STORAGE_KEY = "snaarp:app-activity-rows";

const initialApps = [
  { id: "chrome", name: "Google Chrome", totalUsers: 34, totalHours: "3 hours 12 minutes", date: "2024-06-26 15:33:49" },
  { id: "youtube", name: "YouTube", totalUsers: 12, totalHours: "2 hours 8 minutes", date: "2024-05-26 12:45:41" },
  { id: "teams", name: "Microsoft Teams", totalUsers: 16, totalHours: "6 hours 45 minutes", date: "2024-05-21 16:28:21" },
  { id: "whatsapp", name: "WhatsApp", totalUsers: 49, totalHours: "1 hour 30 minutes", date: "2024-06-26 15:33:49" },
  { id: "opera-mini", name: "Opera Mini", totalUsers: 3, totalHours: "9 hours 10 minutes", date: "2024-05-21 16:28:21" },
  { id: "instagram", name: "Instagram", totalUsers: 22, totalHours: "45 minutes", date: "2024-05-26 12:45:41" },
] as const;

export default function AppActivityWidget() {
  const [apps, setApps] = useState(() => applyStoredOrder(Array.from(initialApps), readStoredOrder(APP_ACTIVITY_STORAGE_KEY)));
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [organizationFilter, setOrganizationFilter] = useState("All Organization");
  const [periodFilter, setPeriodFilter] = useState("Month");

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setApps((current) => {
      const nextApps = reorder(current, result.source.index, result.destination.index);
      saveStoredOrder(APP_ACTIVITY_STORAGE_KEY, nextApps);
      return nextApps;
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
        icon={<AppWindow size={14} />}
        title="App Activity Report"
        subtitle="View your comprehensive organizational app report"
        actions={
          <div className="flex items-center gap-2">
            <FilterButton
              label="All Organization"
              value={organizationFilter}
              options={["All Organization", "MSBM Ottawa", "MSBM Lagos", "MSBM London"]}
              onChange={setOrganizationFilter}
              className="h-[40px] w-[148px] rounded-[12px] bg-[#fafafa]"
            />
            <FilterButton
              label="Month"
              value={periodFilter}
              options={["Month", "Week", "Day"]}
              onChange={setPeriodFilter}
              className="h-[40px] w-[96px] rounded-[12px] bg-[#fafafa]"
            />
          </div>
        }
        className="pb-1"
      />

      <div className="mt-6 overflow-x-auto lg:overflow-x-visible">
        <DragDropContext onDragEnd={onDragEnd}>
          <table ref={tableRef} className="w-full min-w-[560px] table-fixed border-separate border-spacing-y-[4px] text-left lg:min-w-0">
            <colgroup>
              <col className="w-[24%]" />
              <col className="w-[15%]" />
              <col className="w-[28%]" />
              <col className="w-[33%]" />
            </colgroup>
            <thead>
              <tr className="text-[10px] font-semibold text-[#454a53]">
                <th className="rounded-tl-[10px] bg-[#ddddde] px-3 py-3"><SortHeader label="Application" /></th>
                <th className="bg-[#ddddde] px-3 py-3"><SortHeader label="Total Users" /></th>
                <th className="bg-[#ddddde] px-3 py-3"><SortHeader label="Total Number of Hours" /></th>
                <th className="rounded-tr-[10px] bg-[#ddddde] px-3 py-3"><SortHeader label="Date" /></th>
              </tr>
            </thead>
            <Droppable droppableId="app-rows">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {apps.map((app, index) => (
                    <Draggable key={app.id} draggableId={app.id} index={index} disableInteractiveElementBlocking>
                      {(dragProvided, snapshot) => (
                        <tr
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className={`drag-row ${snapshot.isDragging ? "drag-row-dragging" : ""} text-[11px] text-[#52565f]`}
                          style={getDraggingRowStyle(dragProvided.draggableProps.style, snapshot.isDragging)}
                        >
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} rounded-l-[10px] px-3 py-[10px]`}>
                            <span className="inline-flex max-w-full items-center gap-2 truncate font-medium text-[#31343a]">
                              <AppBrandIcon name={app.name} className="h-[18px] w-[18px]" iconClassName="h-[16px] w-[16px]" />
                              <span className="truncate">{app.name}</span>
                            </span>
                          </td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>{app.totalUsers}</td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px] truncate`}>{app.totalHours}</td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} rounded-r-[10px] px-3 py-[10px] truncate`}>{app.date}</td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <tr aria-hidden="true">
                    <td colSpan={4} className="h-3 p-0"></td>
                  </tr>
                </tbody>
              )}
            </Droppable>
          </table>
        </DragDropContext>
      </div>
    </SectionShell>
  );
}
