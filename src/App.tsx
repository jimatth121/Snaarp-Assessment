import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { bottomItems, menuItems } from "@/components/dashboard/navigation";
import Index from "./pages/Index.tsx";
import ComingSoonPage from "./pages/ComingSoonPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardShell />}>
            <Route index element={<Index />} />
            {menuItems
              .filter((item) => item.path !== "/")
              .map((item) => (
                <Route key={item.path} path={item.path.slice(1)} element={<ComingSoonPage title={item.label} />} />
              ))}
            {bottomItems.map((item) => (
              <Route key={item.path} path={item.path.slice(1)} element={<ComingSoonPage title={item.label} />} />
            ))}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
