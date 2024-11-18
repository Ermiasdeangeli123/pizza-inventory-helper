export interface RestaurantRankingsView {
  Row: {
    restaurant_id: string | null;
    restaurant_name: string | null;
    period_start: string | null;
    period_type: string | null;
    pizzas_sold: number | null;
    total_quantity: number | null;
    total_revenue: number | null;
  };
}