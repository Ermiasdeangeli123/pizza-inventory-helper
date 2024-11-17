import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Line, CartesianGrid, XAxis, YAxis, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { format, subDays, startOfDay, endOfDay, eachDayOfInterval } from "date-fns";
import { it } from 'date-fns/locale';
import type { Sale } from "@/types/menu";

type TimeRange = "7" | "30" | "90";

interface SalesChartProps {
  sales: Sale[];
}

const SalesChart = ({ sales }: SalesChartProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("7");

  const getDaysRange = (days: number) => {
    const end = endOfDay(new Date());
    const start = startOfDay(subDays(end, days));
    return { start, end };
  };

  const { start, end } = getDaysRange(parseInt(timeRange));

  const salesData = eachDayOfInterval({ start, end }).map(day => {
    const dayStart = startOfDay(day);
    const dayEnd = endOfDay(day);
    
    const daySales = sales.filter(sale => {
      const saleDate = new Date(sale.created_at);
      return saleDate >= dayStart && saleDate <= dayEnd;
    });

    const totalSales = daySales.reduce((acc, sale) => acc + sale.quantity, 0);

    return {
      name: format(day, 'dd/MM', { locale: it }),
      vendite: totalSales
    };
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Vendite nel Periodo</CardTitle>
        <Select
          value={timeRange}
          onValueChange={(value: TimeRange) => setTimeRange(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleziona periodo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Ultimi 7 giorni</SelectItem>
            <SelectItem value="30">Ultimi 30 giorni</SelectItem>
            <SelectItem value="90">Ultimi 90 giorni</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name"
              type="category"
              allowDuplicatedCategory={false}
            />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="vendite" 
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Pizze Vendute"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SalesChart;