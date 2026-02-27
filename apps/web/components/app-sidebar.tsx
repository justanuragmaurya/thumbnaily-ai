"use client";
import Link from "next/link";
import {
  DollarSign,
  Globe,
  Image,
  ImagePlus,
  User2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["700"],
});

interface AppSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const navItems = [
  { href: "/app", title: "Generate", icon: ImagePlus },
  { href: "/my-thumbnails", title: "My Thumbnails", icon: Image },
  { href: "/public", title: "Explore", icon: Globe },
  { href: "/account", title: "Account", icon: User2 },
  { href: "/credits", title: "Credits", icon: DollarSign },
];

const AppSidebar: React.FC<AppSidebarProps> = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) setIsCollapsed(saved === "true");
  }, []);

  const toggleCollapse = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("sidebarCollapsed", String(next));
  };

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <motion.aside
        animate={{ width: isCollapsed ? "4rem" : "15rem" }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className={`flex flex-col fixed inset-y-0 left-0 z-30 h-full bg-background border-r border-border/50 transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 md:h-screen`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-3 border-b border-border/50">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Link href="/" className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                  <span
                    className={`text-base tracking-tight ${sora.className}`}
                  >
                    thumbnaily
                  </span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1">
            <button
              onClick={toggleCollapse}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors hidden md:flex"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight size={16} />
              ) : (
                <ChevronLeft size={16} />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground md:hidden"
              aria-label="Close sidebar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 px-2 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isCollapsed ? "justify-center" : ""} ${active ? "bg-red-600/10 text-red-500" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                title={item.title}
              >
                <Icon className={isCollapsed ? "h-5 w-5" : "h-4 w-4"} />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div
          className={`px-3 py-3 border-t border-border/50 ${isCollapsed ? "flex justify-center" : ""}`}
        >
          <ModeToggle />
        </div>
      </motion.aside>
    </>
  );
};

export default AppSidebar;
