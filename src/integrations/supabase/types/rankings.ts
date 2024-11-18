import { BaseTable } from './base';

export interface RestaurantRankingsView {
  Row: {
    restaurant_id: string;
    restaurant_name: string;
    period_start: string;
    period_type: 'daily' | 'weekly' | 'monthly';
    pizzas_sold: number;
    total_quantity: number;
    total_revenue: number;
  };
}