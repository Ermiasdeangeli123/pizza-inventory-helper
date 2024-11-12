import { Pizza } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Pizza className="h-8 w-8 text-red-600" />
      <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
        Pizzalova
      </span>
    </div>
  );
};

export default Logo;