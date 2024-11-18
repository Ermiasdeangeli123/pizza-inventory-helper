import { Link } from "react-router-dom";

const Navigation = () => {
  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Inventario", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Costi", href: "/costs" },
    { name: "Classifica", href: "/rankings" },
  ];

  return (
    <nav>
      <ul className="flex space-x-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link to={item.href} className="text-gray-700 hover:text-gray-900">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
