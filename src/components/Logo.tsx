import { Pizza } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/dashboard" className="hover:opacity-80 transition-opacity">
      <div className="flex items-center gap-2">
        <Pizza className="h-8 w-8 text-red-600" />
        <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          Pizzalova
        </span>
      </div>
    </Link>
  );
};

export default Logo;