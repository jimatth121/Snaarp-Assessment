import { useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd";
import { AppWindow } from "lucide-react";
import { FilterButton, SectionHeader, SectionShell, SortHeader } from "./shared";
import { AppBrandIcon } from "./brandIcons";

const initialApps = [
  ["Google Chrome", 34, "3 hours 12 minutes", "2024-06-26 15:33:49"],
  ["YouTube", 12, "2 hours 8 minutes", "2024-05-26 12:45:41"],
  ["Microsoft Teams", 16, "6 hours 45 minutes", "2024-05-21 16:28:21"],
  ["WhatsApp", 49, "1 hour 30 minutes", "2024-06-26 15:33:49"],
  ["Opera Mini", 3, "9 hours 10 minutes", "2024-05-21 16:28:21"],
  ["Instagram", 22, "45 minutes", "2024-05-26 12:45:41"],
] as const;

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function AppActivityWidget() {
  const [apps, setApps] = useState(Array.from(initialApps));
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [organizationFilter, setOrganizationFilter] = useState("All Organization");
  const [periodFilter, setPeriodFilter] = useState("Month");

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setApps((current) => reorder(current, result.source.index, result.destination!.index));
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
                    <Draggable key={`${app[0]}-${index}`} draggableId={`app-row-${index}`} index={index} disableInteractiveElementBlocking>
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
                              <AppBrandIcon name={app[0]} className="h-[18px] w-[18px]" iconClassName="h-[16px] w-[16px]" />
                              <span className="truncate">{app[0]}</span>
                            </span>
                          </td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>{app[1]}</td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px] truncate`}>{app[2]}</td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} rounded-r-[10px] px-3 py-[10px] truncate`}>{app[3]}</td>
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
