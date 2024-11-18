import { Json } from './base';
import { CategoriesTable } from './categories';
import { InventoryTable } from './inventory';
import { PizzasTable, PizzaIngredientsTable } from './pizzas';
import { ProfilesTable } from './profiles';
import { SalesTable } from './sales';
import { WaitlistTable } from './waitlist';
import { RestaurantRankingsView } from './rankings';

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
    Views: {
      restaurant_rankings: RestaurantRankingsView;
    };
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

export type { Json } from './base';
export type { CategoriesTable } from './categories';
export type { InventoryTable } from './inventory';
export type { PizzasTable, PizzaIngredientsTable } from './pizzas';
export type { ProfilesTable } from './profiles';
export type { SalesTable } from './sales';
export type { WaitlistTable } from './waitlist';
export type { RestaurantRankingsView } from './rankings';