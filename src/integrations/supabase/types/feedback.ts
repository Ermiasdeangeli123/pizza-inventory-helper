import { BaseTable } from './base';

export interface FeedbackTable extends BaseTable {
  Row: {
    id: string;
    content: string;
    user_id: string;
    created_at: string;
    feedback_type: string;
    status: string;
    rating: number | null;
  };
  Insert: {
    id?: string;
    content: string;
    user_id: string;
    created_at?: string;
    feedback_type?: string;
    status?: string;
    rating?: number | null;
  };
  Update: {
    id?: string;
    content?: string;
    user_id?: string;
    created_at?: string;
    feedback_type?: string;
    status?: string;
    rating?: number | null;
  };
}