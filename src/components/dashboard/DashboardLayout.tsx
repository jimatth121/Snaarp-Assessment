import { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
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

interface WidgetConfig {
  id: string;
  component: React.ComponentType;
  colSpan: string;
}

const initialWidgets: WidgetConfig[] = [
  { id: "cloud-network", component: CloudNetworkWidget, colSpan: "col-span-full" },
  { id: "file-sharing", component: FileSharingWidget, colSpan: "col-span-full lg:col-span-1" },
  { id: "active-users", component: ActiveUsersWidget, colSpan: "col-span-full lg:col-span-1" },
  { id: "device-management", component: DeviceManagementWidget, colSpan: "col-span-full" },
  { id: "productivity-report", component: ProductivityReportWidget, colSpan: "col-span-full" },
  { id: "email-chart", component: EmailChartWidget, colSpan: "col-span-full" },
  { id: "online-users", component: OnlineUsersWidget, colSpan: "col-span-full" },
  { id: "app-activity", component: AppActivityWidget, colSpan: "col-span-full lg:col-span-1" },
  { id: "web-activity", component: WebActivityWidget, colSpan: "col-span-full lg:col-span-1" },
];

function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [widgets, setWidgets] = useState(initialWidgets);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    setWidgets((prev) => reorder(prev, result.source.index, result.destination!.index));
  }, []);

  const toggleSidebar = useCallback(() => setSidebarCollapsed((c) => !c), []);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar collapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <TopBar onMenuToggle={toggleSidebar} />

        <main className="p-4 md:p-6">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="dashboard">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                >
                  {widgets.map((widget, index) => (
                    <Draggable key={widget.id} draggableId={widget.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${widget.colSpan} cursor-grab active:cursor-grabbing transition-all duration-200 rounded-xl ${
                            snapshot.isDragging
                              ? "shadow-2xl opacity-90 rotate-[0.5deg] scale-[1.01]"
                              : "hover:shadow-md hover:ring-2 hover:ring-primary/10"
                          }`}
                        >
                          <widget.component />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </main>
      </div>
    </div>
  );
}
