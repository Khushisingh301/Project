import React, { useState } from "react";
import {
  Menu,
  User,
  Home,
  FolderOpen,
  Users,
  FileText,
  X,
  Search,
  ChevronDown,
} from "lucide-react";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";

// Sidebar Component

// SearchBar Component

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/", icon: Home, active: true },
    { name: "Projects", href: "/projects", icon: FolderOpen },
    { name: "Teams", href: "/teams", icon: Users },
    { name: "Requests", href: "/requests", icon: FileText },
  ];

  return (
    <>
      <header className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl overflow-hidden z-30">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700/20 via-transparent to-transparent"></div>

        {/* Main Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Section - Menu Button & Logo */}
            <div className="flex items-center space-x-6">
              {/* Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-6 h-6 group-hover:scale-105 transition-transform duration-200" />
              </button>

              {/* Logo Section */}
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src="images.svg" // Replace with the actual logo file path
                    alt="Heineken Logo"
                    className="w-20 h-20 object-contain hover:scale-105 transition-transform duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Center Section - Navigation & Search */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Desktop Navigation */}
              <nav className="flex items-center space-x-1">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                        item.active
                          ? "text-emerald-400 bg-emerald-500/10"
                          : "text-slate-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span className="relative z-10">{item.name}</span>
                      {item.active && (
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full"></div>
                      )}
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/5 group-hover:to-cyan-500/5 transition-all duration-300"></div>
                    </a>
                  );
                })}
              </nav>

              {/* Search Bar Component */}
              <div className="w-80">
                <SearchBar />
              </div>
            </div>

            {/* Right Section - User Icon */}
            <div className="flex items-center">
              <button
                className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
                aria-label="User menu"
              >
                <User className="w-6 h-6 group-hover:scale-105 transition-transform duration-200" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden pb-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      item.active
                        ? "text-emerald-400 bg-emerald-500/10"
                        : "text-slate-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Mobile Search Component */}
            <SearchBar />
          </div>
        </div>

        {/* Bottom Border Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      </header>

      {/* Sidebar Component */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
