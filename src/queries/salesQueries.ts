import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import type { Sale } from "@/types/menu";

export const useSales = () => {
  const session = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ["sales", userId],
    queryFn: async () => {
      if (!userId) {
        console.error("No user ID available");
        return [];
      }

      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          pizza:pizzas(*)
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching sales:", error);
        toast.error("Errore nel caricamento delle vendite");
        throw error;
      }

      return data || [];
    },
    enabled: !!userId,
  });
};

export const useAddSale = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async ({ pizzaId, quantity, priceAtTime }: { pizzaId: string; quantity: number; priceAtTime: number }) => {
      const { data, error } = await supabase
        .from("sales")
        .insert([
          {
            pizza_id: pizzaId,
            quantity,
            price_at_time: priceAtTime,
            user_id: userId,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalida sia la query delle vendite che quella dell'inventario
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Vendita registrata");
    },
    onError: (error) => {
      if (error.message.includes("Quantità insufficiente")) {
        toast.error("Quantità insufficiente di ingredienti per questa pizza");
      } else {
        toast.error("Errore nella registrazione della vendita");
      }
      console.error(error);
    },
  });
};