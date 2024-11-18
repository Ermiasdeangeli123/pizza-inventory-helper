import { BaseTable } from './base';

export interface FeedbackTable extends BaseTable {
  Row: {
    id: string;
    content: string;
    user_id: string;
    created_at: string;
  };
  Insert: {
    id?: string;
    content: string;
    user_id: string;
    created_at?: string;
  };
  Update: {
    id?: string;
    content?: string;
    user_id?: string;
    created_at?: string;
  };
}