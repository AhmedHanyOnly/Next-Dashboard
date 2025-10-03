"use client";

import { useState } from "react";
import { FiMenu, FiHome, FiUsers, FiSettings, FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// تعريف التابات مع دعم children
const navItems = [
  { href: "/dashboard", label: "الرئيسية", icon: <FiHome /> },
  {
    label: "المستخدمين",
    icon: <FiUsers />,
    children: [
      { href: "/dashboard/users/list", label: "قائمة المستخدمين" },
      { href: "/dashboard/users/add", label: "إضافة مستخدم" },
    ],
  },
  { href: "/dashboard/settings", label: "الإعدادات", icon: <FiSettings /> },
];

export default function SidebarLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } bg-white shadow-lg border-r border-gray-200 transition-all duration-300 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {!collapsed && (
            <h2 className="text-lg font-bold text-gray-800">لوحة التحكم</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FiMenu size={20} />
          </Button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 flex flex-col p-2 gap-2">
          {navItems.map((item, index) => (
            <NavItem key={index} item={item} collapsed={collapsed} />
          ))}
        </nav>
      </aside>
    </div>
  );
}

function NavItem({ item, collapsed }) {
  const [open, setOpen] = useState(false);

  if (item.children) {
    return (
      <div>
        <button
          className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors"
          onClick={() => setOpen(!open)}
        >
          <span className="flex items-center gap-3">
            {item.icon && <span className="text-gray-600">{item.icon}</span>}
            {!collapsed && (
              <span className="font-medium text-gray-700">{item.label}</span>
            )}
          </span>
          {!collapsed && (
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-2 text-gray-400"
            >
    <FiChevronDown size={18} />
            </motion.span>
          )}
        </button>

        <AnimatePresence>
          {open && !collapsed && (
            <div className="flex flex-col pl-8 mt-1 gap-1 overflow-hidden">
              {item.children.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="p-2 rounded-lg hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition-colors"
    >
      {item.icon && <span className="text-gray-600">{item.icon}</span>}
      {!collapsed && (
        <span className="font-medium text-gray-700">{item.label}</span>
      )}
    </Link>
  );
}
