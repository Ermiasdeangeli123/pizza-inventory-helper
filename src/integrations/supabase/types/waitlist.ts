import { BaseTable } from './base';

export interface WaitlistTable extends BaseTable {
  Row: {
    id: string;
    email: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    email: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    email?: string;
    created_at?: string;
  };
  Relationships: [];
}