import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

export const useSales = () => {
  const session = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ["sales", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          pizza:pizzas(*)
        `)
        .eq("user_id", userId);

      if (error) throw error;
      return data;
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
      const { error } = await supabase
        .from("sales")
        .insert([
          {
            pizza_id: pizzaId,
            quantity,
            price_at_time: priceAtTime,
            user_id: userId,
          },
        ]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      toast.success("Vendita registrata con successo");
    },
    onError: (error) => {
      toast.error("Errore nella registrazione della vendita");
      console.error(error);
    },
  });
};