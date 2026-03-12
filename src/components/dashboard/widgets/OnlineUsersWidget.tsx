import { useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd";
import { Users } from "lucide-react";
import { FilterButton, SectionHeader, SectionShell, SortHeader } from "./shared";
import { ActivityBrandIcon, DeviceBrandIcon } from "./brandIcons";

const initialRows = [
  ["Annette Black", "Ottawa, Canada", "MSBM, Ottawa", "Windows", "Google Chrome", "3 hours 12 minutes", true],
  ["Floyd Miles", "Lagos, Nigeria", "MSBM, Lagos", "Windows", "Instagram", "2 hours 8 minutes", true],
  ["Ronald Richards", "Dubai, UAE", "MSBM, Dubai", "Mac", "Microsoft Teams", "8 hours 45 minutes", true],
  ["Guy Hawkins", "London, UK", "MSBM, London", "Windows", "Instagram", "1 hour 30 minutes", true],
  ["Jane Cooper", "Frankfurt, Germany", "MSBM, Frankfurt", "Mac", "Google Chrome", "9 hours 10 minutes", true],
  ["Leslie Alexander", "Rome, Italy", "MSBM, Rome", "Windows", "YouTube", "45 minutes", false],
  ["Annette Black", "Calgary, Canada", "MSBM, Calgary", "Linux", "Opera Mini", "45 minutes", false],
  ["Floyd Miles", "Mumbai, India", "MSBM, Mumbai", "Mac", "WhatsApp", "45 minutes", true],
  ["Cody Fisher", "Lagos, Nigeria", "MSBM, Lagos", "Windows", "Microsoft Teams", "45 minutes", false],
  ["Dianne Russell", "London, UK", "MSBM, London", "Linux", "YouTube", "45 minutes", true],
] as const;

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

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
  const [rows, setRows] = useState(Array.from(initialRows));
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [organizationFilter, setOrganizationFilter] = useState("All Organization");

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    setRows((current) => reorder(current, result.source.index, result.destination!.index));
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
                    <Draggable key={`${row[0]}-${index}`} draggableId={`online-row-${index}`} index={index} disableInteractiveElementBlocking>
                      {(dragProvided, snapshot) => (
                        <tr
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className={`drag-row ${snapshot.isDragging ? "drag-row-dragging" : ""} text-[11px] text-[#52565f]`}
                          style={getDraggingRowStyle(dragProvided.draggableProps.style, snapshot.isDragging)}
                        >
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px] first:rounded-l-[10px]`}>
                            <span className={`block h-[8px] w-[8px] rounded-full ${row[6] ? "bg-[#69bb2c]" : "bg-[#c8c8cc]"}`} />
                          </td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>
                            <div className="flex items-center gap-2">
                              <div className={`flex h-7 w-7 items-center justify-center rounded-[7px] bg-gradient-to-br ${avatarTheme(row[0])} text-[8px] font-semibold text-white`}>
                                {row[0].split(" ").map((part) => part[0]).join("")}
                              </div>
                              <span className="font-medium text-[#31343a]">{row[0]}</span>
                            </div>
                          </td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>{row[1]}</td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>{row[2]}</td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>
                            <span className="inline-flex items-center gap-2">
                              <DeviceBrandIcon device={row[3]} className="h-[18px] w-[18px]" iconClassName="h-[16px] w-[16px]" />
                              {row[3]}
                            </span>
                          </td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} px-3 py-[10px]`}>
                            <span className="inline-flex items-center gap-2">
                              <ActivityBrandIcon activity={row[4]} className="h-[18px] w-[18px]" iconClassName="h-[16px] w-[16px]" />
                              {row[4]}
                            </span>
                          </td>
                          <td className={`${index % 2 === 0 ? "" : "bg-[#ededee]"} rounded-r-[10px] px-3 py-[10px]`}>{row[5]}</td>
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
