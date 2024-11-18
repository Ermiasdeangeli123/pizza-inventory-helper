import { Json } from './base';
import { CategoriesTable } from './categories';
import { InventoryTable } from './inventory';
import { PizzasTable, PizzaIngredientsTable } from './pizzas';
import { ProfilesTable } from './profiles';
import { SalesTable } from './sales';
import { WaitlistTable } from './waitlist';

export type Database = {
  public: {
    Tables: {
      categories: CategoriesTable;
      inventory: InventoryTable;
      pizzas: PizzasTable;
      pizza_ingredients: PizzaIngredientsTable;
      profiles: ProfilesTable;
      sales: SalesTable;
      waitlist: WaitlistTable;
    };
    Views: Record<string, never>;
    Functions: {
      populate_data_for_user: {
        Args: {
          input_user_id: string;
        };
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type * from './base';
export type * from './categories';
export type * from './inventory';
export type * from './pizzas';
export type * from './profiles';
export type * from './sales';
export type * from './waitlist';