import React, { useEffect, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import style from "./home.module.css"
import Marquee from "react-fast-marquee";
import { Link, useSearchParams } from 'react-router-dom';
import { trackMetaEvent } from "../../utils/metaPixelTracking";

/* https://prod.spline.design/KCsPFYpldBZIJ4sy/scene.splinecode
page Landing -> A New Paradigm of Blockchain Transparency */

/*https://prod.spline.design/2g0IQbUKbYsDAUMq/scene.splinecode
Who we are -> Hero section*/


export const Home = () => {

    const [accr, setAccr] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const [vdState, setVdState] = useState(false)
    const vdRef = useRef()

    const acr = (e) => {
        const target = e.target.dataset.class
        let parent = document.querySelector(`.${target}`)
        let child1 = parent.querySelectorAll("div")[0]
        let child2 = parent.querySelectorAll("div")[1]
        if (parent.clientHeight >= child1.clientHeight + 5) {
            parent.style.height = `${child1.clientHeight}px`
            parent.classList.remove("show");
        } else {
            parent.style.height = `${child1.clientHeight + child2.clientHeight}px`
            parent.classList.add("show");

        }
    }

    const acrLoad = () => {
        const elems = document.querySelectorAll(".accrparent>div")
        elems.forEach((item, i) => {
            let child = item.querySelectorAll("div");
            if (i === 0) {
                item.style.height = `${item.clientHeight}px`
            } else {
                item.style.height = `${child[0].clientHeight}px`
            }

        })
    }
    const mover = () => {
        const target = document.querySelector("#paradigm").offsetTop
        window.scroll(0, target)
    }
    const playPause = () => {
        let vd = vdRef.current
        vdRef.current.addEventListener('pause', ()=>{
            // console.log("video pushed")
            setVdState(false)
        });
        
        if (vd.paused) {
            vd.play()
            vd.loop = true
            setVdState(true)
        } else {
            vd.pause()
            setVdState(false)
        }
    }



    useEffect(() => {
        let vd = document.querySelector(".video1")
        vd.muted = true;
        vd.play()
        if (searchParams.get("_ks") === "xerjkea_erakf") {
            mover()
        }

    }, [])

    return (
        <>
            <section className='flex items-center relative overflow-hidden'>
                <div className='sm:container mx-auto flex max-sm:gap-10 max-sm:flex-col justify-between sm:py-10 lg:py-20'>
                    <div className='sm:w-[55%] xl:pl-10 pl-5 xl:pr-20 max-sm:py-10 max-sm:px-3'>
                        <h1 className='text-3xl vs:text-4xl lg:text-5xl 2xl:text-6xl leading-[1.5em] font-[macro]' data-aos="fade-down"><span className='bg-(--savegreen) p-3' >Financial</span> Freedom for All</h1>
                        {/* <p className='my-7 sx:my-9 lg:text-xl text-[#5C5C5C]' data-aos="fade-up">
                            Resilution transforms investment by <strong>empowering consumers to fund businesses </strong> directly through blockchain. Our decentralized platform eliminates barriers, allowing businesses to raise capital <strong>with full transparency,</strong> while investors earn <strong>air and secure returns in $RESIL tokens.</strong>
                            <br /> <br />
                            With <strong>real-time CRM integration,</strong> investors stay informed with <strong>live updates on funding progress, performance metrics, and profitability.</strong> This ensures <strong>seamless transactions, accountability, and trust,</strong> making investment accessible to all.
                        </p> */}
                        <p className='my-7 sx:my-9 lg:text-xl text-[#5C5C5C]'>Resilution transforms investment by allowing consumers to fund businesses directly through blockchain. Businesses can raise capital with transparent terms, while investors earn returns in RESIL tokens. Integrated CRM ensures real-time updates on investments, making the process seamless and secure. </p>
                        <div className='flex gap-3 vs:gap-7 mt-15 sx:mt-25'>
                            <a
                            href="https://discord.com/invite/KG5WKCnkWW"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackMetaEvent("GetStartedClick", { location: "home_hero" })}
                            >
                            <button className='bg-(--savegreen) px-5 vs:px-8 py-2 g_hover'>Get Started</button>
                            </a>
                            <a href="/resilution-whitepaper.pdf" target='_blank'>
                                <button className='bg-(--dark) px-5 vs:px-8 py-2 text-(--light) b_hover'>Learn More</button>
                            </a>
                        </div>
                    </div>
                    <div className='mt-[-1px] flex justify-center sm:justify-end item-center sm:w-[45%] py-10 max-sm:relative' >
                        <img src="/assets/logo.svg" loading="lazy" className={style.logo + ' w-[70%] mix-blend-difference'} alt="" />
                        {/* <img src="/assets/hero.webp" loading="lazy" className={' absolute -z-1 top-0 right-0 w-[100%] sm:w-[45%] h-[100%]'} data-aos='fade-up' alt="" /> */}
                        <video loop autoPlay muted playsInline preload='none' className={style.video + ' absolute -z-1 top-0 sm:left-[60%] xl:left-[50%] min-w-[600px] vs:max-sm:min-w-[882px] sm:max-xl:min-w-[1580px] xl:max-2xl:min-w-[120%] 2xl:w-[110%] xl:h-[100%] video1'}>
                            <source src="/assets/video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {/* <img src="/assets/logo.svg" className='absolute top-[50%] left-[50%] translate-[-50%] w-[70%] mix-blend-difference' alt="" /> */}
                    </div>
                </div>
                <div className='absolute w-[10px] h-[100%] bg-[#929BA3] hidden sm:block'></div>
            </section>

            <section className='bg-(--dark) overflow-hidden'>
                <div className='relative sm:container mx-auto xl:px-10 pt-15'>
                    <video playsInline ref={vdRef} controls className='m-auto'>
                        <source src='/assets/resilution-borderless-transparent-funding-community.mp4' />
                    </video>
                    {!vdState && <div className='flex w-[100%] h-[100%] gap-2 vs:gap-3 sm:gap-5 justify-center items-center text-white absolute bottom-0 left-[50%] translate-x-[-50%]' style={{ background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)' }}>
                        <p className='vs:text-xl sx:text-2xl sm:text-3xl font-[macro]'>RESILUTION</p>
                        <button className='w-10 vs:w-15 sx:w-20 h-10 vs:h-15 sx:h-20 flex justify-center items-center rounded-full bg-black' onClick={playPause}>
                            {!vdState ? <svg xmlns="http://www.w3.org/2000/svg" className='max-vs:w-5 vs:max-sx:w-10 max-vs:h-5 vs:max-sx:h-10' height="60px" viewBox="0 -960 960 960" width="60px" fill="#FFFFFF">
                                <path d="M320-200v-560l440 280-440 280Z" />
                            </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" className='max-vs:w-5 vs:max-sx:w-10 max-vs:h-5 vs:max-sx:h-10' height="60px" viewBox="0 -960 960 960" width="60px" fill="#fff">
                                    <path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z" />
                                </svg>}
                        </button>
                        <p className='vs:text-xl sx:text-2xl sm:text-3xl font-[macro]'>EXPLAINED</p>

                        <a href='#' className='absolute bottom-5 left-[50%] translate-[-50%] text-[#B9B9B9]'>Watch Full Video</a>
                    </div>}
                </div>
                <div className='sm:container mx-auto xl:px-10 py-10 max-sm:px-3'>
                    <h2 className='text-(--light) font-[macro] text-2xl vs:text-3xl lg:text-4xl 2xl:text-5xl text-center vs:mt-10 sm:mt-20 tracking-[0.06em] leading-[1.4em]' data-aos="fade-up">
                        WHY TRADITIONAL INVESTMENT SYSTEMS FALL SHORT
                    </h2>
                    <p className='text-[#B9B9B9] text-base sm:text-xl sm:w-[80%] lg:w-[70%] mx-auto text-center mt-5' data-aos="fade-up">
                        {/* Traditional markets are <strong>restrictive, inefficient, and lack transparency</strong>. Businesses struggle with <strong>limited access to capital,</strong> while investors face <strong>high fees and opaque reporting </strong> */}
                        Traditional markets are restrictive, inefficient, and lack transparency. Resilution decentralizes investment, making funding accessible and transparent for all.
                    </p>
                    {/* <div className='flex gap-7 justify-center mt-10 sm:mt-15'>
                        <button className='bg-(--savegreen) px-5 vs:px-8 py-2 g_hover'>Get Started</button>
                        <a href="/resilution-whitepaper.pdf" target='_blank'>
                            <button className='bg-(--light) px-5 vs:px-8 py-2 text-(--dark) w_hover'>Learn More</button>
                        </a>
                    </div> */}
                    <div className='flex flex-wrap md:flex-nowrap justify-center gap-5 mt-10 sm:mt-25'>
                        <div className='bg-(--light) p-3 lg:p-9 relative w-[100%] sm:w-[48%] md:w-[33%] gr_card' data-aos="fade-right">
                            <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Over centralization</p>
                            <p className='mt-5 leading-[20px]'>Traditional investment markets are dominated by a few powerful entities, limiting opportunities for small investors and businesses. Resilution decentralizes investment, ensuring fair access for all. </p>
                            <span className='bg-[#D0D0D0] p-2 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] flex justify-center items-center absolute top-0 translate-y-[-30%]'>
                                <img src="/icons/cross.svg" loading="lazy" width="13px" height="15px" alt="" />
                            </span>
                        </div>
                        <div className='bg-(--light) p-3 lg:p-9 relative w-[100%] sm:w-[48%] md:w-[33%] gr_card' data-aos="fade-up">
                            <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Lack of Transparency</p>
                            <p className='mt-5 leading-[20px]'>Centralized markets often suffer from hidden deals and manipulation. With Resilution’s blockchain-based ecosystem, all transactions are transparent, traceable, and tamper-proof.</p>
                            <span className='bg-[#D0D0D0] p-2 absolute top-0 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] translate-y-[-30%] flex justify-center items-center'>
                                <img src="/icons/cross.svg" loading="lazy" width="13px" height="15px" alt="" />
                            </span>
                        </div>
                        <div className='bg-(--light) p-3 lg:p-9 relative w-[100%] sm:w-[48%] md:w-[33%] gr_card' data-aos="fade-left">
                            <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>High Entry Barriers</p>
                            <p className='mt-5 leading-[20px]'>Strict regulations, high capital requirements, and complex processes prevent many from investing. Resilution eliminates these barriers, allowing anyone to participate with ease.</p>
                            <span className='bg-[#D0D0D0] p-2 absolute top-0 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] translate-y-[-30%] flex justify-center items-center'>
                                <img src="/icons/cross.svg" loading="lazy" width="13px" height="15px" alt="" />
                            </span>
                        </div>
                    </div>
                    <h3 className='flex max-md:flex-col justify-center items-center font-[macro] text-(--light) gap-3 sx:gap-5 text-2xl sx:text-3xl md:text-4xl mt-20 font-400 tracking-[0.06em]' data-aos="fade-up">
                        <span> The</span>
                        <div className='bg-(--savegreen) text-(--dark) flex items-center gap-3 sm:gap-5 px-4.5 py-3.5 sx:px-5 sx:py-4'>
                            <img src="/logo2.svg" loading="lazy" className='max-vs:hidden w-[30px] sx:w-[35px] sm:w-[40px]' alt="" />
                            <span className='text-base sx:text-xl sm:text-2xl tracking-[0.06em] sm:tracking-[0.2em] text-center mb-[-5px]'>Resilution ADVANTAGE</span>
                        </div>
                    </h3>
                    <div className='flex flex-wrap md:flex-nowrap justify-center gap-5 mt-15'>
                        <div className='bg-(--light) p-3 lg:p-9 relative w-[100%] sm:w-[48%] md:w-[33%] g_card' data-aos="fade-right">
                            <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Trust & Transparency</p>
                            <p className='mt-5 leading-[20px]'>Resilution ensures a decentralized and transparent investment ecosystem. Every transaction is recorded on the blockchain, eliminating manipulation and fostering trust between businesses and investors.</p>
                            <span className='bg-(--savegreen) px-2 py-2.5 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                                <img src="/icons/check.svg" loading="lazy" width='19px' height="15px" alt="" />
                            </span>
                        </div>
                        <div className='bg-(--light) p-3 lg:p-9 relative w-[100%] sm:w-[48%] md:w-[33%] g_card' data-aos="fade-up">
                            <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Fair Profit Distribution</p>
                            <p className='mt-5 leading-[20px]'>Investors receive fair returns based on their contributions, with profits distributed through smart contracts. This removes the risk of insider manipulation and ensures equitable earnings.</p>
                            <span className='bg-(--savegreen) px-2 py-2.5 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                                <img src="/icons/check.svg" loading="lazy" width='19px' height="15px" alt="" />
                            </span>
                        </div>
                        <div className='bg-(--light) p-3 lg:p-9 relative w-[100%] sm:w-[48%] md:w-[33%] g_card' data-aos="fade-left">
                            <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Sustainable Economy</p>
                            <p className='mt-5 leading-[20px]'>By lowering barriers to entry and integrating real-time data with investment opportunities, Resilution fosters a dynamic and inclusive economy, empowering both businesses and investors.</p>
                            <span className='bg-(--savegreen) px-2 py-2.5 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                                <img src="/icons/check.svg" loading="lazy" width='19px' height="15px" alt="" />
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            <section className='relative z-1 overflow-hidden' id="paradigm" style={{ background: " linear-gradient(180deg, #929BA3 23.74%, #373A3D 103.28%)" }}>
                <div className='sm:container mx-auto py-10 xl:p-10 max-sm:px-3 overflow-hidden '>
                    <h2 className='text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl mt-10 text-center font-[macro] tracking-[0.06em] text-(--light) lg:leading-[55px] 2xl:leading-[60px]' data-aos="fade-up">A New Paradigm of Blockchain Transparency</h2>
                    <p className='text-center text-base md:text-xl text-(--light) sm:w-[90%] lg:w-[70%] mx-auto mt-5' data-aos="fade-up">
                        Resilution redefines investment by decentralizing funding and ensuring full transparency. Built on the VALUE blockchain, it empowers businesses to raise capital securely while allowing consumers to invest with confidence through verifiable, trustless transactions.
                    </p>
                    <div className='flex flex-col lg:flex-row xl:gap-15 mt-20 justify-between'>
                        <div className='bg-(--dark) p-5 xl:p-8 xl:pt-10 relative z-1 lg:w-[362px] lg:min-h-[327px] 2xl:w-[400px]  text-(--light) hover:bg-(--light) hover:text-(--dark) flex flex-col justify-between' style={{ transition: ".4s ease" }} data-aos="fade-right">
                            <p className='font-[macro] xl:text-xl tracking-[0.06em]'>Retail Investors: Invest Through Resilution</p>
                            <p className='text-base vs:text- py-10 leading-[20px]'>Resilution provides retail investors with a seamless platform to invest in businesses securely and transparently. By leveraging blockchain-powered smart contracts, investors can access curated opportunities with reduced risks and no intermediaries. </p>
                            <a href="https://form.typeform.com/to/yHgU8wvD" target='_blank'>
                                <button className='py-2 w-[100%] bg-(--savegreen) g_hover text-(--dark)'>Get Started</button>
                            </a>
                            <img src="/assets/shap2.svg" loading="lazy" className='absolute top-[99%] lg:top-5 max-sx:left-0 sx:right-[65%] max-lg:scale-y-[-1] lg:right-0 lg:translate-x-[100%] 2xl:w-[185px]' alt="" />
                        </div>
                        <div className='flex justify-center items-center w-[100%] lg:w-[40%] xl:w-[30%] h-80 2xl:h-92 overflow-visible' >
                            <div className={style.scene + " relative -z-1"}>
                                <Spline scene='https://prod.spline.design/KCsPFYpldBZIJ4sy/scene.splinecode' />
                            </div>
                        </div>
                        <div className='bg-(--dark) p-5 xl:p-8 xl:pt-10 relative lg:w-[362px] lg:min-h-[327px] 2xl:w-[400px]  text-(--light) hover:bg-(--light) hover:text-(--dark) flex flex-col justify-between' style={{ transition: ".4s ease" }} data-aos="fade-left">
                            <p className='font-[macro] xl:text-xl tracking-[0.06em]'>Business Owners: Get Investment Through Resilution </p>
                            <p className='text-base vs:text- py-10 leading-[20px]'>Resilution helps business owners secure funding by connecting them with investors in a decentralized and trustless environment. Through smart contracts, entrepreneurs can raise capital efficiently, ensuring security and transparency at every step.</p>
                            <a href="https://form.typeform.com/to/STkYgYkb" target='_blank'>
                                <button className='py-2 w-[100%] bg-(--savegreen) g_hover text-(--dark)'>Get Started</button>
                            </a>
                            <img src="/assets/shap2.svg" loading="lazy" className='absolute lg:top-[50%] top-1 right-0 sx:left-[65%] sm:left-[63%] lg:left-3 translate-y-[-100%] lg:translate-x-[-100%] scale-x-[-1] 2xl:w-[185px] -z-1' alt="" />
                        </div>
                    </div>
                    <div className='lg:flex gap-5 xl:gap-5 justify-between items-center bg-(--dark) text-(--light) p-5 xl:p-10 mt-10 relative hover:bg-(--light) hover:text-(--dark)' style={{ transition: ".4s ease" }}>
                        <p className='text-xl xl:text-2xl font-[macro] lg:w-[30%] xl:w-[30%] tracking-[0.06em]'>VCs & Corporate Investors: Invest in Resilution</p>
                        <p className='vs:text-xl  lg:w-[50%] max-lg:my-4 leading-[26px]'>Resilution provides venture capitalists and corporate investors with an innovative platform to invest in high-potential businesses. With self-executing agreements, institutional investors can fund opportunities with minimized risk and maximum efficiency. </p>
                        <a href="https://form.typeform.com/to/jUbagOpZ" target='_blank'>
                            <button className='py-2 px-5 lg:px-10 bg-(--savegreen) text-(--dark) max-lg:w-[100%] g_hover'>Get Started</button>
                        </a>
                        <img src="/assets/shap3.svg" className='absolute hidden lg:inline top-0 left-[33%] 2xl:left-[35%] translate-y-[-100%] 2xl:w-[100px]' loading="lazy" alt="" />
                    </div>
                    <div className='p-5 xl:p-10 mt-5 bg-(--light)'>
                        <h3 className='font-[macro] text-xl lg:text-2xl tracking-[0.06em]'>Industry Impacts</h3>
                        <div className='flex flex-col md:flex-row mt-5 xl:mt-10'>
                            <div className='flex gap-3 vs:gap-5 lg:gap-5 md:pr-5 lg:pr-10 max-md:border-b-2 md:border-r-2 border-gray-300 max-md:pb-3 items-center'>
                                <img src="/icons/trend.svg" width="33px" height="21px" alt="" loading="lazy" />
                                <p className='max-vs:leading-[20px] vs:text-xl xl:text-2xl'><strong>$12B+</strong> in decentralized investments processed through blockchain-powered marketplaces.</p>
                            </div>
                            <div className='flex gap-3 vs:gap-5 lg:gap-5 md:pl-5 lg:pl-10 max-md:pt-3 items-center'>
                                <img src="/icons/trend.svg" width="33px" height="21px" alt="" loading="lazy" />
                                <p className='max-vs:leading-[20px] vs:text-xl xl:text-2xl'><strong>20%+</strong> increase in investor trust and engagement with transparent, on-chain financial models.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="/assets/shap.svg" className='absolute bottom-0 left-0 -z-2 w-[100%]' loading="lazy" alt="" />
            </section>

            <section className='py-10 relative overflow-hidden'>
                <div className='sm:container mx-auto xl:px-10 sm:flex gap-0 lg:gap-10 max-sm:px-3'>
                    <div className='sm:w-[60%] lg:w-[50%] pt-5 xl:pt-10'>
                        <div>
                            <div className='inline-flex items-end gap-3 px-4.5 py-3.5 bg-(--savegreen) mb-5'>
                                <img src="/icons/logo-text.svg" width={"170px"} alt="" loading="lazy" />
                                {/* <span className='font-[macro] tracking-[0.06em]'>Resilution</span> */}
                            </div>
                            <h2 className='text-2xl vs:text-3xl lg:text-4xl xl:text-[40px] font-[macro] tracking-[0.06em] leading-[1.4em]' data-aos="fade-up">
                                Join the Future of Investment
                            </h2>
                            <p className='vs:text-xl text-[#5C5C5C] mt-5' data-aos="fade-up">
                                Resilution decentralizes investment, enabling businesses to raise funds transparently while giving consumers the power to invest directly in the products they believe in.
                            </p>
                        </div>
                        <div className='mt-10 xl:mt-15'>
                            <div>
                                <div className='flex gap-3 items-center'>
                                    <img src="/icons/check.svg" className='bg-(--savegreen) px-2 py-2.5 max-vs:w-[30px]' loading="lazy" alt="" />
                                    <p className='text-2xl vs:text-3xl font-[600]' data-aos="fade-up">Accessible</p>
                                </div>
                                <p className='text-xl opacity-60 mt-5'>
                                    Anyone can participate—invest in businesses with flexible options using credits or RESIL tokens.
                                </p>
                            </div>
                            <div className='mt-5 xl:mt-10'>
                                <div className='flex gap-3 items-center'>
                                    <img src="/icons/check.svg" className='bg-(--savegreen) px-2 py-2.5 max-vs:w-[30px]' loading="lazy" alt="" />
                                    <p className='text-2xl vs:text-3xl font-[600]' data-aos="fade-up">Transparent</p>
                                </div>
                                <p className='text-xl opacity-60 mt-5'>
                                    Every investment, profit share, and transaction is verifiable on the VALUE blockchain.
                                </p>
                            </div>
                            <div className='mt-5 xl:mt-10'>
                                <div className='flex gap-3 items-center'>
                                    <img src="/icons/check.svg" className='bg-(--savegreen) px-2 py-2.5 max-vs:w-[30px]' loading="lazy" alt="" />
                                    <p className='text-2xl vs:text-3xl font-[600]' data-aos="fade-up">Community-Driven</p>
                                </div>
                                <p className='text-xl opacity-60 mt-5'>
                                    Empowering businesses and investors to collaborate, ensuring fair profit distribution and sustainable growth.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='sm:w-[40%] lg:w-[50%] max-sm:mt-5'>
                        <img src="/assets/home2.webp" className={style.imganim + ' sm:absolute right-0 sm:w-[40%] '} style={{ height: "calc(100% - 5rem)" }} data-aos="fade-left" loading="lazy" alt="" />
                    </div>
                </div>
            </section>

            <section className='py-10 bg-(--dark) overflow-hidden'>
                <div className='sm:container xl:px-10 mx-auto my-5 xl:my-20 max-sm:px-3'>
                    <h2 className='text-[22px] vs:text-2xl sx:text-3xl lg:text-[40px] 2xl:text-5xl font-[macro] tracking-[0.06em] text-(--light) text-center xl:w-[80%] leading-[1.4em] mx-auto' data-aos="fade-up">
                        Be a Part of the Next Investment Revolution
                    </h2>
                    <p className='sx:text-xl mx-auto text-[#B9B9B9] mt-5 w-[100%] sm:w-[80%] lg:w-[70%] xl:w-[70%] text-center' data-aos="fade-up">
                        Resilution disrupts traditional investment by decentralizing funding and enabling direct participation in business growth. Built on the VALUE blockchain, it fosters a transparent, secure, and accessible financial ecosystem.
                    </p>
                    <div className='flex max-md:flex-wrap justify-center  gap-5 mt-10 sx:mt-20 pb-10'>
                        <div className='bg-(--light) p-3 lg:p-9 relative w-[100%] sm:w-[48%] md:w-[33%] g_card' data-aos="fade-right">
                            <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>For <br /> Businesses</p>
                            <p className='mt-5'>Pitch investment opportunities, raise funds transparently, and distribute profits seamlessly through smart contracts.</p>
                            <span className='bg-(--savegreen) px-2 py-2.5 absolute top-0 translate-y-[-30%] w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] flex justify-center items-center'>
                                <img src="/icons/check.svg" width='19px' loading="lazy" alt="" />
                            </span>
                        </div>
                        <div className='bg-(--light) p-3 lg:p-9 relative w-[100%] sm:w-[48%] md:w-[33%] g_card' data-aos="fade-up">
                            <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>For <br /> Investors</p>
                            <p className='mt-5'>Invest in businesses with flexible options using credits or RESIL tokens and track real-time returns.</p>
                            <span className='bg-(--savegreen) px-2 py-2.5 absolute top-0 translate-y-[-30%] w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] flex justify-center items-center'>
                                <img src="/icons/check.svg" width='19px' loading="lazy" alt="" />
                            </span>
                        </div>
                        <div className='bg-(--light) p-3 lg:p-9 relative w-[100%] sm:w-[48%] md:w-[33%] g_card' data-aos="fade-left">
                            <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>For <br /> Consumers</p>
                            <p className='mt-5'>Earn rewards while supporting businesses, with in-app exchanges and investment-backed incentives.</p>
                            <span className='bg-(--savegreen) px-2 py-2.5 absolute top-0 translate-y-[-30%] w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] flex justify-center items-center'>
                                <img src="/icons/check.svg" width='19px' loading="lazy" alt="" />
                            </span>
                        </div>
                    </div>
                </div>
                <div className='bg-(--savegreen)'>
                    <Marquee
                        pauseOnHover="true"
                        speed={150}
                    >
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" loading="lazy" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-4px]'>Trade with transparency</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" loading="lazy" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-4px]'>SECURE INVESTMENTS, TRUSTLESS TRADES</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" loading="lazy" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-4px]'>DECENTRALIZED FUNDING FOR ALL</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" loading="lazy" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-4px]'>EMPOWERING INVESTORS & BUSINESSES</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" loading="lazy" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-4px]'>BLOCKCHAIN-POWERED INVESTING</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" loading="lazy" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-4px]'>Trade with transparency</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" loading="lazy" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-4px]'>SECURE INVESTMENTS, TRUSTLESS TRADES</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" loading="lazy" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-4px]'>DECENTRALIZED FUNDING FOR ALL</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" loading="lazy" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-4px]'>EMPOWERING INVESTORS & BUSINESSES</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" loading="lazy" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-4px]'>BLOCKCHAIN-POWERED INVESTING</span>
                        </div>
                    </Marquee>
                </div>
            </section>

            <section className='sm:container md:px-25 mx-auto my-20 max-sm:px-3' id='faq'>
                <h2 className='text-2xl sx:text-3xl lg:text-[40px] font-[macro] 2xl:text-5xl tracking-[0.06em] text-center lg:w-[80%] mx-auto mt-20 sm:mt-40 leading-[1.4em]' data-aos="fade-up">Frequently Asked Questions (FAQ)</h2>
                <div className='mt-20 accrparent' onLoad={acrLoad}>

                    <div className={`${style.accr_elem} border-b-2 border-gray-200 mb-10 overflow-hidden acr1 show`}>
                        <div className='flex justify-between pb-5' onClick={acr} data-class="acr1">
                            <h4 className='vs:text-xl sx:text-2xl font-[700]' data-class="acr1">How is Resilution different from stock markets?</h4>
                            <img src="/icons/top-arrow.svg" data-class="acr1" alt="" loading="lazy" />
                        </div>
                        <div>
                            <p className='opacity-50 pb-5 vs:text-xl'>Resilution decentralizes investment by allowing consumers to fund real-world businesses directly, rather than engaging in speculative stock trading. Unlike traditional stock markets, it provides transparent funding opportunities where investors earn based on business performance.</p>
                        </div>
                    </div>
                    <div className={`${style.accr_elem} border-b-2 border-gray-200 mb-10 overflow-hidden acr2`}>
                        <div className='flex justify-between pb-5' onClick={acr} data-class="acr2">
                            <h4 className='vs:text-xl sx:text-2xl font-[700]' data-class="acr2">What blockchain does Resilution use?</h4>
                            <img src="/icons/top-arrow.svg" data-class="acr2" alt="" loading="lazy" />
                        </div>
                        <div>
                            <p className='opacity-50 pb-5 vs:text-xl'>Resilution is built on the <strong>VALUE blockchain</strong>, a scalable and decentralized ecosystem designed for seamless investments. The blockchain ensures trust, security, and efficiency by integrating smart contracts and transparent transaction tracking.</p>
                        </div>
                    </div>
                    <div className={`${style.accr_elem} border-b-2 border-gray-200 mb-10 overflow-hidden acr3`}>
                        <div className='flex justify-between pb-5' onClick={acr} data-class="acr3">
                            <h4 className='vs:text-xl sx:text-2xl font-[700]' data-class="acr3">Who can invest in businesses on Resilution?</h4>
                            <img src="/icons/top-arrow.svg" data-class="acr3" alt="" loading="lazy" />
                        </div>
                        <div>
                            <p className='opacity-50 pb-5 vs:text-xl'>Anyone can invest—Resilution removes traditional financial barriers, enabling individuals worldwide to support businesses using <strong>credits or RESIL</strong> tokens. The platform ensures accessibility while maintaining security through mandatory KYC verification.</p>
                        </div>
                    </div>
                    <div className={`${style.accr_elem} border-b-2 border-gray-200 mb-10 overflow-hidden acr4`}>
                        <div className='flex justify-between pb-5' onClick={acr} data-class="acr4">
                            <h4 className='vs:text-xl sx:text-2xl font-[700]' data-class="acr4">How can businesses benefit from Resilution?</h4>
                            <img src="/icons/top-arrow.svg" data-class="acr4" alt="" loading="lazy" />
                        </div>
                        <div>
                            <p className='opacity-50 pb-5 vs:text-xl'>Businesses gain <strong>direct access to funding</strong> without relying on banks or venture capitalists. They can pitch investment proposals, secure funding with clear profit-sharing terms, and build investor trust through real-time sales and performance tracking.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
