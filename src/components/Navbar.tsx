'use client'
import Link from 'next/link';
import React from 'react';
import { ShoppingCartIcon, LogoutIcon, OfficeBuildingIcon } from '@heroicons/react/outline';
import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/home" legacyBehavior>
          <a className="hover:bg-gray-600 rounded px-3 py-1 text-white text-xl font-bold">
            <span>TIKPID</span>
          </a>
        </Link>
        <div className="flex space-x-4">
          <Link href="/order" legacyBehavior>
            <a className={pathname === '/order' ? "bg-blue-400 rounded px-3 py-1 text-white flex items-center space-x-1" : "hover:bg-gray-600 rounded px-3 py-1 text-white flex items-center space-x-1"}>
              <ShoppingCartIcon className="h-6 w-6" />
              <span>Pembelian</span>
            </a>
          </Link>
          <Link href="/store" legacyBehavior>
            <a className={pathname === '/store' ? "bg-blue-400 rounded px-3 py-1 text-white flex items-center space-x-1" : "hover:bg-gray-600 rounded px-3 py-1 text-white flex items-center space-x-1"}>
              <OfficeBuildingIcon className="h-6 w-6" />
              <span>Toko Anda</span>
            </a>
          </Link>
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
    </nav>
  );
};

export default Navbar;
