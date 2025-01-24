// components/accountuser/layout.tsx

import React, { useState } from 'react';
import { SfIconMenu } from '@storefront-ui/react';
import Sidebar from "@/components/accountuser/userSidebar/sidebarUser"; // Import your desired menu icon

export default function Layout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex pt-20">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Optional Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    className="absolute inset-0 bg-black opacity-50 z-40 md:hidden"
                    onClick={closeSidebar}
                    aria-hidden="true"
                ></div>
            )}

            {/* Main Content Area */}
            <div className="flex-1">
                {/* Header with Menu Button */}
                <header className="flex items-center justify-between p-4 bg-gray-100 shadow-md">
                    <h1 className="text-xl font-bold">My Application</h1>
                    {/* Menu Button visible on mobile, if sidebar is closed */}
                    {!isSidebarOpen && (
                        <button
                            type="button"
                            className="md:hidden text-neutral-500 focus:outline-none"
                            aria-label="Open sidebar"
                            onClick={openSidebar}
                        >
                            <SfIconMenu />
                        </button>
                    )}
                </header>

                {/* Page Content */}
                <main className="pt-30">{children}</main>

                {/* Floating Open Sidebar Button (visible when sidebar is closed) */}
                {!isSidebarOpen && (
                    <button
                        type="button"
                        className="fixed top-1/2 left-0 p-2 bg-white shadow-md md:hidden z-50 transform -translate-y-1/2 focus:outline-none"
                        aria-label="Open sidebar"
                        onClick={openSidebar}
                    >
                        <SfIconMenu />
                    </button>
                )}
            </div>
        </div>
    );
}
