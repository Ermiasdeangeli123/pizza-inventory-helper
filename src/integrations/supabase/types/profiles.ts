import { BaseTable } from './base';

export interface ProfilesTable extends BaseTable {
  Row: {
    id: string;
    subscription_status: string | null;
    subscription_end_date: string | null;
    created_at: string | null;
    updated_at: string | null;
    currency: string | null;
    restaurant_name: string | null;
  };
  Insert: {
    id: string;
    subscription_status?: string | null;
    subscription_end_date?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    currency?: string | null;
    restaurant_name?: string | null;
  };
  Update: {
    id?: string;
    subscription_status?: string | null;
    subscription_end_date?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    currency?: string | null;
    restaurant_name?: string | null;
  };
  Relationships: [];
}