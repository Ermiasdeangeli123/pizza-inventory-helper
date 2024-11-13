import { Link, useLocation } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { Button } from "./ui/button";
import { LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NavigationProps {
  session: Session | null;
}

const Navigation = ({ session }: NavigationProps) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show navigation on landing page
  if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logout effettuato con successo");
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/profits", label: "Profitti" },
    { path: "/inventory", label: "Inventario" },
    { path: "/sales", label: "Vendite" },
    { path: "/menu", label: "Menu" },
  ];

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <>
      {menuItems.map((item) => (
        <NavigationMenuItem key={item.path}>
          <Link to={item.path} onClick={onClick}>
            <NavigationMenuLink
              className={cn(
                "px-4 py-2 hover:bg-accent rounded-md transition-colors block",
                location.pathname === item.path && "bg-accent"
              )}
            >
              {item.label}
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      ))}
    </>
  );

  return (
    <div className="border-b mb-6">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavLinks />
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-4 mt-8">
                  <NavigationMenu className="block">
                    <NavigationMenuList className="flex-col items-start">
                      <NavLinks onClick={() => setIsOpen(false)} />
                    </NavigationMenuList>
                  </NavigationMenu>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="justify-start px-4"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Esci
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Logout Button */}
          <div className="hidden md:block">
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Esci
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;