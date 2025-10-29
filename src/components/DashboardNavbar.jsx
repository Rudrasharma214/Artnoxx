import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const DashboardNavbar = ({ onLogout }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path) => {
        return location.pathname.includes(path);
    };

    return (
        <nav className="bg-[#e8e0d5]/95 backdrop-blur-sm border-b border-[#d5cabe] shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <div className="flex items-center">
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight uppercase">
                            ArtNoxx
                        </h1>
                        <span className="ml-3 px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                            Admin
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            to="/dashboard/products"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive('products')
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Products
                        </Link>
                        <Link
                            to="/dashboard/messages"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                isActive('messages')
                                    ? 'bg-indigo-600 text-white shadow-sm'
                                    : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Messages
                        </Link>
                        <button
                            onClick={onLogout}
                            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-200 focus:outline-none"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-[#d5cabe]">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            to="/dashboard/products"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActive('products')
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Products
                        </Link>
                        <Link
                            to="/dashboard/messages"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActive('messages')
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Messages
                        </Link>
                        <button
                            onClick={() => {
                                setIsMobileMenuOpen(false);
                                onLogout();
                            }}
                            className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default DashboardNavbar;
