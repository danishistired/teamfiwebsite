import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Chirag from "./pages/chirag";
import Varun from "./pages/varun";
import Rahul from "./pages/rahul";
import Ankit from "./pages/ankit";
import NotFound from "./pages/NotFound";
import Danish from "./pages/danish";

const queryClient = new QueryClient();

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          const lenis = (window as any).lenis;
          if (lenis) {
            lenis.scrollTo(element, { duration: 0, immediate: true });
          } else {
            element.scrollIntoView({ behavior: 'auto' });
          }
        }
      }, 0);
    }
  }, [location]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToSection />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/member/danish" element={<Danish />} />
          <Route path="/member/chirag" element={<Chirag />} />
          <Route path="/member/varun" element={<Varun />} />
          <Route path="/member/rahul" element={<Rahul />} />
          <Route path="/member/ankit" element={<Ankit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
