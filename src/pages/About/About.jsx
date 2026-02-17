import Spline from '@splinetool/react-spline'
import React from 'react'
import style from "./about.module.css"
import { Link } from 'react-router-dom'

export const About = () => {


    return (
        <>
            <section className='flex items-center relative overflow-hidden'>
                <div className='sm:container mx-auto flex flex-col lg:flex-row justify-between lg:py-20 sm:pt-20'>
                    <div className='lg:w-[55%] xl:pl-10 pl-5 xl:pr-20 max-sm:py-10 max-sm:px-3'>
                        <h1 className='text-4xl sm:text-5xl 2xl:text-6xl leading-[1.5em] font-[macro]' data-aos="fade-down"><span className='bg-(--savegreen) p-3'>Who we</span> <br /> Are</h1>
                        <p className='my-10 vs:mt-15 vs:mb-0 sm:text-xl text-[#5C5C5C]' data-aos="fade-up">
                            Resilution is a blockchain-powered investment platform that <strong>redefines financial participation</strong> by bridging the gap between businesses and everyday investors. Our mission is to <strong>create a fair, transparent, and decentralized ecosystem</strong> where anyone can invest in real-world businesses with confidence.
                        </p>
                        <p className='my-10 vs:my-5 sm:text-xl text-[#5C5C5C]' data-aos="fade-up">
                            We believe in <strong>financial inclusion,</strong> allowing investors to support brands they trust while ensuring <strong>secure, verifiable, and tamper-proof transactions.</strong> By leveraging blockchain technology and smart contracts, we eliminate middlemen, reduce investment risks, and enable <strong>real economic impact </strong> beyond speculation.
                        </p>
                        <p className='my-10 vs:my-5 vs:mb-15 sm:text-xl text-[#5C5C5C]' data-aos="fade-up">Join Resilution to <strong>invest in the future of business—</strong>where your money supports <strong>growth, innovation, and tangible success.</strong></p>
                        {/* <p className='my-10 vs:mb-15 vs:mt-0 sm:text-xl text-[#5C5C5C]' data-aos="fade-up">Join Resilution to <strong>invest in the future of business</strong>—where your money supports <strong>growth, innovation, and tangible success.</strong></p> */}
                        <div className='flex gap-5 vs:gap-7'>
                            <Link to="/?_ks=xerjkea_erakf">
                                <button className='bg-(--savegreen) px-5 vs:px-8 py-2 g_hover'>Get Started</button>
                            </Link>
                            <a href="/resilution-whitepaper.pdf" target='_blank'>
                                <button className='bg-(--dark) px-5 vs:px-8 py-2 text-(--light) b_hover'>Learn More</button>
                            </a>
                        </div>
                    </div>
                    <div className='max-lg:mt-10 flex justify-center items-center max-sx:w-[100vw] lg:w-[45%] py-10 max-h-[400px] sx:max-h-[500px] max-lg:relative max-sm:overflow-hidden'>
                        <div className={style.scene + ' min-h-[500px]'}>
                            <Spline scene='https://prod.spline.design/graT9nIIdUfrKwW0/scene.splinecode' />
                        </div>
                        <div className='absolute -z-1 top-0  sx:right-[50%] sx:max-lg:translate-x-[50%] lg:right-0 w-[100vw] lg:w-[45%] h-[100%] bg-(--dark)'></div>
                        {/* <img src="/assets/logo.svg" className='w-[70%] mix-blend-difference' alt="" /> */}
                        {/* <img src="/assets/hero4.webp" loading="lazy" className='absolute -z-1 top-0 right-0 w-[100%] sm:w-[45%] h-[100%]' alt="" /> */}
                        {/* <img src="/assets/logo.svg" className='absolute top-[50%] left-[50%] translate-[-50%] w-[70%] mix-blend-difference' alt="" /> */}
                    </div>
                </div>
                <div className='hidden sm:block absolute w-[10px] h-[100%] bg-[#929BA3]'></div>
            </section>

            <section className='flex items-center relative bg-(--dark) z-1 overflow-hidden'>
                <div className='sm:container mx-auto flex flex-col sm:flex-row justify-between sm:py-10 lg:py-20'>
                    <div className='sm:w-[55%] xl:pl-10 pr-10 xl:pr-20 text-(--light) max-sm:py-10 max-sm:px-3'>
                        <h2 className='text-3xl sm:text-4xl leading-[1.2em] font-[macro]' data-aos="fade-up">Our <span className='text-(--savegreen) pt-3 px-3'>Mission</span></h2>
                        <p className='mt-5 lg:mt-10 sx:text-xl text-(--light)' data-aos="fade-up">
                            Resilution revolutionizes investment by making it <strong>accessible, transparent, and decentralized.</strong> We empower businesses to grow and enable investors to earn from <strong>real economic value.</strong>
                        </p>

                    </div>
                    <div className='mt-[-1px] flex justify-end item-center sm:w-[45%] sm:py-10' data-aos='fade-left'>
                        <img src="/assets/about1.webp" loading="lazy" className={style.img1 + ' sm:absolute -z-1 top-0 right-0 sm:w-[45%] h-[100%]'} alt="" />
                    </div>
                </div>
            </section>

            <section className='flex items-center relative bg-[#929BA3] z-1 overflow-hidden'>
                <div className='sm:container mx-auto flex sm:flex-row flex-col justify-between sm:py-10 lg:py-20'>
                    <div className='sm:w-[55%] xl:pl-10 pr-10 xl:pr-20 max-sm:px-3 max-sm:py-10'>
                        <h2 className='text-3xl sm:text-4xl leading-[1.2em] font-[macro]' data-aos="fade-up">Our <span className='text-(--savegreen) pt-3 px-3'>vision</span></h2>
                        <p className='mt-5 lg:mt-10 sx:text-xl ' data-aos="fade-up">
                            Resilution envisions a <strong>barrier-free financial ecosystem</strong> where anyone can invest in businesses they trust—<strong>without middlemen or hidden fees—</strong>fostering a fair, community-driven economy.
                        </p>

                    </div>
                    <div className='mt-[-1px] flex justify-end item-center sm:w-[45%] sm:py-10' data-aos='fade-left'>
                        <img src="/assets/about2.webp" loading="lazy" className={style.img2 + ' sm:absolute -z-1 top-0 right-0 sm:w-[45%] h-[100%]'} alt="" />
                    </div>
                </div>
            </section>

            <section className='sm:container mx-auto xl:px-10 my-20 max-sm:px-3 overflow-hidden'>
                <h2 className='text-3xl sm:text-4xl leading-[1.2em] font-[macro] text-center' data-aos="fade-up">Why Resilution?</h2>
                <div className='grid gap-7 grid-cols-1 sm:grid-cols-2 xl:grid-cols-[565px_565px] mt-10 justify-center'>
                    <div className='bg-[#F5F5F5] p-5 pt-10 vs:p-10 p-5 pt-10 vs:pt-15 relative xl:min-w-[565px] min-h-[268px] mt-3 g_card' data-aos="fade-right">
                        <p className='text-[18px] font-[macro] mt-10 tracking-[0.06em]'>No <br />Middlemen</p>
                        <p className='mt-5'>Direct peer-to-business transactions eliminate intermediaries, reducing costs and ensuring fair investments. </p>
                        <span className='bg-(--savegreen) px-2 py-2.5 absolute top-0 translate-y-[-30%] w-[40px] h-[40px] lg:w-[45px] lg:h-[45px] flex justify-center items-center'>
                            <img src="/icons/check.svg" alt="" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 pt-10 vs:p-10 p-5 pt-10 vs:pt-15 relative xl:min-w-[565px] min-h-[268px] mt-3 g_card' data-aos="fade-left">
                        <p className='text-[18px] font-[macro] mt-10 tracking-[0.06em]'>Secure & <br />Automated</p>
                        <p className='mt-5'>Unlike speculative markets, Resilution connects investors with real businesses, using blockchain and smart contracts for seamless automation. </p>
                        <span className='bg-(--savegreen) px-2 py-2.5 absolute top-0 translate-y-[-30%] w-[40px] h-[40px] lg:w-[45px] lg:h-[45px] flex justify-center items-center'>
                            <img src="/icons/check.svg" alt="" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 pt-10 vs:p-10 p-5 pt-10 vs:pt-15 relative xl:min-w-[565px] min-h-[268px] g_card' data-aos="fade-right">
                        <p className='text-[18px] font-[macro] mt-10 tracking-[0.06em]'>Smart Contract<br />Security</p>
                        <p className='mt-5'>Every investment is protected through tamper-proof smart contracts, ensuring transparent profit-sharing and financial security.</p>
                        <span className='bg-(--savegreen) px-2 py-2.5 absolute top-0 translate-y-[-30%] w-[40px] h-[40px] lg:w-[45px] lg:h-[45px] flex justify-center items-center'>
                            <img src="/icons/check.svg" alt="" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 pt-10 vs:p-10 p-5 pt-10 vs:pt-15 relative xl:min-w-[565px] min-h-[268px] g_card' data-aos="fade-left">
                        <p className='text-[18px] font-[macro] mt-10 tracking-[0.06em]'>Global <br />Access</p>
                        <p className='mt-5'>A decentralized ecosystem that allows anyone, anywhere, to invest in verified businesses, promoting financial inclusion.</p>
                        <span className='bg-(--savegreen) px-2 py-2.5 absolute top-0 translate-y-[-30%] w-[40px] h-[40px] lg:w-[45px] lg:h-[45px] flex justify-center items-center'>
                            <img src="/icons/check.svg" alt="" />
                        </span>
                    </div>
                </div>
            </section>
            <section className='sm:container mx-auto xl:px-10 flex flex-col lg:flex-row max-sm:px-3'>
                <div className='bg-(--dark) text-(--light) p-5 pb-0 sx:p-10 sx:pb-0 2xl:p-20 2xl:pb-0 lg:w-[50%] flex flex-col justify-between'>
                    <div className='relative z-2'>
                        <h3 className='font-[macro] text-2xl vs:text-3xl tracking-[0.06em] leading-[46px]'>Let’s <br /> GET IN TOUCH</h3>
                        <p className='opacity-70 mt-5'>Resilution is redefining the way people invest by bridging the gap between businesses and everyday investors. We believe in financial inclusion, transparency, and real-world impact—giving anyone the power to invest in the brands they trust and use. Our blockchain-powered platform ensures that every transaction is secure, fair, and verifiable.</p>
                    </div>
                    <div className='flex justify-center mt-30 relative z-1'>
                        <img src="/assets/ellipse.svg" className='absolute top-0 left-[50%] translate-x-[-50%] translate-y-[-40%] -z-1 w-[150%]'
                            style={{ background: "radial-gradient(#364927 -27%, transparent 75%)" }}
                            alt="" />
                        <img src="/assets/half-logo.svg" alt="" />
                    </div>
                </div>
                <div className='p-5 sx:p-10 2xl:p-15 text-(--light) tracking-[0.06em] lg:w-[50%]'
                    style={{ background: "linear-gradient(137.71deg, #929BA3 37.78%, #373A3D 185.55%)" }}>
                    <h3 className='font-[macro] text-2xl vs:text-3xl max-sx:mt-5'>Connect</h3>
                    {/* <form action="#" className='text-(--dark) mt-10 sx:mt-15 text-sm'>
                        <div className='flex flex-col sx:flex-row gap-3 sx:gap-5 my-3'>
                            <input type="text" className='bg-(--light) py-3 px-4 outline-none rounded  flex-grow-1' placeholder='First Name' />
                            <input type="text" className='bg-(--light) py-3 px-4 outline-none rounded flex-grow-1' placeholder='Last Name' />
                        </div>
                        <div className='flex flex-col sx:flex-row gap-3 sx:gap-5 my-3'>
                            <input type="number" className='bg-(--light) py-3 px-4 outline-none rounded  flex-grow-1' placeholder='Phone Number' />
                            <input type="text" className='bg-(--light) py-3 px-4 outline-none rounded flex-grow-1' placeholder='Email Address' />
                        </div>
                        <div className='my-3'>
                            <input type="text" className='bg-(--light) py-3 px-4 outline-none rounded  w-[100%]' placeholder='Subject' />
                        </div>
                        <div>
                            <textarea name="" id="" className='bg-(--light) py-3 px-4 outline-none rounded w-[100%]' rows="8" placeholder='Message'></textarea>
                        </div>
                        <button className='w-[100%] py-3 text-xl bg-(--savegreen) mt-10 g_hover'>Submit</button>
                    </form> */}
                    <div className='gap-4 mt-10 sx:mt-20'>
                        <h3 className='font-[macro] sx:text-2xl'>Business address:</h3>
                        <p className='opacity-90 text-[18px] sx:text-xl'>700 SE Becker Rd,<br /> Port St. Lucie,<br /> FL 34984 #505</p>
                        {/* <p className='opacity-90 text-xl'>700 SE Becker Rd, Port St. Lucie, FL 34984 #505</p> */}
                    </div>
                    <div className='flex gap-2 mt-10 items-center'>
                        <h2 className='font-[macro] sx:text-2xl'>Email :</h2>
                        <a href="mailto:Info@resilution.io" className='opacity-90 text-[18px] sx:text-3xl'> Info@resilution.io</a>
                    </div>
                </div>
            </section>
            <section className='sm:container xl:px-10 mx-auto my-20 text-(--light) max-vs:px-1 vs:max-sm:px-3'>
                <div className='bg-(--dark) p-5 sxp-10 sm:p-15'>
                    <h2 className='text-2xl font-[macro] tracking-[0.06em] ' data-aos="fade-up">Join us for the revolution</h2>
                    <p className='my-10 sm:text-xl' data-aos="fade-up">
                        Whether you're an investor seeking new opportunities or a business in need of transparent funding, Resilution empowers you with blockchain-driven investments for a smarter financial future.
                    </p>

                    <div className='flex gap-7'>
                        <Link to="/?_ks=xerjkea_erakf">
                            <button className='bg-(--savegreen) px-5 vs:px-8 py-2 text-(--dark) g_hover'>Get Started</button>
                        </Link>
                        <a href="/resilution-whitepaper.pdf" target='_blank'>
                            <button className='bg-(--light) px-5 vs:px-8 py-2 text-(--dark) w_hover'>Learn More</button>
                        </a>
                    </div>
                </div>
            </section>
        </>
    )
}
