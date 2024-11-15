import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useSession } from "@supabase/auth-helpers-react";

export const useInventory = () => {
  const session = useSession();
  const userId = session?.user?.id;

  return useQuery({
    queryKey: ["inventory", userId],
    queryFn: async () => {
      if (!userId) {
        console.error("No user ID available");
        return [];
      }

      const { data, error } = await supabase
        .from("inventory")
        .select("*, category_id, expiry_date")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching inventory:", error);
        toast.error("Errore nel caricamento dell'inventario");
        throw error;
      }

      if (!data || data.length === 0) {
        console.log("No inventory data found for user:", userId);
      }

      return data || [];
    },
    enabled: !!userId,
    retry: 2,
  });
};

export const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { error } = await supabase
        .from("inventory")
        .update({
          ...updates,
          expiry_date: updates.expiry_date ? updates.expiry_date.toISOString() : null
        })
        .eq("id", id)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Inventario aggiornato");
    },
    onError: (error) => {
      toast.error("Errore nell'aggiornamento dell'inventario");
      console.error(error);
    },
  });
};

export const useAddInventoryItem = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async (newItem: any) => {
      const { error } = await supabase
        .from("inventory")
        .insert([{ ...newItem, user_id: userId }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Prodotto aggiunto");
    },
    onError: (error) => {
      toast.error("Errore nell'aggiunta del prodotto");
      console.error(error);
    },
  });
};

export const useDeleteInventoryItem = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("inventory")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      toast.success("Prodotto eliminato");
    },
    onError: (error) => {
      toast.error("Errore nell'eliminazione del prodotto");
      console.error(error);
    },
  });
};
