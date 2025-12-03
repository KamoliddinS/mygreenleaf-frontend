"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Tag,
  CreditCard,
  Truck,
  FileText,
  MapPin,
  Settings,
  UserCircle,
} from "lucide-react";
import { useLoad } from "@/app/shared/hooks/requests";
import { ME } from "@/app/shared/utils/urls";

const sidebarItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
  { name: "Catalogue", icon: Package, href: "/admin/catalogue" },
  {name: "Brands", icon: Package, href: "/admin/brands"},
  {name: "Products", icon: Package, href: "/admin/products" },
  { name: "Customers", icon: Users, href: "/admin/customers" },
  { name: "Promotions", icon: Tag, href: "/admin/promotions" },
  // { name: "Payments", icon: CreditCard, href: "/admin/payments" },
  // { name: "Delivery", icon: Truck, href: "/admin/delivery" },
  // { name: "Content", icon: FileText, href: "/admin/content" },
  // { name: "Geofencing", icon: MapPin, href: "/admin/geofencing" },
  { name: "Settings", icon: Settings, href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const loadMe = useLoad({url: ME}, [])
  const me  = loadMe.response ? loadMe.response : []
  

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200">
          <div className="bg-green-600 text-white p-2 rounded-md">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-semibold text-gray-800">GreenLeaf Admin</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-4 px-2 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-2 text-sm font-medium rounded-r-full transition-colors ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-200">
        <div className="bg-gray-100 p-2 rounded-full">
          <UserCircle className="text-gray-700" size={28} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{me?.role}</p>
          <p className="text-xs text-gray-500">{me?.email}</p>
        </div>
      </div>
    </div>
  );
}