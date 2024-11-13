import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import type { Pizza } from "@/types/menu";

export const usePizzas = () => {
  const session = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ["pizzas", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pizzas")
        .select(`
          *,
          pizza_ingredients (
            *,
            ingredient:inventory(*)
          )
        `)
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useAddPizza = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async (pizza: Omit<Pizza, "id">) => {
      const { data: pizzaData, error: pizzaError } = await supabase
        .from("pizzas")
        .insert([{ 
          name: pizza.name,
          price: pizza.price,
          user_id: userId 
        }])
        .select()
        .single();

      if (pizzaError) throw pizzaError;

      if (pizza.pizza_ingredients?.length) {
        const { error: ingredientsError } = await supabase
          .from("pizza_ingredients")
          .insert(
            pizza.pizza_ingredients.map((ing) => ({
              pizza_id: pizzaData.id,
              ingredient_id: ing.ingredient_id,
              quantity: ing.quantity,
              user_id: userId,
            }))
          );

        if (ingredientsError) throw ingredientsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pizzas"] });
      toast.success("Pizza aggiunta con successo");
    },
    onError: (error) => {
      toast.error("Errore nell'aggiunta della pizza");
      console.error(error);
    },
  });
};

export const useUpdatePizza = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Pizza> }) => {
      const { error } = await supabase
        .from("pizzas")
        .update(updates)
        .eq("id", id)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pizzas"] });
      toast.success("Pizza aggiornata con successo");
    },
    onError: (error) => {
      toast.error("Errore nell'aggiornamento della pizza");
      console.error(error);
    },
  });
};

export const useDeletePizza = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("pizzas")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pizzas"] });
      toast.success("Pizza eliminata con successo");
    },
    onError: (error) => {
      toast.error("Errore nell'eliminazione della pizza");
      console.error(error);
    },
  });
};