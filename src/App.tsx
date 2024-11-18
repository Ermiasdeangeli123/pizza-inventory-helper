import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from "@/integrations/supabase/client";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Account from "./pages/Account";
import Shopping from "./pages/Shopping";
import Analysis from "./pages/Analysis";
import { useEffect, useState } from "react";
import { Session } from "@supabase/supabase-js";
import { toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session:", session?.user?.id);
      setSession(session);
      if (session?.user) {
        toast.success("Bentornato!");
      }
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);
      
      if (event === 'TOKEN_REFRESHED') {
        console.log('Token has been refreshed');
      }
      
      if (event === 'SIGNED_OUT') {
        // Clear any application cache/state if needed
        queryClient.clear();
      }
      
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <SessionContextProvider 
      supabaseClient={supabase} 
      initialSession={session}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation session={session} />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={session ? <Dashboard /> : <Navigate to="/login" />}
              />
              <Route
                path="/inventory"
                element={session ? <Index /> : <Navigate to="/login" />}
              />
              <Route
                path="/menu"
                element={session ? <Menu /> : <Navigate to="/login" />}
              />
              <Route
                path="/shopping"
                element={session ? <Shopping /> : <Navigate to="/login" />}
              />
              <Route
                path="/account"
                element={session ? <Account /> : <Navigate to="/login" />}
              />
              <Route
                path="/analysis"
                element={session ? <Analysis /> : <Navigate to="/login" />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  );
};

export default App;