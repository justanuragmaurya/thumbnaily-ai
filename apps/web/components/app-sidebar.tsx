import Link from 'next/link';
import { DollarSign, Globe, Image, ImagePlus,User2, WholeWordIcon } from 'lucide-react';
import { ModeToggle } from './ModeToggle';
interface AppSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <aside
        className={`
          flex flex-col
          fixed inset-y-0 left-0 z-30
          w-64 h-full px-2 py-8 
          bg-background
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:h-screen border-r
        `}
        aria-label="Sidebar"
      >
        <div className="flex justify-between items-center mb-6 md:justify-start">
          <div className='flex  w-full justify-between ml-2'>
            <div>
          <h1 className={`text-2xl font-black  bg-gradient-to-br from-blue-400 to-blue-300 text-transparent bg-clip-text`}>Thumbnaily</h1>
          <h2 className='border border-[rgb(229,194,77)] px-5 py-0.5 w-max rounded-full flex text-xs text-[rgb(229,194,77)]'>Beta</h2>
          </div>
          <ModeToggle/>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg p-1.5 md:hidden"
            aria-label="Close sidebar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="space-y-3">
          <Link
            href="/app"
            className="flex items-center px-3 py-2.5 text-sm font-medium border hover:bg-primary-foreground"
          >
            <ImagePlus className="m-1 p-0.5" />
            Generate
          </Link>
          <Link
            href="/my-thumbnails"
            className="flex items-center px-3 py-2.5 text-sm font-medium border hover:bg-primary-foreground"
          >
            <Image className="m-1 p-0.5" />
            My Thumbnails
          </Link>
          <Link
            href="/public"
            className="flex items-center px-3 py-2.5 text-sm font-medium border hover:bg-primary-foreground"
          >
            <Globe className="m-1 p-0.5" />
            All thumbnails
          </Link>
          <Link
            href="/account"
            className="flex items-center px-3 py-2.5 text-sm font-medium border hover:bg-primary-foreground"
          >
            <User2 className="m-1 p-0.5" />
            Account
          </Link>
          <Link
            href="/credits"
            className="flex items-center px-3 py-2.5 text-sm font-medium border hover:bg-primary-foreground"
          >
            <DollarSign className="m-1 p-0.5" />
            Credits
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default AppSidebar;
