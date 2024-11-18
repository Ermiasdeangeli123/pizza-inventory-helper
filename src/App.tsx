import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Landing from "./pages/Landing";
import Costs from "./pages/Costs"; // Import the new Costs page
import Rankings from "./pages/Rankings";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/costs" element={<Costs />} /> {/* Add this line for the Costs page */}
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
