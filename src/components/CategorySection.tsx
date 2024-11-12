import type { Category, InventoryItem } from "@/lib/data";
import InventoryItemComponent from "./InventoryItem";

interface CategorySectionProps {
  category: Category;
  items: InventoryItem[];
  onUpdateQuantity: (id: string, change: number) => void;
}

const CategorySection = ({ category, items, onUpdateQuantity }: CategorySectionProps) => {
  if (items.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{category.icon}</span>
        <h2 className="text-xl font-semibold">{category.name}</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <InventoryItemComponent
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;