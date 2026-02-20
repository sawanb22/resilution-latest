import { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { NewNavbar } from './NewNavbar';
import { Footer } from '../../Component/Common/Footer';
import style from "./home.module.css";

/* ═══════════════════════════════════════════════════════════════
   NewHome – Single-page layout with ALL sections inlined
   ═══════════════════════════════════════════════════════════════ */

const NewHome = () => {
    // Inline styles for the hero button hover effect
    const hoverStyles = `
        .hero-get-started {
            background: rgba(255, 255, 255, 0.03) !important;
            color: #ffffff !important;
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            transition: all 0.3s ease-in-out !important;
            cursor: pointer !important;
            border-radius: 18px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
        }
        .hero-get-started:hover {
            background: rgba(255, 255, 255, 0.08) !important;
            color: #ffffff !important;
            border: 1px solid rgba(255, 255, 255, 0.6) !important;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37) !important;
            transform: translateY(-2px) !important;
        }
        .hero-get-started:hover svg {
            transform: translate(2px, -2px) !important;
        }


        /* ── Global button hover for all buttons on new-home page ── */
        /* Light buttons (lime green background) */
        .new-home-page button:not(.no-hover) {
            transition: all 0.3s ease-out !important;
        }
        .new-home-page button.btn-light:hover,
        .new-home-page button.bg-\\[\\#C8FF80\\]:hover,
        .new-home-page button[class*="bg-[#C8FF80]"]:hover {
            background: #ffffff !important;
            color: #000 !important;
            border: 1px solid #000 !important;
            box-shadow: 6px 6px 0px 0px #C8FF80 !important;
            transform: translate(-3px, -3px) !important;
        }
        /* Dark buttons (black background) */
        .new-home-page button.btn-dark:hover,
        .new-home-page button.bg-black:hover,
        .new-home-page button[class*="bg-black"]:hover {
            background: #C8FF80 !important;
            color: #000 !important;
            border: 1px solid #C8FF80 !important;
            box-shadow: 6px 6px 0px 0px #000 !important;
            transform: translate(-3px, -3px) !important;
        }

        /* Universal fallback hover for any button not already handled */
        .new-home-page button:not(.no-hover):not(.hero-get-started):hover {
            box-shadow: 6px 6px 0px 0px #C8FF80 !important;
            transform: translate(-3px, -3px) !important;
            transition: all 0.3s ease-out !important;
        }
    `;

    // FAQ state
    const [openIndex, setOpenIndex] = useState(0);
    const toggleFaq = (index) => setOpenIndex(openIndex === index ? null : index);
    const [hoveredSlice, setHoveredSlice] = useState(null);
    const splineDesktopRef = useRef(null);
    const splineMobileRef = useRef(null);

    // Carousel state for mobile tokenomics
    const [currentTokenCard, setCurrentTokenCard] = useState(0);
    const tokenomicsScrollRef = useRef(null);

    // Carousel state for mobile how it works
    const [currentHowStep, setCurrentHowStep] = useState(0);
    const howWorksScrollRef = useRef(null);

    const handleTokenScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.offsetWidth;
        const newIndex = Math.round(scrollLeft / width);
        if (newIndex !== currentTokenCard) setCurrentTokenCard(newIndex);
    };

    const scrollTokenCard = (direction) => {
        if (!tokenomicsScrollRef.current) return;
        const width = tokenomicsScrollRef.current.offsetWidth;
        const targetScroll = direction === 'left'
            ? tokenomicsScrollRef.current.scrollLeft - width
            : tokenomicsScrollRef.current.scrollLeft + width;
        tokenomicsScrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };

    const handleHowScroll = (e) => {
        const scrollLeft = e.target.scrollLeft;
        const width = e.target.offsetWidth;
        const newIndex = Math.round(scrollLeft / width);
        if (newIndex !== currentHowStep) setCurrentHowStep(newIndex);
    };

    const scrollHowWorks = (direction) => {
        if (!howWorksScrollRef.current) return;
        const width = howWorksScrollRef.current.offsetWidth;
        const targetScroll = direction === 'left'
            ? howWorksScrollRef.current.scrollLeft - width
            : howWorksScrollRef.current.scrollLeft + width;
        howWorksScrollRef.current.scrollTo({ left: targetScroll, behavior: 'smooth' });
    };



    // ── Data ──────────────────────────────────────────────────
    const shortfalls = [
        { title: "LIMITED ACCESS TO CAPITAL", description: "Small and growing businesses struggle to raise funds through banks and traditional institutions.", icon: "/homepage_assets/icon_building.svg", iconClass: "contrast-200" },
        { title: "LACK OF TRANSPARENCY", description: "Investors receive unclear and delayed updates, making it hard to track real performance.", icon: "/homepage_assets/icon_user.svg", iconClass: "contrast-200" },
        { title: "HIGH INTERMEDIARY COSTS", description: "Middlemen increase fees and reduce returns for both businesses and investors.", icon: "/homepage_assets/icon_pay.svg", iconClass: "" },
    ];

    const engineFeatures = [
        { title: "Verified Proposals", description: "Businesses raise funding through clear and transparent investment proposals." },
        { title: "Automated Revenue Sharing", description: "Smart contracts distribute profits automatically based on agreed terms." },
        { title: "Real-Time Performance Data", description: "Product Data Chains record live business and product performance on-chain." },
    ];

    const howItWorksSteps = [
        { step: "Step 1", title: "ONBOARD & VERIFY", description: "Users complete secure identity verification to ensure platform trust and compliance.", icon: "/homepage_assets/icon_step_1.svg" },
        { step: "Step 2", title: "SUBMIT OR DISCOVER", description: "Businesses publish funding proposals while investors explore opportunities.", icon: "/homepage_assets/icon_step_2.svg" },
        { step: "Step 3", title: "FUND & TRACK", description: "Investments are securely handled and performance is tracked in real time.", icon: "/homepage_assets/icon_step_3.svg" },
        { step: "Step 4", title: "EARN AUTOMATICALLY", description: "Smart contracts distribute profits automatically based on results.", icon: "/homepage_assets/icon_step_4.svg" },
    ];

    const roadmapPhases = [
        { phase: 'Phase 1', title: 'FOUNDATION', items: ['Core investment platform launch', 'Business onboarding & verification', 'Eden AI assistant live', 'Credits & token system setup'] },
        { phase: 'Phase 2', title: 'ECOSYSTEM EXPANSION', items: ['ResilPay payment system', 'ResilMall marketplace', 'Enhanced transparency tools', 'Community growth programs'] },
        { phase: 'Phase 3', title: 'ADVANCED FEATURES', items: ['Staking and rewards system', 'Token governance launch', 'Advanced analytics dashboard', 'Insurance modules'] },
        { phase: 'Phase 4', title: 'GLOBAL SCALE', items: ['International expansion', 'Enterprise partnerships', 'Regulatory optimization', 'Large-scale ecosystem adoption'] },
    ];

    const faqs = [
        { question: 'How is Resilution different from traditional investment platforms?', answer: 'Resilution uses blockchain technology to provide real-time transparency, automated revenue sharing, and direct engagement between businesses and investors without intermediaries.' },
        { question: 'What are Credits and how do they work?', answer: 'Credits are USD-pegged units used on the platform to make investing simple and stable while avoiding crypto volatility.' },
        { question: 'How are profits distributed to investors?', answer: 'Smart contracts automatically distribute profits based on agreed investment terms and real-time performance data.' },
    ];

    return (
        <div className="new-home-page bg-black min-h-screen text-white font-['arial'] break-words overflow-x-hidden">
            <style>{hoverStyles}</style>

            {/* ═══════════════════ HEADER / NAVBAR ═══════════════════ */}
            <NewNavbar />

            {/* ═══════════════════ HERO SECTION (DESKTOP) ═══════════════════ */}
            <section id="hero" className="hidden md:flex relative w-full bg-black text-white overflow-hidden justify-center" style={{ height: '700px' }}>

                {/* Background Waves (Absolute - Full screen width) */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <img
                        src="/homepage_assets/hero_bg_waves.svg"
                        alt="Background Waves"
                        className="w-full h-full object-cover"
                        style={{
                            position: 'absolute',
                            minWidth: '100%',
                            minHeight: '100%',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            opacity: 1,
                            mixBlendMode: 'overlay'
                        }}
                    />
                    {/* === Overlay layers matching design === */}

                    {/* Green tint glow at top-center */}
                    <div className="absolute z-10" style={{
                        top: '-50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '700px',
                        height: '350px',
                        background: 'radial-gradient(ellipse at 50% 30%, rgba(200,255,128,0.12) 0%, rgba(200,255,128,0.06) 40%, transparent 70%)',
                        pointerEvents: 'none'
                    }}></div>

                    {/* Left black fade - extends into mid */}
                    <div className="absolute top-0 bottom-0 left-0 z-10" style={{
                        width: '45%',
                        background: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.4) 65%, transparent 100%)'
                    }}></div>

                    {/* Right black fade - extends into mid */}
                    <div className="absolute top-0 bottom-0 right-0 z-10" style={{
                        width: '45%',
                        background: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.4) 65%, transparent 100%)'
                    }}></div>

                    {/* Bottom black fade - strong, extends up into mid */}
                    <div className="absolute bottom-0 left-0 right-0 z-10" style={{
                        height: '350px',
                        background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.3) 70%, transparent 100%)'
                    }}></div>

                    {/* Radial vignette - dark edges, open at top-center for green glow */}
                    <div className="absolute inset-0 z-10" style={{
                        background: 'radial-gradient(ellipse 55% 50% at 50% 25%, transparent 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)'
                    }}></div>
                </div>

                <div className="relative w-full h-full">

                    {/* Content Container */}
                    <div className="relative z-10 w-full h-full flex flex-col items-center pt-10">

                        {/* HEADLINE */}
                        <div className="text-center mb-6 z-20 flex flex-col items-center w-full px-4">
                            <h1 className="font-['GACCO'] font-hairline uppercase tracking-widest leading-none mb-3 text-[#C8FF80] w-full max-w-none md:max-w-[1000px] whitespace-nowrap" style={{ fontSize: '48px', letterSpacing: '0.1em' }}>
                                FINANCIAL <span>FREEDOM</span>
                            </h1>
                            <h2 className="font-['GACCO'] font-hairline uppercase tracking-[0.15em] text-white flex items-center justify-center whitespace-normal md:whitespace-nowrap w-full max-w-[1141px]" style={{ fontSize: '32px' }}>
                                THROUGH TRANSPARENT BLOCKCHAIN INVESTMENT
                            </h2>
                        </div>

                        {/* GET STARTED BUTTON */}
                        <div className="mb-4 z-20">
                            <button
                                className="hero-get-started group flex items-center justify-center shadow-2xl"
                                style={{
                                    width: '341px',
                                    height: '68px',
                                }}
                            >
                                <div className="flex items-center justify-center gap-4" style={{ width: '182px', height: '49px' }}>
                                    <span className="font-['arial'] text-[24px] font-normal tracking-wide">Get Started</span>
                                    <svg className="w-8 h-8 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </div>
                            </button>
                        </div>


                        {/* MAIN LAYOUT: Left Info | Center R | Right Card */}
                        <div className="relative w-full h-full flex justify-between items-end pb-12 px-16">


                            {/* LEFT: Intro Text & Button */}
                            <div className="w-full max-w-[350px] mb-12 z-20 relative">
                                <div className="flex gap-2 mb-6">
                                    <div className="w-16 h-1.5 bg-[#C8FF80] rounded-full"></div>
                                    <div className="w-4 h-1.5 bg-[#C8FF80] rounded-full"></div>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-8 font-light text-left">
                                    Resilution is a blockchain-powered investment platform that connects businesses and investors through real-time transparency, verified funding proposals, and automated revenue sharing.
                                </p>
                                <button className="bg-[#C8FF80] text-black font-medium text-base px-8 py-3 rounded-sm hover:bg-[#b5e660] transition-colors shadow-[0_0_15px_rgba(200,255,128,0.3)]">
                                    Learn More
                                </button>
                            </div>

                            {/* CENTER: Giant R Logo (Absolute Center Bottom) */}
                            <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center overflow-hidden pointer-events-none" style={{ width: '800px', height: '800px', bottom: '-180px' }}>
                                <Spline scene='https://prod.spline.design/KCsPFYpldBZIJ4sy/scene.splinecode' style={{ width: '100%', height: '100%' }} />
                            </div>

                            {/* RIGHT: Transparency Card */}
                            <div className="w-full max-w-[300px] mb-10 z-20 relative">
                                <div className="border border-[#C8FF80]/50 bg-black/80 backdrop-blur-md p-6 rounded-[24px] relative">
                                    {/* Floating Crystal Cube */}
                                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-40 h-40">
                                        <img src="/homepage_assets/hero_cube_3d.svg" alt="Crystal Cube" className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(200,255,128,0.2)]" />
                                    </div>
                                    <div className="mt-12 text-center">
                                        <h3 className="text-white font-bold text-lg mb-2">Blockchain Transparency</h3>
                                        <div className="w-10 h-1 bg-[#C8FF80] mx-auto mb-4 rounded-full"></div>
                                        <p className="text-gray-400 text-xs leading-relaxed font-light">
                                            All transactions and performance data are recorded in real time on the blockchain for complete trust.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ HERO SECTION (MOBILE) ═══════════════════ */}
            <section id="hero-mobile" className="block md:hidden relative w-full bg-black text-center pt-16 pb-8 px-4 overflow-hidden">
                {/* Background Waves (Scaled for Mobile) */}
                <div className="absolute inset-x-0 top-0 h-[500px] pointer-events-none">
                    <img
                        src="/homepage_assets/hero_bg_waves.svg"
                        alt="Background Waves"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black"></div>

                    {/* Top Green Glow (Half Circle) */}
                    <div className="absolute left-1/2 -translate-x-1/2" style={{
                        top: '-300px',
                        width: '150%',
                        height: '850px',
                        background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(200, 255, 128, 0.18) 0%, rgba(200, 255, 128, 0.08) 40%, transparent 75%)',
                        filter: 'blur(60px)',
                    }}></div>
                </div>

                <div className="relative z-10 flex flex-col items-center px-2">
                    {/* Top Headline */}
                    <div className="w-full flex flex-col items-center">
                        <h1 className="font-['GACCO'] font-medium uppercase tracking-widest leading-tight text-[#C8FF80] text-[20px] mb-2 text-center whitespace-nowrap">
                            FINANCIAL FREEDOM
                        </h1>
                        <p className="font-['arial'] text-white text-[13px] font-light mb-8 text-center uppercase tracking-wider whitespace-nowrap">
                            THROUGH TRANSPARENT BLOCKCHAIN INVESTMENT
                        </p>
                    </div>

                    {/* Get Started Button */}
                    <button className="hero-get-started group flex items-center justify-center gap-3 px-8 py-3 mb-4 mx-auto" style={{ borderRadius: '18px' }}>
                        <span className="font-['arial'] text-[18px] font-normal tracking-wide">Get Started</span>
                        <svg className="w-5 h-5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </button>


                    {/* Giant R Logo */}
                    <div className="w-[450px] h-[450px] mb-0 relative overflow-hidden flex justify-center -mt-16 scale-110 pointer-events-none -translate-x-4">
                        <Spline scene='https://prod.spline.design/KCsPFYpldBZIJ4sy/scene.splinecode' style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>

                <div className="relative z-10 flex flex-col items-start px-4">
                    {/* Progress Dots */}
                    <div className="flex gap-2 mb-6 justify-start">
                        <div className="w-12 h-1.5 bg-[#C8FF80] rounded-full"></div>
                        <div className="w-3 h-1.5 bg-[#C8FF80] rounded-full"></div>
                    </div>

                    {/* Intro Text */}
                    <p className="text-gray-300 text-[15px] leading-relaxed mb-6 font-light max-w-xs text-left">
                        Resilution is a blockchain-powered investment platform that connects businesses and investors through real-time transparency, verified funding proposals, and automated revenue sharing.
                    </p>

                    {/* Learn More Button */}
                    <button className="bg-[#C8FF80] text-black font-medium text-sm px-8 py-3 rounded-sm hover:bg-[#b5e660] transition-colors shadow-[0_0_15px_rgba(200,255,128,0.3)] mb-16">
                        Learn More
                    </button>

                    {/* Transparency Card / Cube */}
                    <div className="relative w-full max-w-xs mx-auto border border-[#C8FF80]/30 bg-black/60 backdrop-blur-md p-6 rounded-2xl pt-16">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32">
                            <img src="/homepage_assets/hero_cube_3d.svg" alt="Crystal Cube" className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(200,255,128,0.3)]" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Blockchain Transparency</h3>
                        <div className="w-8 h-1 bg-[#C8FF80] mx-auto mb-4 rounded-full"></div>
                        <p className="text-gray-400 text-xs leading-relaxed font-light">
                            All transactions and performance data are recorded in real time on the blockchain for complete trust.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ TRADITIONAL SHORTFALLS (DESKTOP) ═══════════════════ */}
            <section id="why" className="hidden md:block relative w-full py-20 md:py-32 overflow-hidden bg-black text-white text-left">
                <div className="w-full flex flex-col items-start px-8 md:px-20">
                    <h2 data-aos="fade-up" className="font-['GACCO'] font-normal uppercase text-[#C8FF80] mb-8 tracking-wide drop-shadow-[0_0_5px_rgba(200,255,128,0.5)] flex items-center justify-start text-left whitespace-normal w-full max-w-[1023px] text-[36px]">
                        Why Traditional Investment Systems Fail
                    </h2>
                    <p className="text-white mb-20 font-light tracking-wide text-left flex items-center justify-start whitespace-normal w-full max-w-[960px]" style={{ fontSize: '18px', minHeight: '18px' }}>
                        Traditional financial markets rely on intermediaries and delayed reporting, making funding difficult for businesses and risky for investors.
                    </p>
                    <div className="flex flex-row flex-nowrap gap-4 lg:gap-8 mb-20 justify-between w-full">
                        {shortfalls.map((item, index) => (
                            <div key={index} data-aos={index === 0 ? 'fade-right' : index === 1 ? 'fade-up' : 'fade-left'} data-aos-delay={index * 100}
                                className={`bg-[#EAEAEA] border border-transparent flex flex-col items-start text-left shadow-lg group p-8 lg:p-10 rounded-sm relative overflow-hidden flex-1 ${style['card-dark-hover']}`}
                                style={{ minWidth: '300px', height: '230px' }}
                            >
                                <div className="absolute top-0 left-0 w-1 h-0 bg-[#C8FF80] transition-all duration-300 group-hover:h-full"></div>
                                <div className="flex items-center gap-5 mb-6">
                                    <div className="w-10 h-10 flex items-center justify-center bg-[#C4A4A4]/40 rounded-sm transition-all duration-500 group-hover:bg-[#C4A4A4]/60">
                                        <img src="/homepage_assets/icon_cross.svg" alt="Error" className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-all duration-500" />
                                    </div>
                                    <h3 className="font-['GACCO'] text-[18px] font-bold uppercase tracking-wide leading-tight text-black transition-colors duration-500">
                                        {item.title}
                                    </h3>
                                </div>
                                <p className="text-gray-600 text-[14px] leading-relaxed font-light transition-colors duration-500 pr-4">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className="w-full flex justify-center">
                        <button className="font-['GACCO'] inline-flex items-center justify-center font-normal transition-all duration-300 transform active:scale-95 bg-[#C8FF80] text-black hover:bg-black hover:text-[#C8FF80] hover:border-[#C8FF80] border border-[#C8FF80] rounded-sm whitespace-nowrap" style={{ minWidth: '260px', height: '54px', fontSize: '16px' }}>
                            View the Solution
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ TRADITIONAL SHORTFALLS (MOBILE) ═══════════════════ */}
            <section id="why-mobile" className="block md:hidden relative w-full py-20 px-6 bg-black text-center">
                <h2 className="font-['GACCO'] text-[15px] font-medium uppercase text-[#C8FF80] mb-6 tracking-wide text-center leading-[1.2]">
                    WHY TRADITIONAL <br /> INVESTMENT SYSTEMS FAIL
                </h2>
                <div className="w-16 h-1 bg-[#C8FF80] mb-12 rounded-full mx-auto"></div>

                <div className="flex flex-col gap-4 mb-12">
                    {shortfalls.map((item, index) => (
                        <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="bg-[#EAEAEA] shadow-lg px-5 py-8 rounded-sm text-left flex gap-4 items-start">
                            <div className="w-6 h-6 flex items-center justify-center bg-[#C4A4A4] rounded-sm shrink-0 mt-0.5">
                                <img src="/homepage_assets/icon_cross.svg" alt="Cross Icon" className="w-3 h-3 opacity-80" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="font-['GACCO'] text-[10px] font-bold uppercase text-black tracking-wide leading-tight">
                                    {item.title}
                                </h3>
                                <p className="font-['arial'] text-black text-[14px] leading-snug font-normal pr-2">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button className="font-['GACCO'] bg-[#C8FF80] text-black font-medium text-[12px] px-8 py-2.5 rounded-sm hover:bg-[#b5e660] transition-colors whitespace-nowrap uppercase tracking-wider">
                        View The Solution
                    </button>
                </div>
            </section>

            {/* ═══════════════════ RESILUTION ENGINE ═══════════════════ */}
            {/* ═══════════════════ RESILUTION ENGINE ═══════════════════ */}
            {/* ═══════════════════ RESILUTION ENGINE (DESKTOP) ═══════════════════ */}
            <section id="engine" className="hidden md:block bg-black pt-20 pb-0 px-8 md:px-16 text-white relative overflow-hidden w-full">
                <div className="max-w-[1300px] mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-10">
                        <h2 className="font-['GACCO'] text-[36px] font-medium uppercase tracking-wide leading-relaxed">
                            THE <span className="bg-[#C8FF80] text-black px-3 py-1 font-medium inline-block">RESILUTION</span><br />ENGINE
                        </h2>
                        <p className="text-gray-300 max-w-lg text-lg font-light text-left md:text-right">
                            Resilution replaces traditional investment barriers with blockchain-powered transparency, automation, and trust.
                        </p>
                    </div>
                    <div className="relative w-full rounded-[40px] overflow-hidden min-h-[850px]">
                        <img src="/homepage_assets/engine_bg.jpg" alt="engine_bg.jpg" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

                        {/* Glass Morphism Part (Main Card) */}
                        <div className="absolute z-10 bg-white/5 border border-white/10 flex flex-col lg:flex-row gap-10 lg:gap-14 items-center p-10 md:p-12 lg:p-14"
                            style={{
                                width: '989px',
                                height: '540px',
                                bottom: '0',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                borderRadius: '9px 9px 0 0',
                                borderWidth: '1px',
                                opacity: 1,
                                backdropFilter: 'blur(15px)'
                            }}>

                            <div className="flex-1 flex flex-col justify-center items-start text-left">
                                <h3 className="font-['GACCO'] font-medium uppercase mb-7 text-white"
                                    style={{ fontSize: '24px', lineHeight: '30px', fontWeight: 500 }}>
                                    A SMARTER WAY TO <br /> INVEST AND GROW
                                </h3>
                                <p className="text-gray-200 mb-10 max-w-lg"
                                    style={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: 400, lineHeight: '150%' }}>
                                    Resilution connects businesses and investors through verified proposals, real-time performance tracking, and automated revenue sharing - all powered by blockchain technology.
                                </p>
                                <button className="font-['GACCO'] bg-[#C8FF80] text-black px-8 py-3.5 font-bold rounded-sm hover:bg-[#b0e660] transition-colors uppercase tracking-wide text-sm">Explore the Platform</button>
                            </div>

                            <div className="flex-1 flex flex-col gap-5 w-full justify-center">
                                {engineFeatures.map((feature, index) => (
                                    <div key={index} data-aos="fade-up" data-aos-delay={index * 150}
                                        className="group bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-xl flex items-start gap-4 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                                        <div className="bg-[#C8FF80] rounded-sm w-6 h-6 flex-shrink-0 flex justify-center items-center mt-0.5 transition-colors">
                                            <svg className="w-3.5 h-3.5 text-white group-hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-white group-hover:text-[#C8FF80] uppercase tracking-wide transition-colors"
                                                style={{ fontFamily: 'Arial', fontSize: '15px', fontWeight: 400, lineHeight: '100%' }}>
                                                {feature.title}
                                            </h4>
                                            <p className="text-gray-300"
                                                style={{ fontFamily: 'Arial', fontSize: '11px', fontWeight: 400, lineHeight: '150%' }}>
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ RESILUTION ENGINE (MOBILE) ═══════════════════ */}
            <section id="engine-mobile" className="block md:hidden bg-black py-16 px-6 text-white w-full">
                <h2 className="font-['GACCO'] text-[15px] font-medium uppercase tracking-wide leading-relaxed mb-6">
                    THE <span className="bg-[#C8FF80] text-black px-2 py-0.5 font-medium inline-block">RESILUTION</span> ENGINE
                </h2>
                <p className="text-gray-300 text-[15px] font-light text-left mb-12 leading-relaxed">
                    Resilution replaces traditional investment barriers with blockchain-powered transparency, automation, and trust.
                </p>

                {/* Golden City Background Layer */}
                <div className="relative w-full rounded-[8px] overflow-hidden min-h-[600px] flex flex-col p-4 shadow-2xl justify-center items-center">
                    <img src="/homepage_assets/engine_bg.jpg" alt="Engine Background" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    {/* Main Glass Content Card */}
                    <div className="relative z-10 w-full bg-white/5 backdrop-blur-xl border border-white/20 rounded-[9px] p-6 lg:p-10 flex flex-col items-center text-center shadow-2xl">
                        <h3 className="font-['GACCO'] text-[15px] font-bold uppercase mb-4 leading-tight tracking-wide text-white">A SMARTER WAY TO INVEST AND GROW</h3>
                        <p className="text-gray-200 text-[13px] mb-8 font-light leading-relaxed max-w-[280px]">Resilution connects businesses and investors through verified proposals, real-time performance tracking, and automated revenue sharing.</p>

                        <button className="font-['GACCO'] bg-[#C8FF80] text-black w-full max-w-[240px] py-3.5 font-bold rounded-sm uppercase tracking-wide text-[13px] mb-10 shadow-lg">
                            Explore the Platform
                        </button>

                        <div className="flex flex-col gap-4 w-full">
                            {engineFeatures.map((feature, index) => (
                                <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-start gap-4 card-hover-dark text-left">
                                    <div className="bg-[#C8FF80] rounded-sm w-7 h-7 flex-shrink-0 flex justify-center items-center mt-0.5">
                                        <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div className="flex flex-col items-start">
                                        <h4 className="font-['GACCO'] text-white text-[11px] font-bold mb-1 tracking-wide">{feature.title}</h4>
                                        <p className="text-gray-300 text-[10px] font-light leading-relaxed">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ BENEFITS ═══════════════════ */}
            {/* ═══════════════════ BENEFITS ═══════════════════ */}
            {/* ═══════════════════ BENEFITS (DESKTOP) ═══════════════════ */}
            <section id="benefits" className="hidden md:flex bg-white py-24 px-8 md:px-16 text-black justify-center -mt-20 relative z-10 w-full">
                <div className="w-full max-w-[1440px] flex flex-col items-start px-12 lg:px-20">
                    <h2 data-aos="fade-up" className="font-['GACCO'] font-light uppercase tracking-wide mb-6 text-left flex items-center justify-start whitespace-normal md:whitespace-nowrap w-full max-w-[1033px] text-[36px]">
                        BENEFITS FOR <span className="bg-[#C8FF80] px-3 py-1 font-medium">BUSINESSES & INVESTORS</span>
                    </h2>
                    <p className="text-gray-600 text-left mb-20 font-light flex items-center justify-start whitespace-normal md:whitespace-nowrap w-full max-w-[795px]" style={{ fontSize: '18px', minHeight: '18px' }}>
                        Resilution creates value for both businesses seeking funding and investors looking for transparent opportunities.
                    </p>
                    <div className="flex flex-col lg:flex-row gap-10 justify-center w-full items-center lg:items-stretch">
                        <div data-aos="fade-right" className="bg-[#EDE2E2] card-hover-light flex flex-col items-center text-center rounded-sm relative w-full max-w-[522px]" style={{ height: '650px', padding: '64px' }}>
                            <div className="mb-8 w-16 h-16"><img src="/homepage_assets/icon_user.svg" alt="icon_user.svg" className="w-full h-full object-contain" /></div>
                            <h3 className="font-['GACCO'] text-3xl font-normal uppercase mb-8 tracking-widest">FOR INVESTORS</h3>
                            <ul className="text-left text-gray-800 space-y-2 mb-12 flex-grow font-light text-base leading-relaxed list-disc pl-5">
                                <li>Invest in verified businesses with full transparency.</li>
                                <li>Track real-time performance and product data on-chain.</li>
                                <li>Reduce risk through immutable records and smart contracts.</li>
                                <li>Receive automated profit distributions.</li>
                            </ul>
                            <button className="font-['GACCO'] bg-black text-white px-10 py-4 text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-black border border-transparent hover:border-black transition-all duration-300 rounded-sm absolute bottom-16">Start Investing</button>
                        </div>
                        <div data-aos="fade-left" className="bg-[#EDE2E2] card-hover-light flex flex-col items-center text-center rounded-sm relative w-full max-w-[522px]" style={{ height: '650px', padding: '64px' }}>
                            <div className="mb-8 w-16 h-16"><img src="/homepage_assets/icon_building.svg" alt="icon_building.svg" className="w-full h-full object-contain" /></div>
                            <h3 className="font-['GACCO'] text-3xl font-normal uppercase mb-8 tracking-widest">FOR BUSINESSES</h3>
                            <ul className="text-left text-gray-800 space-y-2 mb-12 flex-grow font-light text-base leading-relaxed list-disc pl-5">
                                <li>Raise capital directly from a global investor community without banks or intermediaries.</li>
                                <li>Gain trust through transparent performance data recorded on blockchain.</li>
                                <li>Automate revenue sharing and funding distribution with smart contracts.</li>
                                <li>Scale faster with community-backed investment.</li>
                            </ul>
                            <button className="font-['GACCO'] bg-black text-white px-10 py-4 text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-black border border-transparent hover:border-black transition-all duration-300 rounded-sm absolute bottom-16">Join As A Business</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ BENEFITS (MOBILE) ═══════════════════ */}
            <section id="benefits-mobile" className="block md:hidden bg-white py-16 px-6 text-black relative z-10 w-full text-left">
                <h2 className="font-['GACCO'] text-[15px] font-light uppercase tracking-wide mb-6 text-left">
                    BENEFITS FOR <span className="bg-[#C8FF80] px-2 py-0.5 font-medium inline-block">BUSINESSES & INVESTORS</span>
                </h2>
                <p className="text-gray-600 text-left mb-12 text-[15px] font-light leading-relaxed">
                    Resilution creates value for both businesses seeking funding and investors looking for transparent opportunities.
                </p>
                <div className="flex flex-col gap-6">
                    <div data-aos="fade-up" className="bg-[#EDE2E2] p-8 rounded-sm text-left card-hover-light">
                        <div className="mb-6 w-12 h-12 ml-0"><img src="/homepage_assets/icon_user.svg" alt="icon_user.svg" className="w-full h-full object-contain" /></div>
                        <h3 className="font-['GACCO'] text-[15px] font-normal uppercase mb-6 tracking-widest text-left">FOR INVESTORS</h3>
                        <ul className="text-left text-gray-800 space-y-4 mb-8 font-light text-[15px] leading-relaxed list-disc pl-6">
                            <li>Invest in verified businesses with full transparency.</li>
                            <li>Track real-time performance and product data on-chain.</li>
                            <li>Reduce risk through immutable records and smart contracts.</li>
                            <li>Receive automated profit distributions.</li>
                        </ul>
                        <button className="font-['GACCO'] bg-black text-white w-full py-4 text-[13px] font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black border border-transparent hover:border-black transition-all duration-300">Start Investing</button>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="100" className="bg-[#EDE2E2] p-8 rounded-sm text-left card-hover-light">
                        <div className="mb-6 w-12 h-12 ml-0"><img src="/homepage_assets/icon_building.svg" alt="icon_building.svg" className="w-full h-full object-contain" /></div>
                        <h3 className="font-['GACCO'] text-[15px] font-normal uppercase mb-6 tracking-widest text-left">FOR BUSINESSES</h3>
                        <ul className="text-left text-gray-800 space-y-4 mb-8 font-light text-[15px] leading-relaxed list-disc pl-6">
                            <li>Raise capital directly from a global investor community.</li>
                            <li>Gain trust through transparent performance data.</li>
                            <li>Automate revenue sharing with smart contracts.</li>
                            <li>Scale faster with community-backed investment.</li>
                        </ul>
                        <button className="font-['GACCO'] bg-black text-white w-full py-4 text-[13px] font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black border border-transparent hover:border-black transition-all duration-300">Join As A Business</button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
            {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
            {/* ═══════════════════ HOW IT WORKS (DESKTOP) ═══════════════════ */}
            <section id="how-it-works" className="hidden md:block bg-white py-24 px-8 md:px-20 text-black w-full">
                <div className="max-w-[1440px] mx-auto flex flex-col items-start">
                    <h2 data-aos="fade-up" className="font-['GACCO'] text-[36px] font-light uppercase tracking-wide mb-6 text-left">
                        HOW <span className="bg-[#C8FF80] px-3 py-1 font-medium">RESILUTION WORKS</span>
                    </h2>
                    <p className="text-gray-600 text-left max-w-3xl mb-24 text-sm md:text-base font-light">A simple and transparent process that connects businesses and investors through blockchain technology.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {howItWorksSteps.map((item, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className={`bg-[#F8F5F5] p-8 rounded-sm h-full flex flex-col items-center text-center relative card-hover-gradient group ${style['animate-shake-hover']}`}>
                                <span className="absolute top-6 left-6 text-xs text-gray-500 font-medium">{item.step}</span>
                                <div className="relative w-40 h-40 flex justify-center items-center mb-8 mt-4">
                                    <div className="absolute w-full h-full rounded-full border border-[#C8FF80]/30 group-hover:border-black/20 transition-colors duration-500"></div>
                                    <div className="absolute w-28 h-28 rounded-full border border-[#C8FF80]/60 group-hover:border-black/40 transition-colors duration-500"></div>
                                    <div className="w-16 h-16 rounded-full bg-[#C8FF80] flex justify-center items-center z-10 shadow-sm">
                                        <img src={item.icon} alt={`${item.step} icon`} className="w-8 h-8 text-black object-contain" />
                                    </div>
                                </div>
                                <h3 className="font-['GACCO'] text-lg font-normal uppercase mb-4 tracking-wide">{item.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed font-light">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════ HOW IT WORKS (MOBILE) ═══════════════════ */}
            <section id="how-it-works-mobile" className="block md:hidden bg-white py-12 px-6 text-black w-full text-left">
                <h2 className="font-['GACCO'] text-[15px] font-light uppercase tracking-wide mb-6">
                    HOW <span className="bg-[#C8FF80] px-2 py-0.5 font-medium inline-block">RESILUTION WORKS</span>
                </h2>

                <div className="flex items-end justify-between mb-8">
                    <p className="text-gray-600 text-left text-[14px] font-light leading-relaxed max-w-[240px]">
                        A simple and transparent process that connects businesses and investors through blockchain technology.
                    </p>

                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scrollHowWorks('left')}
                            className={`transition-opacity ${currentHowStep === 0 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
                            disabled={currentHowStep === 0}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button
                            onClick={() => scrollHowWorks('right')}
                            className={`transition-opacity ${currentHowStep === howItWorksSteps.length - 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100'}`}
                            disabled={currentHowStep === howItWorksSteps.length - 1}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>
                </div>

                {/* Carousel Container */}
                <div
                    ref={howWorksScrollRef}
                    onScroll={handleHowScroll}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-6 px-6 pb-4"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        scrollBehavior: 'smooth'
                    }}
                >
                    <style jsx>{`
                        div::-webkit-scrollbar { display: none; }
                    `}</style>

                    {howItWorksSteps.map((item, index) => (
                        <div key={index} className="snap-center shrink-0 w-[280px]">
                            <div className="bg-[#F8F5F5] p-8 rounded-sm h-[340px] flex flex-col items-start text-left relative card-hover-gradient group border border-gray-100">
                                <span className="absolute top-4 left-4 text-xs text-gray-400 font-medium font-['Arial']">Step {index + 1}</span>
                                <div className="relative w-20 h-20 flex justify-center items-center mb-6 mt-4">
                                    {/* Concentric Rings */}
                                    <div className="absolute w-20 h-20 rounded-full border border-[#C8FF80]/15 group-hover:border-black/15 transition-colors duration-500"></div>
                                    <div className="absolute w-16 h-16 rounded-full border border-[#C8FF80]/30 group-hover:border-black/30 transition-colors duration-500"></div>
                                    <div className="w-10 h-10 rounded-full bg-[#C8FF80] flex justify-center items-center z-10 shadow-sm">
                                        <img src={item.icon} alt={`${item.step} icon`} className="w-5 h-5 text-black object-contain" />
                                    </div>
                                </div>
                                <h3 className="font-['GACCO'] text-[15px] font-bold uppercase mb-3 tracking-wide text-left">{item.title}</h3>
                                <p className="text-gray-600 text-[13px] leading-relaxed font-light text-left">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════ PRODUCT DATA CHAINS ═══════════════════ */}
            {/* ═══════════════════ PRODUCT DATA CHAINS ═══════════════════ */}
            {/* ═══════════════════ PRODUCT DATA CHAINS (DESKTOP) ═══════════════════ */}
            <section id="product-chains" className="hidden md:flex bg-black w-full justify-center relative overflow-hidden" style={{ minHeight: '922px' }}>
                <div className="w-full relative h-full mx-auto max-w-[1451px]">
                    {/* Left Content */}
                    <div className="relative z-20 text-left pl-8 md:pl-16 pt-[100px] lg:pt-[200px]" style={{ width: '100%', maxWidth: '650px' }}> {/* Adjusted Layout Top & Padding */}
                        <h2 className="font-['GACCO'] text-[36px] font-normal uppercase mb-8 text-[#C8FF80] drop-shadow-[0_0_15px_rgba(200,255,128,0.4)]" style={{ lineHeight: '69px' }}>
                            Transparency <br /> Through Product <br /> Data Chains
                        </h2>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-[1px] w-16 bg-[#C8FF80] opacity-50"></div>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8FF80]/30 to-transparent"></div>
                        </div>

                        <p className="text-white text-lg md:text-xl font-light leading-relaxed mb-12 max-w-lg tracking-wide">
                            Resilution introduces Product Data Chains to record key business and product events on the blockchain.
                        </p>

                        <button className="font-['GACCO'] bg-[#C8FF80] text-black px-10 py-5 text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#b0e660] transition-colors rounded-sm shadow-[0_0_25px_rgba(200,255,128,0.5)]">
                            Learn More
                        </button>
                    </div>

                    {/* Right Images (Absolute Positioning from Figma Layers) */}
                    {/* Cube 2 (Bottom/Back) */}
                    <div className="absolute z-0 pointer-events-none right-[-300px] lg:right-[-100px]" style={{
                        top: '241px',
                        width: '866px',
                        height: '829px',
                        transform: 'none' // Ensure no other transforms interfere
                    }}>
                        <img src="/homepage_assets/product_chains_cube2.png" alt="Data Chain Cube Back" className="w-full h-full object-cover object-bottom opacity-100" />
                    </div>

                    {/* Cube 1 (Top/Front) */}
                    <div className="absolute z-10 pointer-events-none right-[5%] lg:right-[15%]" style={{
                        top: '100px',
                        width: '580px',
                        height: '555px',
                        transform: 'none'
                    }}>
                        <img src="/homepage_assets/product_chains_cube1.png" alt="Data Chain Cube Front" className={`w-full h-full object-contain drop-shadow-2xl opacity-100 ${style['animate-subtle-bounce-delayed']}`} />
                    </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-[#C8FF80]/5 to-transparent pointer-events-none"></div>
            </section>

            {/* ═══════════════════ PRODUCT DATA CHAINS (MOBILE) ═══════════════════ */}
            <section id="product-chains-mobile" className="block md:hidden bg-black w-full py-20 px-6 relative overflow-hidden text-left min-h-[750px] flex flex-col justify-start">

                {/* Background Cubes - Deep Layer (Bigger) */}
                <div className="absolute z-0 pointer-events-none" style={{
                    width: '306px',
                    height: '293px',
                    bottom: '20px',
                    left: '194px',
                }}>
                    <img src="/homepage_assets/product_chains_cube2.png" alt="Data Chain Cube Back" className="w-full h-full object-contain" />
                </div>

                {/* Background Cubes - Floating Layer (Smaller) */}
                <div className="absolute z-10 pointer-events-none" style={{
                    width: '207px',
                    height: '198px',
                    bottom: '150px',
                    left: '162px',
                }}>
                    <img src="/homepage_assets/product_chains_cube1.png" alt="Data Chain Cube Front" className={`w-full h-full object-contain ${style['animate-subtle-bounce-delayed']}`} />
                </div>

                {/* Content Layer */}
                <div className="relative z-20 text-left">
                    <h2 className="font-['GACCO'] text-[24px] font-normal uppercase leading-[1.2] mb-6 text-[#C8FF80]">
                        Transparency <br /> Through Product <br /> Data Chains
                    </h2>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-[1px] w-16 bg-[#C8FF80]"></div>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-[#C8FF80]/30 to-transparent"></div>
                    </div>

                    <p className="text-white text-[15px] font-light leading-relaxed mb-10 tracking-wide max-w-[280px]">
                        Resilution introduces Product Data Chains to record key business and product events on the blockchain.
                    </p>
                </div>

                <button className="absolute bottom-12 left-6 z-30 font-['GACCO'] bg-[#C8FF80] text-black px-8 py-4 text-[13px] font-bold uppercase rounded-sm shadow-[0_0_20px_rgba(200,255,128,0.3)]">
                    Learn More
                </button>
            </section>

            {/* ═══════════════════ ECOSYSTEM ═══════════════════ */}
            {/* ═══════════════════ ECOSYSTEM ═══════════════════ */}
            {/* ═══════════════════ ECOSYSTEM ═══════════════════ */}
            {/* ═══════════════════ ECOSYSTEM ═══════════════════ */}
            {/* ═══════════════════ ECOSYSTEM (DESKTOP) ═══════════════════ */}
            <section id="ecosystem" className="hidden md:block bg-black relative overflow-hidden w-full" style={{ height: '864px' }}>
                {/* Background Glow (Optional - kept for ambience) */}
                <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
                    <img src="/homepage_assets/ecosystem_bg.png" alt="Background Glow" className="w-full h-full object-cover opacity-60" />
                </div>

                <div className="relative max-w-[1440px] mx-auto h-full">
                    {/* Headline */}
                    <div data-aos="fade-up" className="absolute text-left z-20" style={{ width: 'auto', height: 'auto', top: '97px', left: '80px', whiteSpace: 'nowrap' }}>
                        <h2 className="uppercase text-[#C8FF80] tracking-wide" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '36px', lineHeight: '130%' }}>
                            The Resilution Ecosystem
                        </h2>
                    </div>
                    |
                    {/* Subtext */}
                    <div className="absolute text-left z-20 px-0" style={{ width: '100%', maxWidth: '800px', height: 'auto', top: '185px', left: '80px' }}>
                        <p className="text-white" style={{ fontFamily: 'arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>
                            Resilution is more than an investment platform; it&apos;s a growing ecosystem of blockchain-powered tools designed to support businesses, investors, and communities.
                        </p>
                    </div>

                    {/* Eden AI Assistant Card */}
                    <div data-aos="fade-down" data-aos-delay="100" className="absolute z-20 border border-white/10 bg-[#0A0A0A] p-6 rounded-2xl flex gap-4 items-start shadow-2xl left-1/2 -translate-x-1/2 card-hover-light"
                        style={{ width: '421px', height: '118px', top: '345px', borderWidth: '1px', borderRadius: '9px' }}>
                        <div className="icon-ring w-10 h-10 shrink-0 bg-[#1a1a1a] rounded-full p-2 flex items-center justify-center border border-gray-800">
                            <img src="/homepage_assets/icon_eden.svg" alt="Eden AI" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-medium mb-1">Eden AI Assistant</h3>
                            <p className="text-gray-400 text-xs leading-relaxed font-light">
                                An intelligent assistant that helps users navigate the platform, understand proposals, and access real-time insights.
                            </p>
                        </div>
                    </div>

                    {/* Central R Logo */}
                    <div className="absolute z-10 left-1/2 -translate-x-1/2 flex items-center justify-center overflow-hidden pointer-events-none" style={{ width: '800px', height: '800px', top: '320px' }}>
                        <Spline scene='https://prod.spline.design/KCsPFYpldBZIJ4sy/scene.splinecode' style={{ width: '100%', height: '100%' }} />
                    </div>

                    {/* ResilPay Card */}
                    <div data-aos="fade-right" data-aos-delay="200" className="absolute z-20 border border-white/10 bg-[#0A0A0A] p-6 rounded-2xl flex gap-4 items-start shadow-2xl left-[5%] xl:left-[50px] card-hover-light"
                        style={{ width: '421px', height: '118px', top: '550px', borderWidth: '1px', borderRadius: '9px' }}>
                        <div className="w-10 h-10 shrink-0 bg-[#1a1a1a] rounded-full p-2 flex items-center justify-center border border-gray-800">
                            <img src="/homepage_assets/icon_pay.svg" alt="ResilPay" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-medium mb-1">ResilPay</h3>
                            <p className="text-gray-400 text-xs leading-relaxed font-light">
                                A secure payment and transfer system for seamless transactions within the ecosystem.
                            </p>
                        </div>
                    </div>

                    {/* ResilMall Card */}
                    <div data-aos="fade-left" data-aos-delay="200" className="absolute z-20 border border-white/10 bg-[#0A0A0A] p-6 rounded-2xl flex gap-4 items-start shadow-2xl right-[5%] xl:right-[50px] card-hover-light"
                        style={{ width: '421px', height: '118px', top: '550px', borderWidth: '1px', borderRadius: '9px' }}>
                        <div className="w-10 h-10 shrink-0 bg-[#1a1a1a] rounded-full p-2 flex items-center justify-center border border-gray-800">
                            <img src="/homepage_assets/icon_mall.svg" alt="ResilMall" className="w-full h-full object-contain" />
                        </div>
                        <div>
                            <h3 className="text-white text-lg font-medium mb-1">ResilMall</h3>
                            <p className="text-gray-400 text-xs leading-relaxed font-light">
                                A decentralized marketplace connecting businesses directly with consumers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ ECOSYSTEM (MOBILE) ═══════════════════ */}
            <section id="ecosystem-mobile" className="block md:hidden bg-black py-12 px-4 relative overflow-hidden w-full">
                {/* Background Glow */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <img src="/homepage_assets/ecosystem_bg.png" alt="Background Glow" className="w-full h-full object-cover opacity-60" />
                </div>

                <div className="relative z-20 flex flex-col items-center text-center">
                    <h2 className="font-['GACCO'] text-[15px] font-medium uppercase text-[#C8FF80] tracking-wide mb-4">
                        THE RESILUTION ECOSYSTEM
                    </h2>
                    <p className="font-['arial'] text-white text-[15px] font-light leading-relaxed mb-10 text-gray-300">
                        Resilution is more than an investment platform; it&apos;s a growing ecosystem of blockchain-powered tools designed to support businesses, investors, and communities.
                    </p>

                    <div className="flex flex-col gap-6 w-full mb-12">
                        {/* Eden AI Assistant Card */}
                        <div data-aos="fade-up"
                            className="relative p-[1px] rounded-[12px] overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #737373 0%, #D9D9D9 100%)',
                            }}>
                            <div className="flex items-start gap-5 p-5 h-full w-full rounded-[11px]"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.85)',
                                    backdropFilter: 'blur(117.4px)',
                                    WebkitBackdropFilter: 'blur(117.4px)',
                                }}>
                                <img src="/homepage_assets/icon_eden.svg" alt="Eden AI" className="w-10 h-10 shrink-0 object-contain" />
                                <div className="flex flex-col text-left">
                                    <h3 className="font-['arial'] text-white text-[16px] font-bold mb-1">Eden AI Assistant</h3>
                                    <p className="font-['arial'] text-gray-300 text-[12px] leading-relaxed font-light">
                                        An intelligent assistant that helps users navigate the platform, understand proposals, and access real-time insights.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ResilPay Card */}
                        <div data-aos="fade-up" data-aos-delay="100"
                            className="relative p-[1px] rounded-[12px] overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #737373 0%, #D9D9D9 100%)',
                            }}>
                            <div className="flex items-start gap-5 p-5 h-full w-full rounded-[11px]"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.85)',
                                    backdropFilter: 'blur(117.4px)',
                                    WebkitBackdropFilter: 'blur(117.4px)',
                                }}>
                                <img src="/homepage_assets/icon_pay.svg" alt="ResilPay" className="w-10 h-10 shrink-0 object-contain" />
                                <div className="flex flex-col text-left">
                                    <h3 className="font-['arial'] text-white text-[16px] font-bold mb-1">ResilPay</h3>
                                    <p className="font-['arial'] text-gray-300 text-[12px] leading-relaxed font-light">
                                        A secure payment and transfer system for seamless transactions within the ecosystem.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ResilMall Card */}
                        <div data-aos="fade-up" data-aos-delay="200"
                            className="relative p-[1px] rounded-[12px] overflow-hidden"
                            style={{
                                background: 'linear-gradient(180deg, #737373 0%, #D9D9D9 100%)',
                            }}>
                            <div className="flex items-start gap-5 p-5 h-full w-full rounded-[11px]"
                                style={{
                                    background: 'rgba(0, 0, 0, 0.85)',
                                    backdropFilter: 'blur(117.4px)',
                                    WebkitBackdropFilter: 'blur(117.4px)',
                                }}>
                                <img src="/homepage_assets/icon_mall.svg" alt="ResilMall" className="w-10 h-10 shrink-0 object-contain" />
                                <div className="flex flex-col text-left">
                                    <h3 className="font-['arial'] text-white text-[16px] font-bold mb-1">ResilMall</h3>
                                    <p className="font-['arial'] text-gray-300 text-[12px] leading-relaxed font-light">
                                        A decentralized marketplace connecting businesses directly with consumers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Central R Logo */}
                    <div className="relative w-full flex justify-center mt-4">
                        <img src="/homepage_assets/ecosystem_r_silver.svg" alt="R Logo" className="w-[300px] h-auto object-contain" />
                    </div>
                </div>
            </section>

            {/* ═══════════════════ CREDITS & TOKEN SYSTEM ═══════════════════ */}
            {/* ═══════════════════ CREDITS & TOKEN SYSTEM ═══════════════════ */}
            {/* ═══════════════════ CREDITS & TOKEN SYSTEM (DESKTOP) ═══════════════════ */}
            <section
                id="credits-token"
                className="hidden md:block text-white relative overflow-hidden w-full"
                style={{
                    height: '1062px',
                    background: '#000000',
                }}
            >
                {/* Subtle green ambient glow */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        width: '900px',
                        height: '500px',
                        top: '300px',
                        background: 'radial-gradient(ellipse, rgba(200, 255, 128, 0.06) 0%, transparent 70%)',
                        zIndex: 0,
                    }}
                ></div>

                <div className="relative max-w-[1440px] mx-auto h-full">
                    {/* 3D Token Image - BEHIND everything (z-index 1) */}
                    <div
                        className="absolute pointer-events-none"
                        style={{
                            width: '706px',
                            height: '1059px',
                            top: '-15px',
                            left: '247px',
                            zIndex: 1,
                        }}
                    >
                        <img
                            src="/homepage_assets/token_box_3d.svg"
                            alt="3D Token Box"
                            className="w-full h-full object-contain"
                            style={{
                                opacity: 1,
                            }}
                        />
                        {/* Black shade fade at bottom of image - extends to card bottoms */}
                        <div
                            className="absolute bottom-0 left-0 right-0 pointer-events-none"
                            style={{
                                height: '50%',
                                background: 'linear-gradient(to top, #000000 0%, #000000 15%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.5) 60%, transparent 100%)',
                            }}
                        ></div>
                    </div>

                    {/* Header - GACCO font, positioned per Figma */}
                    <div data-aos="fade-up" className="absolute z-10" style={{ width: 'auto', height: 'auto', top: '171px', left: '80px', whiteSpace: 'nowrap' }}>
                        <h2
                            className="text-left uppercase text-[#C8FF80]"
                            style={{
                                fontFamily: 'GACCO',
                                fontWeight: 500,
                                fontSize: '36px',
                                lineHeight: '130%',
                                letterSpacing: '0%',
                            }}
                        >
                            Credits & Token System
                        </h2>
                    </div>

                    {/* Subtext - Arial, positioned per Figma */}
                    <div className="absolute z-10" style={{ width: '607px', height: 'auto', top: '230px', left: '80px' }}>
                        <p
                            className="text-left"
                            style={{
                                fontFamily: 'Arial',
                                fontWeight: 400,
                                fontSize: '16px',
                                lineHeight: '150%',
                                letterSpacing: '0%',
                                color: 'rgba(255,255,255,0.6)',
                            }}
                        >
                            Resilution combines simplicity with blockchain power through a dual economic model.
                        </p>
                    </div>

                    {/* Left Card: Credits - positioned above image */}
                    <div
                        data-aos="fade-right"
                        className="absolute z-10 group"
                        style={{
                            top: '380px',
                            left: '73px',
                            width: '380px',
                        }}
                    >
                        {/* Gradient border wrapper */}
                        <div
                            className="absolute inset-0 rounded-[16px] pointer-events-none group-hover:opacity-0 transition-opacity duration-500"
                            style={{
                                padding: '1px',
                                background: 'linear-gradient(135deg, rgba(200,255,128,0.5) 0%, rgba(200,255,128,0.15) 20%, rgba(200,255,128,0.03) 50%, rgba(200,255,128,0.15) 80%, rgba(200,255,128,0.5) 100%)',
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude',
                                borderRadius: '16px',
                            }}
                        ></div>
                        <div
                            className="relative rounded-[16px] flex flex-col card-hover-light"
                            style={{
                                background: 'linear-gradient(160deg, rgba(20, 31, 10, 0.85) 0%, rgba(12, 20, 7, 0.9) 30%, rgba(10, 18, 5, 0.9) 60%, rgba(13, 22, 8, 0.85) 100%)',
                                backdropFilter: 'blur(20px)',
                                padding: '45px 30px 40px',
                                minHeight: '520px',
                            }}
                        >
                            {/* Icon circle */}
                            <div
                                className="icon-ring flex items-center justify-center shrink-0"
                                style={{
                                    width: '42px',
                                    height: '42px',
                                    marginBottom: '20px',
                                    borderRadius: '50%',
                                    background: 'rgba(200, 255, 128, 0.12)',
                                    border: '1px solid rgba(200, 255, 128, 0.25)',
                                }}
                            >
                                <img
                                    src="/homepage_assets/icon_credits.svg"
                                    alt="Credits"
                                    className="w-5 h-5 object-contain"
                                    style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(20%) saturate(800%) hue-rotate(30deg)' }}
                                />
                            </div>
                            <h3
                                className="text-white uppercase"
                                style={{
                                    fontFamily: 'GACCO',
                                    fontSize: '22px',
                                    lineHeight: '26px',
                                    fontWeight: 600,
                                    letterSpacing: '1.5px',
                                    marginBottom: '28px',
                                }}
                            >
                                CREDITS
                            </h3>
                            <ul
                                className="flex-grow list-disc pl-5 space-y-3"
                                style={{
                                    fontFamily: 'Arial',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    fontWeight: 400,
                                    maxWidth: '300px',
                                    color: 'rgba(255,255,255,0.7)',
                                }}
                            >
                                <li>Credits are stable, USD-pegged units designed to make participation simple and secure.</li>
                                <li>They allow users to invest, fund businesses, and transact without worrying about crypto volatility.</li>
                            </ul>
                            <button
                                className="flex justify-center items-center mt-8 font-medium hover:brightness-110 transition-all text-black"
                                style={{
                                    fontFamily: 'Arial',
                                    width: '190px',
                                    height: '44px',
                                    fontSize: '15px',
                                    background: '#C8FF80',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '2px',
                                }}
                            >
                                Learn About Credits
                            </button>
                        </div>
                    </div>

                    {/* Right Card: Token - positioned above image, touching right edge of 3D image */}
                    <div
                        data-aos="fade-left"
                        className="absolute z-10 group"
                        style={{
                            top: '380px',
                            left: '987px',
                            width: '380px',
                        }}
                    >
                        {/* Gradient border wrapper */}
                        <div
                            className="absolute inset-0 rounded-[16px] pointer-events-none group-hover:opacity-0 transition-opacity duration-500"
                            style={{
                                padding: '1px',
                                background: 'linear-gradient(135deg, rgba(200,255,128,0.5) 0%, rgba(200,255,128,0.15) 20%, rgba(200,255,128,0.03) 50%, rgba(200,255,128,0.15) 80%, rgba(200,255,128,0.5) 100%)',
                                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                                WebkitMaskComposite: 'xor',
                                maskComposite: 'exclude',
                                borderRadius: '16px',
                            }}
                        ></div>
                        <div
                            className="relative rounded-[16px] flex flex-col card-hover-light"
                            style={{
                                background: 'linear-gradient(160deg, rgba(20, 31, 10, 0.85) 0%, rgba(12, 20, 7, 0.9) 30%, rgba(10, 18, 5, 0.9) 60%, rgba(13, 22, 8, 0.85) 100%)',
                                backdropFilter: 'blur(20px)',
                                padding: '45px 30px 40px',
                                minHeight: '520px',
                            }}
                        >
                            {/* Icon circle */}
                            <div
                                className="icon-ring flex items-center justify-center shrink-0"
                                style={{
                                    width: '42px',
                                    height: '42px',
                                    marginBottom: '20px',
                                    borderRadius: '50%',
                                    background: 'rgba(200, 255, 128, 0.12)',
                                    border: '1px solid rgba(200, 255, 128, 0.25)',
                                }}
                            >
                                <img
                                    src="/homepage_assets/icon_token.svg"
                                    alt="Token"
                                    className="w-5 h-5 object-contain"
                                    style={{ filter: 'brightness(0) saturate(100%) invert(85%) sepia(20%) saturate(800%) hue-rotate(30deg)' }}
                                />
                            </div>
                            <h3
                                className="text-white uppercase"
                                style={{
                                    fontFamily: 'GACCO',
                                    fontSize: '22px',
                                    lineHeight: '26px',
                                    fontWeight: 600,
                                    letterSpacing: '1.5px',
                                    marginBottom: '28px',
                                }}
                            >
                                $RESIL TOKEN
                            </h3>
                            <ul
                                className="flex-grow list-disc pl-5 space-y-3"
                                style={{
                                    fontFamily: 'Arial',
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    fontWeight: 400,
                                    maxWidth: '300px',
                                    color: 'rgba(255,255,255,0.7)',
                                }}
                            >
                                <li>The $RESIL token powers the Resilution ecosystem through rewards, governance, and tier upgrades.</li>
                                <li>It enables profit sharing and long-term ecosystem growth.</li>
                            </ul>
                            <button
                                className="flex justify-center items-center mt-8 font-medium hover:brightness-110 transition-all text-black"
                                style={{
                                    fontFamily: 'Arial',
                                    width: '190px',
                                    height: '44px',
                                    fontSize: '15px',
                                    background: '#C8FF80',
                                    color: '#000',
                                    border: 'none',
                                    borderRadius: '2px',
                                }}
                            >
                                Learn About Token
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* ═══════════════════ CREDITS & TOKEN SYSTEM (MOBILE) ═══════════════════ */}
            <section id="credits-token-mobile" className="block md:hidden text-white w-full py-12 px-4 bg-black">
                <h2 className="font-['GACCO'] text-[15px] font-medium uppercase text-[#C8FF80] text-center mb-4">
                    CREDITS & TOKEN SYSTEM
                </h2>
                <p className="font-['arial'] text-gray-300 text-center text-[15px] mb-10 font-light leading-relaxed">
                    Resilution combines simplicity with blockchain power through a dual economic model.
                </p>

                <div className="flex flex-col gap-6">
                    {/* Credits Card */}
                    <div data-aos="fade-up" className="rounded-[16px] bg-[#141f0a] border border-[#C8FF80]/20 p-6 card-hover-light group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="icon-ring w-10 h-10 rounded-full bg-[#C8FF80]/10 flex justify-center items-center border border-[#C8FF80]/30 transition-all duration-500">
                                <img src="/homepage_assets/icon_credits.svg" alt="Credits" className="w-5 h-5 object-contain" />
                            </div>
                            <h3 className="font-['GACCO'] text-white text-xl font-bold uppercase">CREDITS</h3>
                        </div>
                        <ul className="font-['arial'] list-disc pl-5 space-y-2 text-gray-300 text-sm font-light mb-6">
                            <li>Credits are stable, USD-pegged units designed to make participation simple and secure.</li>
                            <li>They allow users to invest, fund businesses, and transact without worrying about crypto volatility.</li>
                        </ul>
                        <button className="font-['arial'] bg-[#C8FF80] text-black w-full py-3 text-sm font-bold rounded-sm uppercase">
                            Learn About Credits
                        </button>
                    </div>

                    {/* Token Card */}
                    <div data-aos="fade-up" data-aos-delay="100" className="rounded-[16px] bg-[#141f0a] border border-[#C8FF80]/20 p-6 card-hover-light group">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="icon-ring w-10 h-10 rounded-full bg-[#C8FF80]/10 flex justify-center items-center border border-[#C8FF80]/30 transition-all duration-500">
                                <img src="/homepage_assets/icon_token.svg" alt="Token" className="w-5 h-5 object-contain" />
                            </div>
                            <h3 className="font-['GACCO'] text-white text-xl font-bold uppercase">$RESIL TOKEN</h3>
                        </div>
                        <ul className="font-['arial'] list-disc pl-5 space-y-2 text-gray-300 text-sm font-light mb-6">
                            <li>The $RESIL token powers the Resilution ecosystem through rewards, governance, and tier upgrades.</li>
                            <li>It enables profit sharing and long-term ecosystem growth.</li>
                        </ul>
                        <button className="font-['arial'] bg-[#C8FF80] text-black w-full py-3 text-sm font-bold rounded-sm uppercase">
                            Learn About Token
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ TOKENOMICS & UTILITY ═══════════════════ */}
            {/* ═══════════════════ TOKENOMICS & UTILITY ═══════════════════ */}
            {/* ═══════════════════ TOKENOMICS & UTILITY (DESKTOP) ═══════════════════ */}
            <section id="tokenomics" className="hidden md:block bg-black relative overflow-hidden w-full" style={{ height: '1283px' }}>

                <div className="relative max-w-[1440px] mx-auto h-full">
                    {/* Headline */}
                    <div className="absolute z-20" style={{ top: '103px', left: '80px' }}>
                        <h2 className="uppercase text-[#C8FF80] tracking-wide" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '36px', lineHeight: '130%' }}>
                            TOKENOMICS & UTILITY
                        </h2>
                    </div>

                    {/* Subtext */}
                    <div className="absolute z-20" style={{ top: '192px', left: '80px', width: '577px' }}>
                        <p className="text-white" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%', color: '#FFFFFF' }}>
                            The $RESIL token is designed to drive platform growth, reward participation, and ensure long-term ecosystem sustainability.
                        </p>
                    </div>

                    {/* Learn More Button */}
                    <button className="absolute z-20 bg-[#C8FF80] text-black font-bold uppercase hover:bg-[#b0e660] transition-colors flex items-center justify-center"
                        style={{ top: '110px', left: '1163px', width: '185px', height: '43px', fontSize: '14px', letterSpacing: '0.05em' }}>
                        Learn More
                    </button>

                    {/* Central Coin Image */}
                    <div className="absolute z-30" style={{ top: '474px', left: '489px', width: '555px', height: '510px' }}>
                        <img src="/homepage_assets/tokenomics_coin.svg" alt="Tokenomics Coin" className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(200,255,128,0.2)]" />
                    </div>

                    {/* Access & Tiers Card (Top Left) */}
                    <div data-aos="fade-right" className="absolute z-20 flex flex-col items-start justify-center text-left p-8 pl-12 card-hover-light"
                        style={{
                            top: '315px',
                            left: '170px',
                            width: '383px',
                            height: '317px',
                            borderRadius: '18px',
                            border: '1px solid transparent',
                            background: 'linear-gradient(180deg, rgba(32, 43, 16, 0.6) 0%, #000000 100%) padding-box, linear-gradient(45deg, #C8FF80 0%, transparent 40%, transparent 60%, #C8FF80 100%) border-box',
                            backdropFilter: 'blur(500px)'
                        }}>
                        <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '24px', lineHeight: '130%' }}>Access & Tiers</h3>
                        <p className="text-white" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>
                            $RESIL tokens unlock premium features, higher investment limits, and advanced platform tools through tier-based access.
                        </p>
                    </div>

                    {/* Rewards System Card (Top Right) */}
                    <div data-aos="fade-left" className="absolute z-20 flex flex-col items-start justify-center text-left p-8 pl-12 card-hover-light"
                        style={{
                            top: '315px',
                            left: '888px',
                            width: '383px',
                            height: '317px',
                            borderRadius: '18px',
                            border: '1px solid transparent',
                            background: 'linear-gradient(180deg, rgba(32, 43, 16, 0.6) 0%, #000000 100%) padding-box, linear-gradient(225deg, #C8FF80 0%, transparent 40%, transparent 60%, #C8FF80 100%) border-box',
                            backdropFilter: 'blur(500px)'
                        }}>
                        <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '24px', lineHeight: '130%' }}>Rewards System</h3>
                        <ul className="text-white list-disc pl-5 space-y-2" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>
                            <li>Users earn $RESIL through investments, platform participation, and ecosystem contributions.</li>
                            <li>Automated smart contracts distribute rewards transparently.</li>
                        </ul>
                    </div>

                    {/* Staking Card (Bottom Left) */}
                    <div data-aos="fade-right" data-aos-delay="200" className="absolute z-20 flex flex-col items-start justify-center text-left p-8 pl-12 card-hover-light"
                        style={{
                            top: '800px',
                            left: '170px',
                            width: '383px',
                            height: '317px',
                            borderRadius: '18px',
                            border: '1px solid transparent',
                            background: 'linear-gradient(180deg, rgba(32, 43, 16, 0.6) 0%, #000000 100%) padding-box, linear-gradient(45deg, #C8FF80 0%, transparent 40%, transparent 60%, #C8FF80 100%) border-box',
                            backdropFilter: 'blur(500px)'
                        }}>
                        <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '24px', lineHeight: '130%' }}>Staking</h3>
                        <div className="text-white" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>
                            <p className="mb-4">Stake $RESIL tokens to receive:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Reduced platform fees</li>
                                <li>Priority access to deals</li>
                                <li>Additional rewards</li>
                            </ul>
                        </div>
                    </div>

                    {/* Governance Card (Bottom Right) */}
                    <div data-aos="fade-left" data-aos-delay="200" className="absolute z-20 flex flex-col items-start justify-center text-left p-8 pl-12 card-hover-light"
                        style={{
                            top: '800px',
                            left: '888px',
                            width: '383px',
                            height: '317px',
                            borderRadius: '18px',
                            border: '1px solid transparent',
                            background: 'linear-gradient(180deg, rgba(32, 43, 16, 0.6) 0%, #000000 100%) padding-box, linear-gradient(225deg, #C8FF80 0%, transparent 40%, transparent 60%, #C8FF80 100%) border-box',
                            backdropFilter: 'blur(500px)'
                        }}>
                        <h3 className="text-white uppercase mb-6" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '24px', lineHeight: '130%' }}>Governance</h3>
                        <p className="text-white" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>
                            Token holders can vote on platform upgrades, ecosystem decisions, and future developments.
                        </p>
                    </div>

                </div>
                {/* Background Decoration (Lower Waves - Layer 2) */}
                <div className="absolute bottom-0 left-0 w-full z-10 pointer-events-none">
                    <img src="/homepage_assets/Layer 2.svg" alt="Background Waves" className="w-full h-auto object-cover object-bottom opacity-100" />
                </div>
            </section>

            {/* ═══════════════════ TOKENOMICS & UTILITY (MOBILE) ═══════════════════ */}
            <section id="tokenomics-mobile" className="block md:hidden bg-black py-16 px-6 w-full relative overflow-hidden">

                <div className="text-center mb-8 relative z-10">
                    <h2 className="font-['GACCO'] uppercase text-[#C8FF80] tracking-wide text-[15px] font-medium mb-6 leading-tight">
                        TOKENOMICS & UTILITY
                    </h2>
                    <p className="font-['arial'] text-white text-[15px] font-light text-gray-300 max-w-sm mx-auto leading-relaxed">
                        The $RESIL token is designed to drive platform growth, reward participation, and ensure long-term ecosystem sustainability.
                    </p>
                </div>

                {/* 3D Coin Image - Centered and Large */}
                <div className="relative w-full flex justify-center mb-8 pointer-events-none">
                    <div className="w-[280px] h-[280px] relative">
                        <img
                            src="/homepage_assets/tokenomics_coin.svg"
                            alt="Tokenomics Coin"
                            className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(200,255,128,0.3)] animate-pulse-slow"
                        />
                    </div>
                </div>

                {/* Carousel Container */}
                <div className="relative w-full max-w-[340px] mx-auto">

                    {/* Navigation Arrows (Top Right) */}
                    <div className="flex justify-end items-center gap-4 mb-4 pr-2">
                        <button
                            onClick={() => scrollTokenCard('left')}
                            className={`text-[#C8FF80] transition-opacity ${currentTokenCard === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                            disabled={currentTokenCard === 0}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                        </button>
                        <button
                            onClick={() => scrollTokenCard('right')}
                            className={`text-[#C8FF80] transition-opacity ${currentTokenCard === 3 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
                            disabled={currentTokenCard === 3}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </button>
                    </div>

                    {/* Cards Scroll View */}
                    <div
                        ref={tokenomicsScrollRef}
                        onScroll={handleTokenScroll}
                        className="overflow-x-auto flex snap-x snap-mandatory w-full"
                        style={{
                            scrollBehavior: 'smooth',
                            scrollbarWidth: 'none', /* Firefox */
                            msOverflowStyle: 'none'  /* IE 10+ */
                        }}
                    >
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none;
                            }
                        `}</style>
                        {/* Access & Tiers Card */}
                        <div className="snap-center shrink-0 w-full p-2">
                            <div className="h-full p-8 rounded-[24px] bg-gradient-to-b from-[#1a240e] to-black border border-[#C8FF80]/30 shadow-[0_0_15px_rgba(200,255,128,0.1)] flex flex-col items-center text-center card-hover-light">
                                <h3 className="font-['GACCO'] text-white uppercase mb-4 text-[16px] font-bold tracking-wide">Access & Tiers</h3>
                                <p className="font-['arial'] text-gray-300 text-[13px] leading-relaxed font-light">
                                    $RESIL tokens unlock premium features, higher investment limits, and advanced platform tools through tier-based access.
                                </p>
                            </div>
                        </div>

                        {/* Rewards System Card */}
                        <div className="snap-center shrink-0 w-full p-2">
                            <div className="h-full p-8 rounded-[24px] bg-gradient-to-b from-[#1a240e] to-black border border-[#C8FF80]/30 shadow-[0_0_15px_rgba(200,255,128,0.1)] flex flex-col items-center text-center card-hover-light">
                                <h3 className="font-['GACCO'] text-white uppercase mb-4 text-[16px] font-bold tracking-wide">Rewards System</h3>
                                <ul className="font-['arial'] text-gray-300 text-[13px] leading-relaxed list-disc pl-6 space-y-3 text-left font-light">
                                    <li>Users earn $RESIL through investments, platform participation, and ecosystem contributions.</li>
                                    <li>Automated smart contracts distribute rewards transparently.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Staking Card */}
                        <div className="snap-center shrink-0 w-full p-2">
                            <div className="h-full p-8 rounded-[24px] bg-gradient-to-b from-[#1a240e] to-black border border-[#C8FF80]/30 shadow-[0_0_15px_rgba(200,255,128,0.1)] flex flex-col items-center text-center card-hover-light">
                                <h3 className="font-['GACCO'] text-white uppercase mb-4 text-[16px] font-bold tracking-wide">Staking</h3>
                                <div className="text-left w-full pl-2">
                                    <p className="font-['arial'] text-gray-300 text-[13px] mb-3 font-medium">Stake $RESIL tokens to receive:</p>
                                    <ul className="font-['arial'] text-gray-300 text-[13px] leading-relaxed list-disc pl-6 space-y-2 font-light">
                                        <li>Reduced platform fees</li>
                                        <li>Priority access to deals</li>
                                        <li>Additional rewards</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Governance Card */}
                        <div className="snap-center shrink-0 w-full p-2">
                            <div className="h-full p-8 rounded-[24px] bg-gradient-to-b from-[#1a240e] to-black border border-[#C8FF80]/30 shadow-[0_0_15px_rgba(200,255,128,0.1)] flex flex-col items-center text-center card-hover-light">
                                <h3 className="font-['GACCO'] text-white uppercase mb-4 text-[16px] font-bold tracking-wide">Governance</h3>
                                <p className="font-['arial'] text-gray-300 text-[13px] leading-relaxed font-light">
                                    Token holders can vote on platform upgrades, ecosystem decisions, and future developments.
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* ═══════════════════ TOKEN DISTRIBUTION ═══════════════════ */}
            {/* ═══════════════════ TOKEN DISTRIBUTION ═══════════════════ */}
            {/* ═══════════════════ TOKEN DISTRIBUTION (DESKTOP) ═══════════════════ */}
            <section id="distribution" className="hidden md:block bg-black relative overflow-hidden w-full" style={{ height: '1009px' }}>

                <div className="relative max-w-[1440px] mx-auto h-full">
                    {/* Header & Subtext */}
                    <div className="absolute flex flex-col md:flex-row justify-between items-start md:items-end w-full px-20 gap-10" style={{ top: '133px', left: '0' }}>
                        <h2 className="uppercase text-[#C8FF80]" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '36px', lineHeight: '130%', letterSpacing: '0%' }}>
                            TOKEN DISTRIBUTION
                        </h2>
                        <p className="text-white text-left md:text-right max-w-lg" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>
                            A balanced allocation model designed to prioritize ecosystem growth, long-term alignment, and platform sustainability.
                        </p>
                    </div>

                    {/* Pie Chart Container */}
                    <div className="absolute z-10" style={{ top: '286px', left: '478px', width: '366.5px', height: '366.5px' }}>
                        <svg viewBox="0 0 366.5 366.5" className="w-full h-full overflow-visible">
                            {/* 
                            Pie Chart Segments 
                            Center: 183.25, 183.25
                            Radius: 183.25
                         */}
                            {(() => {
                                const CX = 183.25;
                                const CY = 183.25;
                                const R = 183;
                                // Match indices: 0:Investors, 1:Community, 2:Operations, 3:Team
                                const segmentsKey = [
                                    { name: 'Investors', start: 180, end: 270, color: '#D6E5A8', index: 0 },
                                    { name: 'Community', start: 270, end: 442.8, color: '#C8FF80', index: 1 },
                                    { name: 'Operations', start: 82.8, end: 136.8, color: '#9ACD32', index: 2 },
                                    { name: 'Team', start: 136.8, end: 180, color: '#78994D', index: 3 }
                                ];

                                const rad = deg => (deg * Math.PI) / 180;

                                return segmentsKey.map((seg) => {
                                    const isHovered = hoveredSlice === seg.index;
                                    const radius = isHovered ? R + 10 : R; // Pop out effect

                                    const x1 = CX + radius * Math.cos(rad(seg.start));
                                    const y1 = CY + radius * Math.sin(rad(seg.start));
                                    const x2 = CX + radius * Math.cos(rad(seg.end));
                                    const y2 = CY + radius * Math.sin(rad(seg.end));

                                    const largeArc = (seg.end - seg.start) > 180 ? 1 : 0;

                                    const d = `M ${CX} ${CY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

                                    return (
                                        <path
                                            key={seg.index}
                                            d={d}
                                            fill={seg.color}
                                            stroke={isHovered ? "white" : "none"}
                                            strokeWidth={isHovered ? "2" : "0"}
                                            className="transition-all duration-300 ease-out cursor-pointer"
                                            onMouseEnter={() => setHoveredSlice(seg.index)}
                                            onMouseLeave={() => setHoveredSlice(null)}
                                            style={{ transformOrigin: `${CX}px ${CY}px` }}
                                        />
                                    );
                                });
                            })()}

                            {/* Percentage Labels Inside the Pie - positioned at mid-angle of segments */}
                            <text x="105" y="105" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial" fontSize="14" fill="#000" className="pointer-events-none font-bold">25%</text> {/* Investors */}
                            <text x="293" y="176" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial" fontSize="18" fill="#000" className="pointer-events-none font-bold">48%</text> {/* Community */}
                            <text x="146" y="287" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial" fontSize="14" fill="#000" className="pointer-events-none font-bold">15%</text> {/* Operations */}
                            <text x="81" y="224" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial" fontSize="14" fill="#000" className="pointer-events-none font-bold">12%</text> {/* Team */}
                        </svg>
                    </div>

                    {/* Connector Lines Overlay */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
                        <svg viewBox="0 0 1447 1009" className="w-full h-full">
                            {/* Investors Line: Horizontal then Diagonal Down-Left */}
                            <path d="M 550 360 L 450 360 L 380 410" fill="none" stroke="#C8FF80" strokeWidth="1" />

                            {/* Team Line: Diagonal Down-Left */}
                            <path d="M 490 480 L 340 550" fill="none" stroke="#C8FF80" strokeWidth="1" />

                            {/* Operations Line: Diagonal Down-Left */}
                            <path d="M 560 600 L 410 690" fill="none" stroke="#C8FF80" strokeWidth="1" />

                            {/* Community Line: Horizontal Right then Diagonal Up-Right */}
                            <path d="M 830 469 L 880 469 L 910 420" fill="none" stroke="#C8FF80" strokeWidth="1" />
                        </svg>
                    </div>

                    {/* Labels Layout */}

                    {/* Investors Label */}
                    <div
                        className="absolute text-right cursor-pointer group"
                        style={{ top: '340px', left: '100px', width: '270px' }}
                        onMouseEnter={() => setHoveredSlice(0)}
                        onMouseLeave={() => setHoveredSlice(null)}
                    >
                        <h3 className="text-white uppercase mb-2 group-hover:text-[#C8FF80] transition-colors" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '20px', lineHeight: '130%' }}>INVESTORS</h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>Combined allocation across strategic, private, and public funding rounds.</p>
                    </div>

                    {/* Team & Advisors Label */}
                    <div
                        className="absolute text-right cursor-pointer group"
                        style={{ top: '540px', left: '60px', width: '270px' }}
                        onMouseEnter={() => setHoveredSlice(3)}
                        onMouseLeave={() => setHoveredSlice(null)}
                    >
                        <h3 className="text-white uppercase mb-2 group-hover:text-[#C8FF80] transition-colors" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '20px', lineHeight: '130%' }}>TEAM & ADVISORS</h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>Core contributors and advisors, subject to long-term vesting schedules.</p>
                    </div>

                    {/* Operations Label */}
                    <div
                        className="absolute text-right cursor-pointer group"
                        style={{ top: '680px', left: '130px', width: '270px' }}
                        onMouseEnter={() => setHoveredSlice(2)}
                        onMouseLeave={() => setHoveredSlice(null)}
                    >
                        <h3 className="text-white uppercase mb-2 group-hover:text-[#C8FF80] transition-colors" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '20px', lineHeight: '130%' }}>OPERATIONS & NETWORK</h3>
                        <p className="text-gray-400 group-hover:text-gray-300 transition-colors" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>Platform operations, infrastructure, validator incentives, and network support.</p>
                    </div>

                    {/* Community Label */}
                    <div
                        className="absolute text-left cursor-pointer group"
                        style={{ top: '390px', left: '940px', width: '450px' }}
                        onMouseEnter={() => setHoveredSlice(1)}
                        onMouseLeave={() => setHoveredSlice(null)}
                    >
                        <h3 className="text-white uppercase mb-2 group-hover:text-[#C8FF80] transition-colors" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '20px', lineHeight: '130%' }}>COMMUNITY & ECOSYSTEM</h3>
                        <p className="text-gray-400 mb-8 group-hover:text-gray-300 transition-colors" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>Rewards, incentives, ecosystem growth, and user participation programs.</p>

                        <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>
                            Detailed allocation breakdown and vesting schedules are available in the Resilution Litepaper.
                        </p>

                        <button className="flex items-center gap-2 bg-[#C8FF80] text-black px-4 py-2 rounded text-sm font-medium hover:bg-[#b0e660] transition-colors">
                            <span className="text-lg">📄</span> Resilution Litepaper
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ TOKEN DISTRIBUTION (MOBILE) ═══════════════════ */}
            <section id="distribution-mobile" className="block md:hidden bg-black py-12 px-4 w-full">
                <div className="flex flex-col items-center">
                    {/* Header: Distribution Title */}
                    <h2 className="font-['GACCO'] uppercase text-[#C8FF80] tracking-wide text-[15px] font-medium mb-6 text-center">
                        TOKEN DISTRIBUTION
                    </h2>
                    <p className="font-['arial'] text-white text-[15px] font-light text-gray-300 max-w-sm text-center mb-10 leading-relaxed">
                        A balanced allocation model designed to prioritize ecosystem growth, long-term alignment, and platform sustainability.
                    </p>

                    {/* Pie Chart Setup - Reused Logic, Scaled for Mobile */}
                    <div className="relative w-[280px] h-[280px] mb-12">
                        <svg viewBox="0 0 366.5 366.5" className="w-full h-full overflow-visible">
                            {(() => {
                                const CX = 183.25;
                                const CY = 183.25;
                                const R = 183;
                                const segmentsKey = [
                                    { start: 180, end: 270, color: '#D6E5A8' },   // Investors
                                    { start: 270, end: 442.8, color: '#C8FF80' }, // Community
                                    { start: 82.8, end: 136.8, color: '#9ACD32' },// Operations
                                    { start: 136.8, end: 180, color: '#78994D' }  // Team
                                ];
                                const rad = deg => (deg * Math.PI) / 180;

                                return segmentsKey.map((seg, i) => {
                                    const x1 = CX + R * Math.cos(rad(seg.start));
                                    const y1 = CY + R * Math.sin(rad(seg.start));
                                    const x2 = CX + R * Math.cos(rad(seg.end));
                                    const y2 = CY + R * Math.sin(rad(seg.end));
                                    const largeArc = (seg.end - seg.start) > 180 ? 1 : 0;
                                    const d = `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`;
                                    return <path key={i} d={d} fill={seg.color} stroke="none" />;
                                });
                            })()}

                            {/* Percentage Labels - Repositioned for Mobile */}
                            <text x="105" y="105" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial" fontSize="24" fill="#000" className="pointer-events-none font-bold">25%</text>
                            <text x="293" y="176" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial" fontSize="28" fill="#000" className="pointer-events-none font-bold">48%</text>
                            <text x="146" y="287" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial" fontSize="24" fill="#000" className="pointer-events-none font-bold">15%</text>
                            <text x="81" y="224" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial" fontSize="24" fill="#000" className="pointer-events-none font-bold">12%</text>
                        </svg>
                    </div>

                    {/* 2x2 Grid for Legend */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-8 w-full mb-10">
                        {/* 1. INVESTORS */}
                        <div className="flex flex-col items-start text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-[#D6E5A8] rounded-sm shrink-0"></div>
                                <h3 className="font-['GACCO'] text-[#fff] text-[15px] font-medium uppercase tracking-[0] leading-[100%]">INVESTORS</h3>
                            </div>
                            <p className="font-['arial'] text-gray-400 text-[15px] font-normal leading-[100%] tracking-[0]">
                                Combined allocation across strategic, private, and public funding rounds.
                            </p>
                        </div>

                        {/* 2. TEAM & ADVISORS */}
                        <div className="flex flex-col items-start text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-[#78994D] rounded-sm shrink-0"></div>
                                <h3 className="font-['GACCO'] text-[#fff] text-[15px] font-medium uppercase tracking-[0] leading-[100%]">TEAM & ADVISORS</h3>
                            </div>
                            <p className="font-['arial'] text-gray-400 text-[15px] font-normal leading-[100%] tracking-[0]">
                                Core contributors and advisors, subject to long-term vesting schedules.
                            </p>
                        </div>

                        {/* 3. OPERATIONS & NETWORK */}
                        <div className="flex flex-col items-start text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-[#9ACD32] rounded-sm shrink-0"></div>
                                <h3 className="font-['GACCO'] text-[#fff] text-[15px] font-medium uppercase tracking-[0] leading-[100%]">OPERATIONS & NETWORK</h3>
                            </div>
                            <p className="font-['arial'] text-gray-400 text-[15px] font-normal leading-[100%] tracking-[0]">
                                Platform operations, infrastructure, validator incentives, and network support.
                            </p>
                        </div>

                        {/* 4. COMMUNITY & ECOSYSTEM */}
                        <div className="flex flex-col items-start text-left">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-3 h-3 bg-[#C8FF80] rounded-sm shrink-0"></div>
                                <h3 className="font-['GACCO'] text-[#fff] text-[15px] font-medium uppercase tracking-[0] leading-[100%]">COMMUNITY & ECOSYSTEM</h3>
                            </div>
                            <p className="font-['arial'] text-gray-400 text-[15px] font-normal leading-[100%] tracking-[0]">
                                Rewards, incentives, ecosystem growth, and user participation programs.
                            </p>
                        </div>
                    </div>

                    {/* Footer Text & Button */}
                    <p className="font-['arial'] text-gray-500 text-[11px] text-center mb-6 leading-relaxed max-w-[280px] mx-auto">
                        Detailed allocation breakdown and vesting schedules are available in the Resilution Litepaper.
                    </p>

                    <button className="font-['arial'] flex items-center justify-center gap-2 bg-[#C8FF80] text-black w-full max-w-[280px] py-3 rounded text-[13px] font-bold hover:bg-[#b0e660] transition-colors uppercase mx-auto">
                        <span className="text-lg">📄</span> Resilution Litepaper
                    </button>
                </div>
            </section>

            {/* ═══════════════════ ROADMAP ═══════════════════ */}
            {/* ═══════════════════ ROADMAP ═══════════════════ */}
            {/* ═══════════════════ ROADMAP (DESKTOP) ═══════════════════ */}
            <section id="roadmap" className="hidden md:block relative overflow-hidden bg-[#F5F5F0] w-full" style={{ height: '800px' }}>

                <div className="relative max-w-[1440px] mx-auto h-full">
                    {/* Header: PRODUCT ROADMAP */}
                    <div className="absolute" style={{ top: '120px', left: '80px', width: '520px', height: 'auto' }}>
                        <h2 className="text-black uppercase" style={{ fontFamily: 'GACCO', fontWeight: 500, fontSize: '36px', lineHeight: '130%', letterSpacing: '0%' }}>
                            PRODUCT <span className="bg-[#C8FF80] px-3 py-1">ROADMAP</span>
                        </h2>
                    </div>

                    {/* Subtext */}
                    <div className="absolute" style={{ top: '185px', left: '80px', width: '412px' }}>
                        <p className="text-gray-600 text-left" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>
                            Our phased development plan focuses on building a transparent, scalable, and community-driven investment ecosystem.
                        </p>
                    </div>

                    {/* Phases Container */}
                    <div className="absolute w-full" style={{ top: '314px' }}>
                        {/* Horizontal Line and Nodes Overlay (Visual) - Starts from Phase 1 center and extends to match the Phase 4 text width */}
                        <div className="absolute top-[50px] bg-[#C8FF80] z-0 opacity-50" style={{ left: '90px', width: '1170px', height: '1px' }}></div>

                        {/* 4 Columns */}
                        <div className="relative z-10">
                            {roadmapPhases.map((phase, i) => {
                                // Calculate left position: 80, 380, 680, 980
                                // Spacing set to 300px between nodes
                                const leftPos = 80 + (i * 300);

                                return (
                                    <div key={i} className="absolute top-0 flex flex-col items-start" style={{ left: `${leftPos}px`, width: '280px' }} data-aos="fade-up" data-aos-delay={i * 150}>

                                        {/* Phase Label */}
                                        <span className="uppercase text-gray-400 mb-4 tracking-widest" style={{ fontFamily: 'Arial', fontSize: '12px', fontWeight: 600, lineHeight: '24px' }}>
                                            {phase.phase}
                                        </span>

                                        {/* Node / Marker - Updated to Ring + Dot style aligned with line */}
                                        <div className="relative mb-6 flex items-center justify-center" style={{ width: '20px', height: '20px' }}>
                                            <div className="w-5 h-5 rounded-full border border-[#C8FF80] bg-[#F5F5F0] flex items-center justify-center z-10">
                                                <div className="w-2 h-2 rounded-full bg-[#C8FF80]"></div>
                                            </div>
                                        </div>

                                        {/* Header */}
                                        <h3 className="text-black uppercase mb-4" style={{ fontFamily: 'GACCO', fontWeight: 400, fontSize: '20px', lineHeight: '130%' }}>
                                            {phase.title}
                                        </h3>

                                        {/* List */}
                                        <ul className="space-y-2">
                                            {phase.items.map((item, j) => (
                                                <li key={j} className="text-gray-600 flex items-start" style={{ fontFamily: 'Arial', fontWeight: 400, fontSize: '16px', lineHeight: '150%' }}>
                                                    <span className="mr-2">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ ROADMAP (MOBILE) ═══════════════════ */}
            <section id="roadmap-mobile" className="block md:hidden bg-[#F5F5F0] py-12 px-4 w-full">
                <div className="text-center mb-10">
                    <h2 className="font-['GACCO'] text-[15px] font-medium uppercase text-black mb-4">
                        PRODUCT <span className="font-['GACCO'] bg-[#C8FF80] px-2 py-0.5">ROADMAP</span>
                    </h2>
                    <p className="font-['arial'] text-gray-600 text-[15px] font-light text-center leading-relaxed">
                        Our phased development plan focuses on building a transparent, scalable, and community-driven investment ecosystem.
                    </p>
                </div>

                <div className="flex flex-col gap-8 relative ml-8 pl-0">
                    {/* Vertical Line - Starts from Phase 1 node center and ends at Phase 4 node center */}
                    <div className="absolute left-0 top-[12px] bottom-[120px] w-[1px] bg-[#C8FF80] z-0"></div>

                    {roadmapPhases.map((phase, i) => (
                        <div key={i} data-aos="fade-up" data-aos-delay={i * 100} className="relative pl-10">
                            {/* Node / Marker - Updated to Ring + Dot style aligned with vertical line */}
                            <div className="absolute -left-[10px] top-[2px] w-5 h-5 rounded-full border border-[#C8FF80] bg-[#F5F5F0] flex items-center justify-center z-10">
                                <div className="w-2 h-2 rounded-full bg-[#C8FF80]"></div>
                            </div>

                            <span className="font-['arial'] uppercase text-gray-400 mb-2 tracking-widest block text-xs font-bold" style={{ lineHeight: '20px' }}>
                                {phase.phase}
                            </span>
                            <h3 className="font-['GACCO'] text-black uppercase mb-3 text-lg font-bold">
                                {phase.title}
                            </h3>
                            <ul className="space-y-2">
                                {phase.items.map((item, j) => (
                                    <li key={j} className="font-['arial'] text-gray-600 flex items-start text-sm leading-tight">
                                        <span className="mr-2 text-[#C8FF80]">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════════════ COMMUNITY ═══════════════════ */}
            {/* ═══════════════════ COMMUNITY ═══════════════════ */}
            {/* ═══════════════════ COMMUNITY (DESKTOP) ═══════════════════ */}
            <section id="community" className="hidden md:block bg-black relative overflow-hidden w-full" style={{ height: '775px' }}>

                <div className="relative max-w-[1440px] mx-auto h-full">
                    {/* Header */}
                    <div className="absolute" style={{ top: '56px', left: '80px', width: '549px', height: 'auto' }}>
                        <h2 className="font-['GACCO'] uppercase text-[#C8FF80]" style={{ fontWeight: 500, fontSize: '36px', lineHeight: '42px', letterSpacing: '0%' }}>
                            JOIN THE RESILUTION COMMUNITY
                        </h2>
                    </div>

                    {/* Subtext */}
                    <div className="absolute" style={{ top: '161px', left: '80px', width: '679px', height: 'auto' }}>
                        <p className="text-white" style={{ fontFamily: 'arial', fontWeight: 400, fontSize: '24px', lineHeight: '100%', letterSpacing: '0%' }}>
                            Be part of a growing ecosystem shaping the future of transparent blockchain investment.
                        </p>
                    </div>

                    {/* Join Button */}
                    <button className="font-['GACCO'] absolute bg-[#C8FF80] text-black px-6 py-3 rounded hover:bg-[#b0e660] transition-colors" style={{ top: '56px', right: '73.5px', fontWeight: 500, fontSize: '16px' }}>
                        Join Community
                    </button>

                    {/* Big R Graphic (Union.svg) */}
                    <div className="absolute pointer-events-none" style={{ bottom: '0px', left: '73.5px', width: '447px', height: '421px' }}>
                        <img src="/homepage_assets/Union.svg" alt="Resilution R" className="w-full h-full object-contain" style={{ opacity: 1 }} />
                    </div>

                    {/* Card 1: Community Channels */}
                    <div data-aos="fade-up" className="absolute flex flex-col items-start p-8 card-hover-light"
                        style={{
                            top: '400px',
                            left: '685px',
                            width: '310px',
                            height: '290px',
                            borderRadius: '6px',
                            background: '#FBF5F5',
                            border: '1px solid rgba(0,0,0,0.1)'
                        }}>
                        {/* Icon */}
                        <div className="mb-6">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#C8FF80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#C8FF80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#C8FF80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.01 6.11683 19.01 7.005C19.01 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#C8FF80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="font-['GACCO'] text-black text-lg font-medium mb-4">Community Channels</h3>
                        <p className="font-['arial'] text-gray-600 text-sm leading-relaxed">
                            Connect with other users, businesses, and investors through our official community platforms.
                        </p>
                    </div>

                    {/* Card 2: Platform Updates */}
                    <div data-aos="fade-up" data-aos-delay="150" className="absolute flex flex-col items-start p-8 card-hover-light"
                        style={{
                            top: '400px',
                            left: '1025px',
                            width: '310px',
                            height: '290px',
                            borderRadius: '6px',
                            background: '#FBF5F5',
                            border: '1px solid rgba(0,0,0,0.1)'
                        }}>
                        {/* Icon */}
                        <div className="mb-6">
                            <img src="/homepage_assets/Page-1.svg" alt="Platform Updates Icon" className="w-[40px] h-[40px]" />
                        </div>
                        <h3 className="font-['GACCO'] text-black text-lg font-medium mb-4">Platform Updates</h3>
                        <p className="font-['arial'] text-gray-600 text-sm leading-relaxed">
                            Get the latest news, feature launches, and ecosystem progress directly from Resilution.
                        </p>
                    </div>

                </div>
            </section>

            {/* ═══════════════════ COMMUNITY (MOBILE) ═══════════════════ */}
            <section id="community-mobile" className="block md:hidden bg-black py-16 px-4 w-full">
                <div className="text-center mb-10">
                    <h2 className="font-['GACCO'] text-[15px] font-medium uppercase text-[#C8FF80] mb-4">
                        JOIN THE RESILUTION COMMUNITY
                    </h2>
                    <p className="font-['arial'] text-white text-[15px] font-light text-center leading-relaxed mb-8">
                        Be part of a growing ecosystem shaping the future of transparent blockchain investment.
                    </p>
                    <button className="font-['GACCO'] bg-[#C8FF80] text-black px-8 py-3 rounded hover:bg-[#b0e660] transition-colors font-medium">
                        Join Community
                    </button>
                </div>

                <div className="flex flex-col gap-6">
                    {/* Card 1: Community Channels */}
                    <div data-aos="fade-up" className="bg-[#FBF5F5] p-6 rounded-lg card-hover-light">
                        <div className="mb-4">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#C8FF80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#C8FF80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#C8FF80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.01 6.11683 19.01 7.005C19.01 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#C8FF80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h3 className="font-['GACCO'] text-black text-lg font-bold mb-2">Community Channels</h3>
                        <p className="font-['arial'] text-gray-600 text-sm leading-relaxed">
                            Connect with other users, businesses, and investors through our official community platforms.
                        </p>
                    </div>

                    {/* Card 2: Platform Updates */}
                    <div data-aos="fade-up" data-aos-delay="100" className="bg-[#FBF5F5] p-6 rounded-lg card-hover-light">
                        <div className="mb-4">
                            <img src="/homepage_assets/Page-1.svg" alt="Platform Updates Icon" className="w-[32px] h-[32px]" />
                        </div>
                        <h3 className="font-['GACCO'] text-black text-lg font-bold mb-2">Platform Updates</h3>
                        <p className="font-['arial'] text-gray-600 text-sm leading-relaxed">
                            Get the latest news, feature launches, and ecosystem progress directly from Resilution.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════ FAQ ═══════════════════ */}
            <section className="bg-white text-black py-24 w-full" id="faq">
                <div className="max-w-[1000px] mx-auto px-4 md:px-16">
                    <h2 data-aos="fade-up" className="font-['GACCO'] text-left uppercase mb-20" style={{ fontSize: '36px', lineHeight: '42px', fontWeight: 500 }}>Frequently Asked Questions</h2>
                    <div className="space-y-0">
                        {faqs.map((faq, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 50} className="border-b border-gray-200">
                                <button className="w-full flex justify-between items-center py-8 text-left focus:outline-none group" onClick={() => toggleFaq(index)}>
                                    <h3 className="font-['Arial'] font-medium pr-8" style={{ fontSize: '20px', lineHeight: '28px' }}>{faq.question}</h3>
                                    <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[200px] opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}>
                                    <p className="font-['arial'] text-gray-500 font-normal leading-relaxed" style={{ fontSize: '16px', maxWidth: '800px' }}>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════ FOOTER ═══════════════════ */}
            <Footer />

        </div >
    );
};

export default NewHome;
