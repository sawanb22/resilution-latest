import React from 'react';

export const NewNavbar = () => {
    const navLinks = [
        { name: 'Home', href: '#hero' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Solutions', href: '#engine' }, // Mapping to Engine for now
        { name: 'Ecosystem', href: '#ecosystem' },
        { name: 'Community', href: '#' },
        { name: 'Resources', href: '#' },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-black py-5 border-b border-white/10">
            <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center">
                    <img
                        src="/homepage_assets/resilution heading.svg"
                        alt="RESILUTION"
                        className="h-6 md:h-8 object-contain"
                    />
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-white hover:text-[#C8FF80] transition-colors text-[13px] font-medium uppercase tracking-[0.05em]"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Desktop Get Started Button */}
                <div className="hidden md:block">
                    <button className="bg-[#C8FF80] text-black px-8 py-3 rounded-sm font-bold uppercase text-[13px] tracking-wider hover:bg-[#b0e660] transition-colors">
                        Get Started
                    </button>
                </div>

                {/* Mobile Menu Button (Hamburger) */}
                <div className="md:hidden">
                    <button
                        className="text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-[73px] bg-black z-40 flex flex-col p-6 animate-in slide-in-from-right-10 duration-200">
                    <div className="flex flex-col gap-6 mt-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-white text-[16px] font-medium uppercase tracking-wide border-b border-white/10 pb-4"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="bg-[#C8FF80] text-black w-full py-4 mt-4 rounded-sm font-bold uppercase text-[13px] tracking-wider">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};
