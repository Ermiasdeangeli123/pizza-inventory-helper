import { BaseTable } from './base';

export interface CategoriesTable extends BaseTable {
  Row: {
    id: string;
    name: string;
    icon: string;
  };
  Insert: {
    id: string;
    name: string;
    icon: string;
  };
  Update: {
    id?: string;
    name?: string;
    icon?: string;
  };
  Relationships: [];
}