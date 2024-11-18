import { BaseTable } from './base';

export interface ProfilesTable extends BaseTable {
  Row: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    subscription_status: string | null;
    subscription_end_date: string | null;
    created_at: string | null;
    updated_at: string | null;
    currency: string;
  };
  Insert: {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
    subscription_status?: string | null;
    subscription_end_date?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    currency?: string;
  };
  Update: {
    id?: string;
    first_name?: string | null;
    last_name?: string | null;
    subscription_status?: string | null;
    subscription_end_date?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    currency?: string;
  };
  Relationships: [];
}