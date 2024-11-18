import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { it } from 'date-fns/locale';
import type { RestaurantRankingsView } from "@/integrations/supabase/types";

type TimeRange = "daily" | "weekly" | "monthly";

const Rankings = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>("daily");

  const { data: rankings = [], isLoading } = useQuery({
    queryKey: ["rankings", timeRange],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('restaurant_rankings')
        .select('*')
        .eq('period_type', timeRange)
        .order('total_quantity', { ascending: false });

      if (error) throw error;
      return data as RestaurantRankingsView["Row"][];
    }
  });

  const formatPeriodStart = (date: string) => {
    const d = new Date(date);
    switch (timeRange) {
      case "daily":
        return format(d, "dd MMMM yyyy", { locale: it });
      case "weekly":
        return `Settimana del ${format(d, "dd MMMM yyyy", { locale: it })}`;
      case "monthly":
        return format(d, "MMMM yyyy", { locale: it });
      default:
        return date;
    }
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Classifica Ristoranti</CardTitle>
          <Select
            value={timeRange}
            onValueChange={(value: TimeRange) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleziona periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Giornaliero</SelectItem>
              <SelectItem value="weekly">Settimanale</SelectItem>
              <SelectItem value="monthly">Mensile</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Posizione</TableHead>
                <TableHead>Ristorante</TableHead>
                <TableHead>Periodo</TableHead>
                <TableHead className="text-right">Pizze Vendute</TableHead>
                <TableHead className="text-right">Ricavo Totale</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankings.map((ranking, index) => (
                <TableRow key={`${ranking.restaurant_id}-${ranking.period_start}`}>
                  <TableCell className="font-medium">{index + 1}°</TableCell>
                  <TableCell>{ranking.restaurant_name}</TableCell>
                  <TableCell>{formatPeriodStart(ranking.period_start)}</TableCell>
                  <TableCell className="text-right">{ranking.total_quantity}</TableCell>
                  <TableCell className="text-right">€{ranking.total_revenue.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Rankings;