import { useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable, type DropResult } from "react-beautiful-dnd";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import CloudNetworkWidget from "./widgets/CloudNetworkWidget";
import FileSharingWidget from "./widgets/FileSharingWidget";
import ActiveUsersWidget from "./widgets/ActiveUsersWidget";
import DeviceManagementWidget from "./widgets/DeviceManagementWidget";
import ProductivityReportWidget from "./widgets/ProductivityReportWidget";
import EmailChartWidget from "./widgets/EmailChartWidget";
import OnlineUsersWidget from "./widgets/OnlineUsersWidget";
import AppActivityWidget from "./widgets/AppActivityWidget";
import WebActivityWidget from "./widgets/WebActivityWidget";
import { WidgetDragHandleProvider } from "./widgets/shared";

type WidgetConfig = {
  id: string;
  component: React.ComponentType;
  className: string;
};

const initialWidgets: WidgetConfig[] = [
  { id: "cloud-network", component: CloudNetworkWidget, className: "col-span-full" },
  { id: "file-sharing", component: FileSharingWidget, className: "col-span-full sm:col-span-1" },
  { id: "active-users", component: ActiveUsersWidget, className: "col-span-full sm:col-span-1" },
  { id: "device-management", component: DeviceManagementWidget, className: "col-span-full" },
  { id: "productivity-report", component: ProductivityReportWidget, className: "col-span-full" },
  { id: "email-chart", component: EmailChartWidget, className: "col-span-full" },
  { id: "online-users", component: OnlineUsersWidget, className: "col-span-full" },
  { id: "app-activity", component: AppActivityWidget, className: "col-span-full sm:col-span-1" },
  { id: "web-activity", component: WebActivityWidget, className: "col-span-full sm:col-span-1" },
];

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [widgets, setWidgets] = useState(initialWidgets);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    setWidgets((current) => reorder(current, result.source.index, result.destination!.index));
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f6]">
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarOpen((value) => !value)}
        onCollapseToggle={() => setSidebarCollapsed((value) => !value)}
      />

      <div className={`dashboard-shell ${sidebarCollapsed ? "lg:ml-[78px]" : "lg:ml-[190px]"}`}>
        <div className="dashboard-canvas">
        <TopBar onMenuToggle={() => setSidebarOpen((value) => !value)} />

        <main className="px-[6px] pb-8 pt-0.5 sm:px-[8px] lg:px-[10px]">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dashboard-grid">
              {(dropProvided) => (
                <div
                  ref={dropProvided.innerRef}
                  {...dropProvided.droppableProps}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2"
                >
                  {widgets.map((widget, index) => (
                    <Draggable
                      key={widget.id}
                      draggableId={widget.id}
                      index={index}
                      disableInteractiveElementBlocking
                    >
                      {(dragProvided, snapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          className={`${widget.className} drag-surface drag-parent ${
                            snapshot.isDragging ? "drag-surface-dragging opacity-95" : ""
                          }`}
                          style={dragProvided.draggableProps.style}
                        >
                          <WidgetDragHandleProvider value={dragProvided.dragHandleProps}>
                            <widget.component />
                          </WidgetDragHandleProvider>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {dropProvided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </main>
        </div>
      </div>
    </div>
  );
}
