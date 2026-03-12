declare module "react-beautiful-dnd" {
  import * as React from "react";

  export type DraggableProvidedDragHandleProps = Record<string, unknown>;

  export type DropResult = {
    source: {
      index: number;
      droppableId: string;
    };
    destination?: {
      index: number;
      droppableId: string;
    } | null;
  };

  export type DragDropContextProps = {
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
  };

  export type DroppableProvided = {
    innerRef: (element: HTMLElement | null) => void;
    droppableProps: React.HTMLAttributes<HTMLElement>;
    placeholder: React.ReactNode;
  };

  export type DroppableStateSnapshot = {
    isDraggingOver: boolean;
    draggingOverWith?: string | null;
  };

  export type DroppableProps = {
    droppableId: string;
    direction?: "horizontal" | "vertical";
    children: (provided: DroppableProvided, snapshot: DroppableStateSnapshot) => React.ReactNode;
  };

  export type DraggableProvided = {
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: {
      style?: React.CSSProperties;
    } & React.HTMLAttributes<HTMLElement>;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
  };

  export type DraggableStateSnapshot = {
    isDragging: boolean;
  };

  export type DraggableProps = {
    draggableId: string;
    index: number;
    disableInteractiveElementBlocking?: boolean;
    children: (provided: DraggableProvided, snapshot: DraggableStateSnapshot) => React.ReactNode;
  };

  export const DragDropContext: React.ComponentType<DragDropContextProps>;
  export const Droppable: React.ComponentType<DroppableProps>;
  export const Draggable: React.ComponentType<DraggableProps>;
}
