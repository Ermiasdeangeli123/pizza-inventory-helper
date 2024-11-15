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
      const { data, error } = await supabase
        .from("inventory")
        .select("*, category_id, expiry_date")
        .eq("user_id", userId);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

export const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const userId = session?.user?.id;

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      // Ensure expiry_date is properly formatted for Supabase
      if (updates.expiry_date instanceof Date) {
        updates.expiry_date = updates.expiry_date.toISOString();
      }

      const { error } = await supabase
        .from("inventory")
        .update(updates)
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