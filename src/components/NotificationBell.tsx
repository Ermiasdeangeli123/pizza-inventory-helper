import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { useInventory } from "@/queries/inventoryQueries";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export const NotificationBell = () => {
  const { data: inventory } = useInventory();
  
  const notifications = inventory?.reduce((acc: string[], item) => {
    const messages = [];
    
    // Check for low stock
    if (item.quantity <= item.min_stock) {
      messages.push(`${item.name} è sotto la scorta minima (${item.quantity} ${item.unit})`);
    }
    
    // Check for expiring items (7 days)
    if (item.expiry_date) {
      const expiryDate = new Date(item.expiry_date);
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
        messages.push(`${item.name} scadrà tra ${daysUntilExpiry} giorni`);
      }
    }
    
    return [...acc, ...messages];
  }, []) || [];

  const hasNotifications = notifications.length > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {hasNotifications && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        {hasNotifications ? (
          <div className="space-y-2">
            {notifications.map((notification, index) => (
              <div
                key={index}
                className={cn(
                  "text-sm p-2 rounded-md",
                  "bg-muted"
                )}
              >
                {notification}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            Nessuna notifica
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
};