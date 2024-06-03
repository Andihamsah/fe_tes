import Link from 'next/link';
import React from 'react';
import { ShoppingCartIcon, LogoutIcon, OfficeBuildingIcon, HomeIcon } from '@heroicons/react/outline';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen bg-gray-800 text-white w-64 p-5 flex flex-col justify-around">
      <Link href="/home" legacyBehavior>
        <a className="hover:bg-gray-600 rounded px-3 py-1 text-white text-xl font-bold mb-16">
          <span>TIKPID</span>
        </a>
      </Link>
      <nav>
        <ul>
          <li className="mb-4">
            <Link href="/home" legacyBehavior>
              <a className={pathname === '/home' ? "bg-blue-400 rounded px-3 py-1 text-white flex items-center space-x-1" : "hover:bg-gray-600 rounded px-3 py-1 text-white flex items-center space-x-1"}>
                <HomeIcon className="h-6 w-6" />
                <span>Home</span>
              </a>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/order" legacyBehavior>
              <a className={pathname === '/order' ? "bg-blue-400 rounded px-3 py-1 text-white flex items-center space-x-1" : "hover:bg-gray-600 rounded px-3 py-1 text-white flex items-center space-x-1"}>
                <ShoppingCartIcon className="h-6 w-6" />
                <span>Pembelian</span>
              </a>
            </Link>
          </li>
          <li className="mb-4">
            <Link href="/store" legacyBehavior>
              <a className={pathname === '/store' ? "bg-blue-400 rounded px-3 py-1 text-white flex items-center space-x-1" : "hover:bg-gray-600 rounded px-3 py-1 text-white flex items-center space-x-1"}>
                <OfficeBuildingIcon className="h-6 w-6" />
                <span>Toko Anda</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <Link href="/login" legacyBehavior>
          <a
            onClick={() => {
              localStorage.clear();
            }}
            className="hover:bg-gray-600 rounded px-3 py-1 text-white flex items-center space-x-1"
          >
            <LogoutIcon className="h-6 w-6" />
            <span>Logout</span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
