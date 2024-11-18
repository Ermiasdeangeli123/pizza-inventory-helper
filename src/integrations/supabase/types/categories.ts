import { BaseTable } from './base';

export interface CategoriesTable extends BaseTable {
  Row: {
    icon: string;
    id: string;
    name: string;
  };
  Insert: {
    icon: string;
    id: string;
    name: string;
  };
  Update: {
    icon?: string;
    id?: string;
    name?: string;
  };
  Relationships: [];
}