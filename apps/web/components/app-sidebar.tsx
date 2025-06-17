import Link from 'next/link';
import { DollarSign, Globe, Image, ImagePlus, User2, ChevronLeft, ChevronRight } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from "motion/react";

interface AppSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  
  // Restore collapsed state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setIsCollapsed(savedState === 'true');
    }
  }, []);
  
  // Save collapsed state to localStorage
  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', String(newState));
  };

  // Function to check if link is active
  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // Navigation items data
  const navItems = [
    { href: '/app', title: 'Generate', icon: <ImagePlus className={`${isCollapsed ? 'h-6 w-6' : 'mr-3 h-5 w-5'}`} /> },
    { href: '/my-thumbnails', title: 'My Thumbnails', icon: <Image className={`${isCollapsed ? 'h-6 w-6' : 'mr-3 h-5 w-5'}`} /> },
    { href: '/public', title: 'All thumbnails', icon: <Globe className={`${isCollapsed ? 'h-6 w-6' : 'mr-3 h-5 w-5'}`} /> },
    { href: '/account', title: 'Account', icon: <User2 className={`${isCollapsed ? 'h-6 w-6' : 'mr-3 h-5 w-5'}`} /> },
    { href: '/credits', title: 'Credits', icon: <DollarSign className={`${isCollapsed ? 'h-6 w-6' : 'mr-3 h-5 w-5'}`} /> },
  ];

  // Animation variants
  const sidebarVariants = {
    expanded: {
      width: "16rem",
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    collapsed: {
      width: "4rem",
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.3
      }
    }
  };

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <motion.aside
        variants={sidebarVariants}
        animate={isCollapsed ? "collapsed" : "expanded"}
        className={`
          flex flex-col
          fixed inset-y-0 left-0 z-30
          h-full px-2 py-4 
          bg-background
          transform 
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:h-screen border-r
        `}
        aria-label="Sidebar"
      >
        <div className="flex justify-between items-center mb-6">
          <div className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'ml-2'}`}>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h1 className={`text-2xl font-black bg-gradient-to-br from-blue-400 to-blue-300 text-transparent bg-clip-text`}>Thumbnaily</h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Collapse toggle button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleCollapse}
            className={`p-2 rounded-md border bg-primary text-secondary ${isCollapsed ? 'mx-auto' : ''}`}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? 
              <ChevronRight size={20} /> : 
              <ChevronLeft size={20} />
            }
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg p-1.5 md:hidden"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        <motion.nav 
          className="space-y-3 flex-grow"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {navItems.map((item, index) => (
            <motion.div key={item.href} variants={itemVariants}>
              <Link
                href={item.href}
                className={`flex items-center py-2.5 px-3 text-sm font-medium rounded-lg transition-colors
                  ${isCollapsed ? 'justify-center' : ''} 
                  ${isActive(item.href) 
                    ? 'bg-primary-foreground text-primary' 
                    : 'hover:bg-muted'}`}
                title={item.title}
              >
                {item.icon}
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </motion.nav>
        
        {/* Mode toggle moved to bottom */}
        <motion.div 
          className={`mt-auto pt-4 ${isCollapsed ? 'flex justify-center' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <ModeToggle />
        </motion.div>
      </motion.aside>
    </>
  );
};

export default AppSidebar;
