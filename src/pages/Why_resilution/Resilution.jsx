import Spline from '@splinetool/react-spline'
import React, { useEffect } from 'react'
import Marquee from 'react-fast-marquee'
import style from "./why.module.css"
import { Link, useParams, useSearchParams } from 'react-router-dom'

export const Resilution = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const c_acr = (e) => {
        const target = e.target.dataset.acr
        let parent = document.querySelector(`.${target}`)
        let child1 = parent.querySelector(".head")
        let child2 = parent.querySelector(".body")
        if (parent.clientHeight >= child1.clientHeight + 5) {
            parent.style.height = `${child1.clientHeight}px`
            parent.classList.remove("show");
        } else {
            parent.style.height = `${child1.clientHeight + child2.clientHeight}px`
            parent.classList.add("show");

        }
    }

    const acrLoad = () => {
        const elems = document.querySelectorAll(".why_card")
        elems.forEach((item, i) => {
            let child = item.querySelector(".head");
            item.style.height = `${child.clientHeight}px`
        })
    }
    const mover = ()=>{
        const target = document.querySelector(".sec2").offsetTop
        window.scroll(0,target)
    }
    useEffect(()=>{
        if(searchParams.get("_ks")==="xerjkea_erakf"){
            mover()    
        }

    },[])

    return (
        <>
            <section className='flex items-center relative overflow-hidden'>
                <div className='sm:container mx-auto flex max-sm:gap-10 max-sm:flex-col justify-between sm:py-10 lg:py-20'>
                    <div className='sm:w-[55%] max-sm:px-3 max-sm:py-10 pl-5 xl:pl-10 lg:pr-10 xl:pr-20 '>
                        <h1 className='text-4xl md:text-5xl 2xl:text-6xl leading-[1.5em] font-[macro]' data-aos="fade-down"><span className='bg-(--savegreen) p-3'>Where we</span> <br /> fit in</h1>
                        <p className='my-7 sx:my-9 md:text-xl text-[#5C5C5C]' data-aos="fade-up">
                            Resilution decentralizes investment by allowing businesses to raise funds transparently while giving consumers the power to invest directly. Built on the VALUE blockchain, our platform eliminates centralization, ensuring secure, automated, and verifiable transactions. Through smart contracts and a transparent profit-sharing model, we bridge the gap between businesses and investors, fostering trust, efficiency, and financial empowerment.
                        </p>
                        <div className='flex gap-4 vs:gap-7 mt-15 sx:mt-25'>
                            <Link to="/?_ks=xerjkea_erakf" >
                                <button className='bg-(--savegreen) px-5 vs:px-8 py-2 g_hover'>Get Started</button>
                            </Link>
                            <a href="/resilution-whitepaper.pdf" target='_blank'>
                                <button className='bg-(--dark) px-5 vs:px-8 py-2 text-(--light) b_hover'>Learn More</button>
                            </a>
                        </div>
                    </div>
                    <div className='mt-[-1px] flex justify-end item-center sm:w-[45%] sm:py-10'>
                        {/* <img src="/assets/logo.svg" className='w-[70%] mix-blend-difference' alt="" /> */}
                        <img src="/assets/hero2.webp" loading="lazy" className={style.hero_img + ' sm:absolute -z-1 top-0 right-0 sm:w-[45%] h-[100%]'} data-aos="fade-left" alt="" />
                        {/* <img src="/assets/logo.svg" className='absolute top-[50%] left-[50%] translate-[-50%] w-[70%] mix-blend-difference' alt="" /> */}
                    </div>
                </div>
                <div className='hidden sm:block absolute w-[10px] h-[100%] bg-[#929BA3]'></div>
            </section>

            <section className=' bg-(--dark) py-15 md:py-25 overflow-hidden sec2'>
                <div className='sm:container xl:px-10 mx-auto max-vs:px-1 vs:max-sm:px-3'>
                    <h2 className='text-xl sx:text-2xl md:text-3xl lg:text-4xl font-[macro] text-(--light) tracking-[0.06em] md:leading-[50px] mx-auto text-center xlw-[70%]' data-aos="fade-up">Traditional Markets Are Failing Everyday Investors</h2>
                    <p className='text-center md:text-xl text-(--light) xl:w-[80%] mx-auto my-13 text-[#B9B9B9]' data-aos="fade-up">
                        Conventional financial markets are plagued by  <strong>centralization, exclusivity, and inefficiencies.</strong> Access to investment opportunities is often restricted to a select few, leaving everyday investors with limited options and high barriers to entry. Resilution <strong>removes these limitations</strong> by offering a <strong>decentralized, transparent, and accessible</strong> investment ecosystem—empowering individuals to invest in real businesses with <strong>full visibility and fair profit-sharing.</strong>
                    </p>
                    {/* <div className='flex justify-center gap-5 mt-15'>
                        <button className='px-7 py-2 bg-(--savegreen) g_hover'>Get Started</button>
                        <a href="/resilution-whitepaper.pdf" target='_blank'>

                            <button className='px-7 py-2 bg-(--light) w_hover'>Learn More</button>
                        </a>
                    </div> */}
                    <div className='mt-17 grid grid-cols-1  md:grid-cols-2 xl:grid-cols-[585px_585px] justify-center gap-5'>
                        <div className='bg-(--light) min-h-[320px] md:min-h-[370px] lg:min-h-[406px] hover:scale-102 flex flex-col justify-between hover:shadow-[0px_600px_0px_0px_#cdd7dd_inset]' style={{ transition: ".3s ease" }} data-aos="fade-right">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-[#CFD7DD] items-center'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>Over <br className='max-vs:hidden' /> CENTRALIZATION</p>
                            </div>
                            <div className='p-5 lg:px-10 lg:py-9'>
                                <p className='mb-5 lg:mb-5'>Traditional financial systems are dominated by a few powerful institutions, limiting access to investment opportunities. Resilution <strong>removes intermediaries,</strong> giving businesses and investors direct control over funding and growth.</p>
                            </div>
                            <div className='relative mt-8 lg:mt-12'>
                                <div className=' bg-(--savegreen) h-12 transition dutation-500 c_acr1 why_card overflow-hidden' onLoad={acrLoad}>
                                    <div className='head py-3 px-5 lg:px-10 '  data-acr="c_acr1" onClick={c_acr}>
                                        <p data-acr="c_acr1">Find out our Solution</p>
                                        <button className='bg-(--dark) flex justify-center items-center w-[50px] h-[50px] absolute top-0 right-5 translate-y-[-50%]'
                                            data-acr="c_acr1"
                                           
                                        >
                                            <img src="/icons/down-arrow.svg" className='transition dutation-500' alt="" data-acr="c_acr1" />
                                        </button>
                                    </div>
                                    <div className='body px-5 lg:px-10 '>
                                        <p className='font-bold'>Decentralized & Inclusive Investment</p>
                                        <p className='py-3'>Resilution eliminates the reliance on centralized financial institutions by leveraging blockchain technology. Our platform enables direct transactions between investors and businesses, ensuring fair access to capital and investment opportunities. With smart contracts handling agreements, power shifts from intermediaries to a transparent, trustless, and secure ecosystem.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-(--light) min-h-[320px] md:min-h-[370px] lg:min-h-[406px] flex flex-col justify-between hover:shadow-[0px_600px_0px_0px_#cdd7dd_inset]' style={{ transition: ".3s ease" }} data-aos="fade-left">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-[#CFD7DD] items-center'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>LACK OF  <br className='max-vs:hidden' /> TRANSPARENCY</p>
                            </div>
                            <div className='p-5 lg:px-10 lg:py-9'>
                                <p className='mb-5 lg:mb-5'>Hidden fees, insider trading, and unclear terms make traditional investing risky. Resilution ensures <strong>full transparency</strong> with blockchain-powered verification, making every transaction secure and traceable.</p>
                            </div>
                            <div className='relative mt-8 lg:mt-12'>
                                <div className=' bg-(--savegreen) h-12 transition dutation-500 c_acr2 why_card overflow-hidden' onLoad={acrLoad}>
                                    <div className='head py-3 px-5 lg:px-10 ' data-acr="c_acr2" onClick={c_acr}>
                                        <p data-acr="c_acr2">Find out our Solution</p>
                                        <button className='bg-(--dark) flex justify-center items-center w-[50px] h-[50px] absolute top-0 right-5 translate-y-[-50%]'
                                            data-acr="c_acr2"
                                            
                                        >
                                            <img src="/icons/down-arrow.svg" className='transition dutation-500' alt="" data-acr="c_acr2" />
                                        </button>
                                    </div>
                                    <div className='body px-5 lg:px-10 '>
                                        <p className='font-bold'>Blockchain-Powered Verification </p>
                                        <p className='py-3'>Resilution ensures full transparency and trust through blockchain-powered smart contracts. Every transaction is verifiable, tamper-proof, and traceable, eliminating hidden fees and insider manipulation. Investors gain real-time insights into funding processes, while businesses benefit from a clear and fair investment structure. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-(--light) min-h-[320px] md:min-h-[370px] lg:min-h-[406px] flex flex-col justify-between hover:shadow-[0px_600px_0px_0px_#cdd7dd_inset]' style={{ transition: ".3s ease" }} data-aos="fade-right">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-[#CFD7DD] items-center'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>High <br className='max-vs:hidden' /> ENTRY BARRIERS</p>
                            </div>
                            <div className='p-5 lg:px-10 lg:py-9'>
                                <p className='mb-5 lg:mb-5'>Strict regulations and high capital requirements exclude many from investing. Resilution <strong>opens doors</strong> for everyone, enabling seamless investments with flexible options and minimal restrictions.</p>
                            </div>
                            <div className='relative mt-8 lg:mt-12 '>
                                <div className=' bg-(--savegreen) h-12 transition dutation-500 c_acr3 why_card overflow-hidden' onLoad={acrLoad}>
                                    <div className='head py-3 px-5 lg:px-10 ' data-acr="c_acr3"  onClick={c_acr}>
                                        <p  data-acr="c_acr3">Find out our Solution</p>
                                        <button className='bg-(--dark) flex justify-center items-center w-[50px] h-[50px] absolute top-0 right-5 translate-y-[-50%]'
                                            data-acr="c_acr3"
                                           
                                        >
                                            <img src="/icons/down-arrow.svg" className='transition dutation-500' alt="" data-acr="c_acr3" />
                                        </button>
                                    </div>
                                    <div className='body px-5 lg:px-10 '>
                                        <p className='font-bold'>Lowering Investment Barriers for All </p>
                                        <p className='py-3'>Resilution removes traditional restrictions by offering flexible investment options with minimal capital requirements. Through blockchain-based fractional ownership and decentralized access, anyone can participate in investment opportunities without the need for large upfront capital or regulatory hurdles.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-(--light) min-h-[320px] md:min-h-[370px] lg:min-h-[406px] flex flex-col justify-between hover:shadow-[0px_600px_0px_0px_#cdd7dd_inset]' style={{ transition: ".3s ease" }} data-aos="fade-left">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-[#CFD7DD] items-center'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>INEFFICIENT  <br className='max-vs:hidden' /> PROFIT DISTRIBUTION</p>
                            </div>
                            <div className='p-5 lg:px-10 lg:py-9'>
                                <p className='mb-5 lg:mb-5'>Middlemen take a significant cut from investor earnings, reducing overall returns. Resilution <strong>automates profit sharing</strong> through smart contracts, ensuring fair and instant distributions to all stakeholders. </p>
                            </div>
                            <div className='relative mt-8 lg:mt-12'>
                                <div className=' bg-(--savegreen) h-12 overflow-hidden transition dutation-500 c_acr4 why_card' onLoad={acrLoad}>
                                    <div className='head py-3 px-5 lg:px-10 '  data-acr="c_acr4" onClick={c_acr}>
                                        <p data-acr="c_acr4">Find out our Solution</p>
                                        <button className='bg-(--dark) flex justify-center items-center w-[50px] h-[50px] absolute top-0 right-5 translate-y-[-50%]'
                                            data-acr="c_acr4"
                                            
                                        >
                                            <img src="/icons/down-arrow.svg" className='transition dutation-500' alt="" data-acr="c_acr4" />
                                        </button>
                                    </div>
                                    <div className='body px-5 lg:px-10 '>
                                        <p className='font-bold'>Instant & Fair Profit Sharing</p>
                                        <p className='py-3'>Resilution eliminates middlemen by leveraging smart contracts to automate profit distribution. Investors receive their earnings instantly, without deductions from intermediaries, ensuring a fair, direct, and transparent system where all stakeholders benefit equally.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-(--light) min-h-[320px] md:min-h-[370px] lg:min-h-[406px] flex flex-col justify-between hover:shadow-[0px_600px_0px_0px_#cdd7dd_inset]' style={{ transition: ".3s ease" }} data-aos="fade-right">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-[#CFD7DD] items-center'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>FRAUD &  <br className='max-vs:hidden' /> UNSECURED INVESTMENTS</p>
                            </div>
                            <div className='p-5 lg:px-10 lg:py-9'>
                                <p className='mb-5 lg:mb-5'>Traditional markets lack security, exposing investors to scams and unreliable projects. Resilution <strong>utilizes blockchain authentication, </strong>offering a tamper-proof system for verified investments. </p>
                            </div>
                            <div className='relative mt-8 lg:mt-12'>
                                <div className=' bg-(--savegreen) h-12 overflow-hidden transition dutation-500 c_acr5 why_card' onLoad={acrLoad}>
                                    <div className='head py-3 px-5 lg:px-10 '  data-acr="c_acr5"  onClick={c_acr}>
                                        <p  data-acr="c_acr5">Find out our Solution</p>
                                        <button className='bg-(--dark) flex justify-center items-center w-[50px] h-[50px] absolute top-0 right-5 translate-y-[-50%]'
                                            data-acr="c_acr5"
                                           
                                        >
                                            <img src="/icons/down-arrow.svg" className='transition dutation-500' alt="" data-acr="c_acr5" />
                                        </button>
                                    </div>
                                    <div className='body px-5 lg:px-10 '>
                                        <p className='font-bold'>Blockchain-Powered Security & Verification</p>
                                        <p className='py-3'>Resilution uses blockchain authentication and automated smart contract enforcement to ensure every transaction is secure, verifiable, and tamper-proof. Investors can confidently engage in funding opportunities, knowing that all projects go through a rigorous verification process, reducing the risk of fraud and scams.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-(--light) min-h-[320px] md:min-h-[370px] lg:min-h-[406px] flex flex-col justify-between hover:shadow-[0px_600px_0px_0px_#cdd7dd_inset]' style={{ transition: ".3s ease" }} data-aos="fade-left">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-[#CFD7DD] items-center'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>LIMITED ACCESS TO  <br className='max-vs:hidden' /> REAL-WORLD BUSINESSES</p>
                            </div>
                            <div className='p-5 lg:px-10 lg:py-9'>
                                <p className='mb-5 lg:mb-5'>Investment is often restricted to speculative markets, leaving real businesses struggling for funding. Resilution <strong>connects investors with real-world ventures,</strong> fueling sustainable economic growth. </p>
                            </div>
                            <div className='relative mt-8 lg:mt-12'>
                                <div className=' bg-(--savegreen) h-12 overflow-hidden transition dutation-500 c_acr6 why_card' onLoad={acrLoad}>
                                    <div className='head py-3 px-5 lg:px-10 '  data-acr="c_acr6"  onClick={c_acr}>
                                        <p  data-acr="c_acr6">Find out our Solution</p>
                                        <button className='bg-(--dark) flex justify-center items-center w-[50px] h-[50px] absolute top-0 right-5 translate-y-[-50%]'
                                            data-acr="c_acr6"
                                           
                                        >
                                            <img src="/icons/down-arrow.svg" className='transition dutation-500' alt="" data-acr="c_acr6" />
                                        </button>
                                    </div>
                                    <div className='body px-5 lg:px-10 '>
                                        <p className='font-bold'>Connecting Investors with High-Growth Businesses </p>
                                        <p className='py-3'>Resilution bridges the gap between investors and <strong>genuine real-world businesses</strong> by enabling direct investment into scalable, high-impact projects. Our <strong>decentralized platform ensures capital flows into sustainable growth opportunities,</strong> rather than speculative assets, providing investors with <strong>real value-driven exposure.</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='sm:container max-sm:px-3 flex flex-col sm:flex-row xl:px-10 sm:py-10 mx-auto'>
                <div className='sm:w-[55%] md:w-[60%] lg:w-[55%] py-10'>
                    <h2 className='text-xl vs:text-2xl md:text-3xl lg:text-4xl font-[macro] tracking-[0.06em] md:leading-[50px] mt-5' data-aos="fade-up">THE RESILUTION: A NEW INVESTMENT PARADIGM</h2>
                    <p className='text-[#B9B9B9] md:text-xl my-7 lg:my-15' data-aos="fade-up">
                        Resilution transforms investment by merging <strong>blockchain technology</strong> with real-world business funding. Unlike speculative markets, it enables direct <strong>consumer-driven investments,</strong> allowing individuals to support businesses transparently while earning fair returns. Through
                        <strong> smart contracts and decentralized finance,</strong> Resilution ensures
                        <strong> security, efficiency, and equitable profit distribution. </strong>
                    </p>
                    <div className='flex  gap-5'>
                        <a href="https://form.typeform.com/to/jUbagOpZ " target='_blank'>
                            <button className='px-5 vs:px-10 py-3 bg-(--savegreen) g_hover'>Get Started</button>
                        </a>
                        <a href="/resilution-whitepaper.pdf" target='_blank'>
                            <button className='px-5 vs:px-10 py-3 bg-(--light) hover:bg-(--dark) hover:text-(--light)'>Learn More</button>
                        </a>
                    </div>
                </div>
                <div className=' sm:w-[40%] lg:w-[45%] flex justify-center items-center overflow-hidden '>
                    <div className={style.scene}>
                        <Spline scene='https://prod.spline.design/2g0IQbUKbYsDAUMq/scene.splinecode' />
                    </div>
                </div>
            </section>
            <section className='relative z-1 overflow-hidden' style={{ background: "linear-gradient(122.43deg, #CFD6DD 31.18%, #373A3D 125.86%)" }}>
                <div className='sm:container max-vs:px-1 vs:max-sm:px-3 py-10 xl:p-10 mx-auto'>
                    <div className='my-12 grid md:grid-cols-2 xl:grid-cols-[585px_585px] justify-center gap-5'>
                        <div className='bg-(--light) min-h-[318px] hover:shadow-[0px_600px_0px_0px_#C8FF80_inset]  ' style={{ transition: ".3s ease" }} data-aos="fade-right">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-(--savegreen)'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>DECENTRALIZED <br className='max-vs:hidden' />  Investment Ecosystem</p>
                            </div>
                            <div className=' max-lg:p-5 lg:px-10 mt-8'>
                                <p className='mb-5 lg:mb-5'>
                                    Resilution <strong>removes intermediaries,</strong> enabling direct investments between businesses and consumers. Built on the
                                    <strong> VALUE blockchain,</strong>  it ensures <strong>secure, immutable, and transparent</strong> transactions, empowering investors with
                                    <strong> real-time access </strong> to financial data.
                                </p>
                            </div>
                        </div>
                        <div className='bg-(--light) min-h-[318px] hover:shadow-[0px_600px_0px_0px_#C8FF80_inset]  ' style={{ transition: ".3s ease" }} data-aos="fade-left">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-(--savegreen)'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>Complete <br className='max-vs:hidden' />Transparency & Trust</p>
                            </div>
                            <div className='max-lg:p-5 lg:px-10 mt-8'>
                                <p className='mb-5 lg:mb-5'>
                                    Every transaction, business performance metric, and revenue distribution is recorded
                                    <strong> on-chain,</strong> providing <strong>full visibility</strong> to investors. By eliminating <strong>hidden fees and mismanagement risks,</strong> Resilution fosters
                                    <strong> trust and accountability</strong> in the investment process.
                                </p>
                            </div>
                        </div>
                        <div className='bg-(--light) min-h-[318px] hover:shadow-[0px_600px_0px_0px_#C8FF80_inset]  ' style={{ transition: ".3s ease" }} data-aos="fade-right">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-(--savegreen)'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>Inclusive Investment <br className='max-vs:hidden' /> Opportunities</p>
                            </div>
                            <div className='max-lg:p-5 lg:px-10 mt-8'>
                                <p className='mb-5 lg:mb-5'>Resilution breaks traditional financial barriers by enabling <strong>anyone</strong> to invest in businesses, regardless of background. Unlike conventional markets, our platform ensures that investment opportunities are <strong>accessible to all, </strong>fostering financial inclusivity.</p>
                            </div>
                        </div>
                        <div className='bg-(--light) min-h-[318px] hover:shadow-[0px_600px_0px_0px_#C8FF80_inset]  ' style={{ transition: ".3s ease" }} data-aos="fade-left">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-(--savegreen)'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>Transparent & <br className='max-vs:hidden' />Verifiable Transactions</p>
                            </div>
                            <div className='max-lg:p-5 lg:px-10 mt-8'>
                                <p className='mb-5 lg:mb-5'>Every transaction, investment, and revenue distribution is recorded on the <strong>VALUE blockchain,</strong> ensuring <strong>security, immutability, and real-time tracking.</strong> Investors can verify how funds are utilized, eliminating hidden fees and financial mismanagement.</p>
                            </div>
                        </div>
                        <div className='bg-(--light) min-h-[318px] hover:shadow-[0px_600px_0px_0px_#C8FF80_inset]  ' style={{ transition: ".3s ease" }} data-aos="fade-right">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-(--savegreen)'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>Community-Powered <br className='max-vs:hidden' /> Growth</p>
                            </div>
                            <div className='max-lg:p-5 lg:px-10 mt-8'>
                                <p className='mb-5 lg:mb-5'>Investors are not just passive participants—they actively support businesses that align with their values. Businesses benefit from direct consumer engagement, while investors earn <strong>rewards and profits</strong> from ventures they help grow.</p>
                            </div>
                        </div>
                        <div className='bg-(--light) min-h-[318px] hover:shadow-[0px_600px_0px_0px_#C8FF80_inset]  ' style={{ transition: ".3s ease" }} data-aos="fade-left">
                            <div className='flex gap-5 p-5 lg:px-10 lg:py-8.5 bg-(--savegreen)'>
                                <img src="/icons/icons_q2.svg" alt="" />
                                <p className='vs:text-[18px] font-[macro] tracking-[0.06em]'>Fair & Accessible <br className='max-vs:hidden' /> Capital</p>
                            </div>
                            <div className='max-lg:p-5 lg:px-10 mt-8'>
                                <p className='mb-5 lg:mb-5'>Resilution empowers businesses of all sizes to raise funds transparently while giving investors the chance to back meaningful projects. By <strong>removing intermediaries,</strong> we create a <strong>fair, decentralized, and efficient</strong> investment ecosystem.</p>
                            </div>
                        </div>

                    </div>
                </div>
                <img src="/assets/shap4.svg" className='absolute -z-1 w-[100%] bottom-0 left-0' alt="" />
            </section>

            <section className='bg-(--dark)'>
                <div className='sm:container max-vs:px-1 vs:max-sm:px-3 mx-auto py-10 xl:px-10 py-12 flex flex-col sm:flex-row max-sm:gap-3 items-center justify-between' data-aos="fade-up">
                    <h3 className='text-[18px] max-sm:text-center mb-[-5px] font-[macro] tracking-[0.06em] text-(--light)'  >Read in Detail From our whitepaper</h3>
                    <a href="/resilution-whitepaper.pdf" target='_blank'>
                        <button className='flex items-stretch group'>
                            <div className='bg-(--savegreen) px-5 lg:px-10 py-2 group-hover:bg-(--light)'>
                                <span className='text-nowrap'>Download our Whitepaper</span>
                            </div>
                            <span className='bg-(--light) flex items-center block px-3 group-hover:bg-(--savegreen)'>
                                <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.36726 20.5841C7.97674 20.9746 7.34357 20.9746 6.95305 20.5841L0.589088 14.2201C0.198564 13.8296 0.198564 13.1964 0.589088 12.8059C0.979613 12.4154 1.61278 12.4154 2.0033 12.8059L7.66016 18.4627L13.317 12.8059C13.7075 12.4154 14.3407 12.4154 14.7312 12.8059C15.1217 13.1964 15.1217 13.8296 14.7312 14.2201L8.36726 20.5841ZM6.66016 19.877V0.680664H8.66016V19.877H6.66016Z" fill="#000" />
                                </svg>
                            </span>
                        </button>
                    </a>
                </div>
            </section>

            <section className='sm:container px-1 vs:max-sm:px-3 xl:px-10 py-25 mx-auto'>
                <h2 className='text-2xl md:text-3xl lg:text-4xl font-[macro] tracking-[0.06em] text-center mt-9' data-aos="fade-up">Key Features of Resilution</h2>
                <div className='grid grid-cols-1 sx:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[373px_373px_373px] 2xl:grid-cols-[410px_410px_410px]  justify-center gap-5 xl:gap-7 mt-15'>
                    <div className='bg-[#F5F5F5] p-5 xl:p-9 relative g_card '>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Blockchain-Powered Security</p>
                        <p className='mt-[1.875rem] mb-2 leading-[20px]'>Every transaction is <strong>immutably recorded</strong> on the VALUE blockchain, ensuring <strong>tamper-proof investments</strong> that eliminate fraud, manipulation, and third-party control.</p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" width='19px' alt="" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 xl:p-9 relative g_card'>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Fair Profit Distribution</p>
                        <p className='mt-[1.875rem] mb-2 leading-[20px]'>Investors earn based on <strong>real-world business performance</strong> rather than market speculation, creating a <strong>fair and sustainable investment ecosystem. </strong></p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" width='19px' alt="" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 xl:p-9 relative g_card'>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Business-consumer Investment</p>
                        <p className='mt-[1.875rem] mb-2 leading-[20px]'>Consumers can directly <strong>invest in brands they trust</strong>, fostering business growth while <strong>earning financial rewards</strong> for their support. </p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" width='19px' alt="" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 xl:p-9 relative g_card'>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Automated Smart Contracts</p>
                        <p className='mt-[1.875rem] mb-2 leading-[20px]'>No middlemen—<strong>smart contracts</strong> handle payments,  <strong>profit-sharing,</strong> and compliance  <strong>automatically,</strong> ensuring secure and transparent transactions.</p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" width='19px' alt="" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 xl:p-9 relative g_card'>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Supply Chain Transparency</p>
                        <p className='mt-[1.875rem] mb-2 leading-[20px]'>Resilution enables consumers to  <strong>track product lifecycles</strong> through <strong>Product Data Chains,</strong> ensuring complete visibility from <strong>creation to purchase.</strong></p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" width='19px' alt="" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 xl:p-9 relative g_card'>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Global Accessibility</p>
                        <p className='mt-[1.875rem] mb-2 leading-[20px]'>Resilution is <strong>open to all,</strong> providing decentralized investment opportunities that<strong> break financial barriers</strong> and democratize wealth distribution. </p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[40px] lg:w-[45px] h-[40px] lg:h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" width='19px' alt="" />
                        </span>
                    </div>
                </div>
            </section>

            <section className='py-5 relative overflow-hidden' style={{ background: "linear-gradient(127.94deg, #CFD6DD 31.1%, #373A3D 163.17%)" }}>
                <div className='sm:container max-sm:px-3 xl:px-10 mx-auto flex flex-col sm:flex-row lg:gap-10'>
                    <div className='sm:w-[55%] lg:w-[50%] pt-20 '>
                        <div>
                            <h2 className='text-xl vs:text-2xl md:text-3xl lg:text-[35px] font-[macro] tracking-[0.06em] leading-[1.4em]' data-aos="fade-up">
                                A Future of Financial Freedom
                            </h2>
                            <p className='md:text-xl mt-13 sm:mb-35 lg:mb-45' data-aos="fade-up">Resilution is transforming investment by merging blockchain technology with <strong>real-world economic value. </strong> Unlike speculative markets, Resilution enables consumers to
                                <strong> directly invest in businesses</strong> through tangible products and services. This decentralized model <strong>eliminates financial barriers,</strong> fostering <strong>transparent, trust-driven growth. </strong>
                            </p>
                        </div>
                        {/* <div className='flex gap-5 mt-15% lg:mt-30 mb-5 sm:mb-35 lg:mb-45'>
                            <button className='px-7 vs:px-10 py-3 bg-(--savegreen) g_hover'>Get Started</button>
                            <a href="/resilution-whitepaper.pdf" target='_blank'>
                                <button className='px-7 vs:px-10 py-3 bg-(--light) w_hover'>Learn More</button>
                            </a>
                        </div> */}
                    </div>
                    <div className='sm:w-[45%] lg:w-[50%]'>
                        <img src="/assets/hero.webp" className={style.imganim + ' sm:absolute right-0 sm:w-[45%] xl:w-[40%]'} data-aos="fade-left" style={{ height: "calc(100% - 2.5rem)" }} alt="" />
                    </div>
                </div>
                <div className='bg-(--savegreen) absolute bottom-15 sm:bottom-10 left -0 w-[100%]'>
                    <Marquee
                        pauseOnHover="true"
                        speed={150}
                    >
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-3px]'>No more hidden fees</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-3px]'>FAIR & TRANSPARENT INVESTING</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-3px]'>SEAMLESS & SECURE TRANSACTIONS</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-3px]'>BLOCKCHAIN-POWERED TRUST</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-3px]'>DECENTRALIZED & FRAUD-PROOF</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-3px]'>No more hidden fees</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-3px]'>FAIR & TRANSPARENT INVESTING</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-3px]'>SEAMLESS & SECURE TRANSACTIONS</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-3px]'>BLOCKCHAIN-POWERED TRUST</span>
                        </div>
                        <div className='flex p-2 items-end'>
                            <img src="/icons/logo.svg" className='mx-5' width="20px" alt="" />
                            <span className='font-[macro] tracking-[0.06em] mb-[-3px]'>DECENTRALIZED & FRAUD-PROOF</span>
                        </div>
                    </Marquee>
                </div>
            </section>
        </>
    )
}

