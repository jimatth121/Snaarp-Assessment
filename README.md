# Snaarp Dashboard

A responsive admin dashboard built with React, TypeScript, and Vite.

The project includes draggable dashboard sections, analytics widgets, interactive charts, toast notifications, and a component setup based on Tailwind CSS and shadcn/ui primitives.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI
- React Router
- TanStack Query

## Core Libraries

- `react-beautiful-dnd` for drag-and-drop widget reordering
- `recharts` for charts and mini graph components
- `sonner` for toast notifications
- `lucide-react` for icons
- `react-hook-form` and `zod` for form handling and validation utilities

## Features

- Reorderable dashboard widgets
- Persisted drag-and-drop layout using `localStorage`
- Device management and productivity cards
- Email and file activity charts
- Storage usage donut chart
- Active users map section
- App activity and web activity panels
- Top-right toast notifications
- Responsive sidebar and top navigation

## Project Structure

```text
src/
  components/
    dashboard/
      DashboardLayout.tsx
      Sidebar.tsx
      TopBar.tsx
      widgets/
        ActiveUsersWidget.tsx
        AppActivityWidget.tsx
        CloudNetworkWidget.tsx
        DeviceManagementWidget.tsx
        EmailChartWidget.tsx
        FileSharingWidget.tsx
        OnlineUsersWidget.tsx
        ProductivityReportWidget.tsx
        WebActivityWidget.tsx
        shared.tsx
  pages/
  lib/
  hooks/
```

## Requirements

- Node.js
- Yarn 1.x

## Getting Started

Install dependencies:

```sh
yarn install
```

Start the development server:

```sh
yarn dev
```

Build for production:

```sh
yarn build
```

Preview the production build:

```sh
yarn preview
```

## Scripts

- `yarn dev` starts the Vite development server
- `yarn build` builds the app for production
- `yarn build:dev` builds using development mode
- `yarn preview` serves the production build locally
- `yarn lint` runs ESLint
- `yarn test` runs Vitest once
- `yarn test:watch` runs Vitest in watch mode

## UI Notes

- Drag-and-drop is implemented with `react-beautiful-dnd`
- Drag order is stored in `localStorage`, so dashboard and widget card positions persist after page refresh
- Notifications use `sonner`
- Shared widget helpers live in `src/components/dashboard/widgets/shared.tsx`
- Tailwind utility classes drive most of the layout and styling

## Development Notes

- The app uses `BrowserRouter` for routing
- Widget layouts are composed from reusable dashboard sections
- Layout persistence helpers live in `src/lib/layout-storage.ts`
- Several widgets include custom SVG icon treatments and responsive sizing adjustments

## License

Shaarp Assessment project.
