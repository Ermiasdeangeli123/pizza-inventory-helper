import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const location = useLocation();

  // Don't show navigation on landing page
  if (location.pathname === "/") {
    return null;
  }

  return (
    <div className="border-b mb-6">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/inventory">
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md transition-colors",
                    location.pathname === "/inventory" && "bg-accent"
                  )}
                >
                  Inventario
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/sales">
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md transition-colors",
                    location.pathname === "/sales" && "bg-accent"
                  )}
                >
                  Vendite
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/menu">
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md transition-colors",
                    location.pathname === "/menu" && "bg-accent"
                  )}
                >
                  Menu
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/profits">
                <NavigationMenuLink
                  className={cn(
                    "px-4 py-2 hover:bg-accent rounded-md transition-colors",
                    location.pathname === "/profits" && "bg-accent"
                  )}
                >
                  Profitti
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default Navigation;