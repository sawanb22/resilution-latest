import React, { useState, useEffect } from 'react';

export const NewNavbar = () => {
    const navLinks = [
        { name: 'Home', desktopId: 'hero', mobileId: 'hero-mobile' },
        { name: 'How It Works', desktopId: 'how-it-works', mobileId: 'how-it-works-mobile' },
        { name: 'Solutions', desktopId: 'engine', mobileId: 'engine-mobile' },
        { name: 'Ecosystem', desktopId: 'ecosystem', mobileId: 'ecosystem-mobile' },
        { name: 'Community', desktopId: 'community', mobileId: 'community-mobile' },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.width = '100%';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (e, desktopId, mobileId) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);

        setTimeout(() => {
            const isMobile = window.innerWidth < 768;
            const targetId = isMobile ? mobileId : desktopId;

            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else {
                const fallbackElement = document.getElementById(isMobile ? desktopId : mobileId);
                if (fallbackElement) {
                    fallbackElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }, 50);
    };

    // Note: The navbar is already sticky due to "sticky top-0 z-50", 
    // we just need to make sure the heights are set properly for the mobile view
    return (
        <nav className="sticky top-0 z-50 bg-black border-b border-white/10 w-full" style={{ height: typeof window !== 'undefined' && window.innerWidth < 768 ? '54px' : '70px' }}>
            <div className="w-full mx-auto px-4 md:px-8 lg:px-16 flex items-center justify-between h-full">

                {/* Logo Section */}
                <div className="flex items-center">
                    <img
                        src="/homepage_assets/resilution heading.svg"
                        alt="RESILUTION"
                        className="h-6 md:h-8 object-contain cursor-pointer"
                        onClick={(e) => handleNavClick(e, 'hero', 'hero-mobile')}
                    />
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={`#${link.desktopId}`}
                            onClick={(e) => handleNavClick(e, link.desktopId, link.mobileId)}
                            className="text-white hover:text-[#C8FF80] transition-colors text-[13px] font-medium uppercase tracking-[0.05em]"
                            style={{ fontFamily: 'Arial, sans-serif' }}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Desktop Get Started Button */}
                <div className="hidden md:block">
                    <button
                        onClick={() => window.open('https://discord.com/invite/KG5WKCnkWW', '_blank')}
                        className="bg-[#C8FF80] text-black px-8 py-3 rounded-sm font-bold uppercase text-[13px] tracking-wider hover:bg-[#b0e660] transition-colors">
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
                <div className="md:hidden fixed inset-0 top-[54px] bg-black z-40 flex flex-col p-6 animate-in slide-in-from-right-10 duration-200 overflow-y-auto">
                    <div className="flex flex-col gap-6 mt-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.mobileId}`}
                                onClick={(e) => handleNavClick(e, link.desktopId, link.mobileId)}
                                className="text-white text-[16px] font-medium uppercase tracking-wide border-b border-white/10 pb-4"
                            >
                                {link.name}
                            </a>
                        ))}
                        <button
                            onClick={() => window.open('https://discord.com/invite/KG5WKCnkWW', '_blank')}
                            className="bg-[#C8FF80] text-black w-full py-4 mt-4 rounded-sm font-bold uppercase text-[13px] tracking-wider">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};
