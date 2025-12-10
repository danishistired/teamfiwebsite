import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AlexChen from "./pages/AlexChen";
import JordanPark from "./pages/JordanPark";
import SamRivera from "./pages/SamRivera";
import TaylorKim from "./pages/TaylorKim";
import CaseyMorgan from "./pages/CaseyMorgan";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/member/alex" element={<AlexChen />} />
          <Route path="/member/jordan" element={<JordanPark />} />
          <Route path="/member/sam" element={<SamRivera />} />
          <Route path="/member/taylor" element={<TaylorKim />} />
          <Route path="/member/casey" element={<CaseyMorgan />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
