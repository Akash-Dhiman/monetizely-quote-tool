'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {

    const pathname = usePathname();

    const navItems = [
        {
            label: 'Dashboard',
            href: '/dashboard'
        },
        {
            label: 'Catalog',
            href: '/catalog'
        },
        {
            label: 'Quotes',
            href: '/quotes'
        },
        {
            label: 'Create Quote',
            href: '/quotes/new'
        }
    ];

    return (

        <aside className="w-72 bg-slate-950 text-white min-h-screen p-6 flex flex-col border-r border-slate-800">

            <div>

                <h1 className="text-3xl font-bold">
                    Monetizely
                </h1>

                <p className="text-slate-400 mt-1">
                    Quote Builder
                </p>

            </div>

            <nav className="mt-10 space-y-2">

                {navItems.map((item) => {

                    const isActive =
                        pathname === item.href;

                    return (

                        <Link
                            key={item.href}
                            href={item.href}
                            className={`
                                flex items-center px-4 py-3 rounded-xl transition-all duration-200
                                ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }
                            `}
                        >
                            {item.label}
                        </Link>

                    );

                })}

            </nav>

            <div className="mt-auto pt-6 border-t border-slate-800">

                <div className="text-xs text-slate-500">
                    Monetizely Quote Tool
                </div>

                <div className="text-xs text-slate-600 mt-1">
                    Version 1.0
                </div>

            </div>

        </aside>
    );
}