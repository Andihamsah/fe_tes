'use client'
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function Middleware() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            if (pathname === '/login' || pathname === '/register') {
                return;
            } else {
                router.push('/login');
            }
        } else if (pathname === '/login' || pathname === '/register') {
            router.push('/home');
        }
    }, [router, pathname]);
}
