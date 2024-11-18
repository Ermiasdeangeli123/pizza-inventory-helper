import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCurrency } from "@/hooks/useCurrency";
import type { RestaurantRankingsView } from "@/integrations/supabase/types/rankings";
import { Skeleton } from "@/components/ui/skeleton";

const Rankings = () => {
  const { formatPrice } = useCurrency();
  const { data: rankings = [], isLoading } = useQuery({
    queryKey: ["rankings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('restaurant_rankings')
        .select('*')
        .order('total_quantity', { ascending: false });

      if (error) throw error;
      return data as RestaurantRankingsView["Row"][];
    }
  });

  if (isLoading) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Classifica Ristoranti</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Classifica Ristoranti</CardTitle>
        </CardHeader>
        <CardContent>
          {rankings.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Nessun dato disponibile al momento
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Posizione</TableHead>
                  <TableHead>Pizzeria</TableHead>
                  <TableHead className="text-right">Pizze Vendute</TableHead>
                  <TableHead className="text-right">Ricavi Totali</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rankings.map((ranking, index) => (
                  <TableRow key={`${ranking.restaurant_id}-${index}`}>
                    <TableCell className="font-medium">{index + 1}°</TableCell>
                    <TableCell>{ranking.restaurant_name}</TableCell>
                    <TableCell className="text-right">{ranking.total_quantity}</TableCell>
                    <TableCell className="text-right">
                      {ranking.total_revenue ? formatPrice(ranking.total_revenue) : '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Rankings;