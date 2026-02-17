import React, { useState } from 'react'
import style from "./work.module.css"
import { Link } from 'react-router-dom'

export const Work = () => {

    const [isTab, setTab] = useState(false)

    return (
        <>
            <section className='flex items-center relative overflow-hidden'>
                <div className='sm:container mx-auto flex max-sm:gap-10 max-sm:flex-col justify-between sm:py-10 lg:py-20'>
                    <div className='sm:w-[55%] max-sm:px-3 max-sm:py-10 pl-5 xl:pl-10 md:pr-10 xl:pr-20'>
                        <h1 className='text-3xl vs:text-4xl md:text-5xl 2xl:text-6xl leading-[1.5em] font-[macro] tracking-[0.06em]' data-aos="fade-down">
                            <span className='bg-(--savegreen) p-3'>How It</span> <br /> All Works Together
                        </h1>
                        <p className='my-5 sx:my-9 md:text-xl text-[#5C5C5C]' data-aos="fade-up">
                            Resilution transforms investment by enabling direct, secure, and transparent transactions using blockchain and smart contracts. Businesses can raise funds with clear terms, while investors gain access to real-world opportunities backed by verifiable data. Through automated tracking and decentralized governance, Resilution ensures fair profit distribution, seamless transactions, and a financial ecosystem free from intermediaries and speculation.
                        </p>
                        <div className='flex gap-7 mt-15'>
                            <Link to="/why-resilution?_ks=xerjkea_erakf">
                                <button className='bg-(--savegreen) px-5 vs:px-8 py-2 g_hover'>Get Started</button>
                            </Link>
                            <a href='/resilution-whitepaper.pdf' target='_blank'>
                                <button className={' bg-(--dark) px-5 vs:px-8 py-2 text-(--light) b_hover'}>Learn More</button>
                            </a>
                        </div>
                    </div>
                    <div className='mt-[-1px] flex justify-end item-center sm:w-[45%] sm:py-10'>
                        {/* <img src="/assets/logo.svg" className='w-[70%] mix-blend-difference' alt="" /> */}
                        <img src="/assets/hero3.webp" loading="lazy" className={style.hero_img + ' sm:absolute -z-1 top-0 right-0 sm:w-[45%] h-[100%]'} alt="" data-aos="fade-left" />
                        {/* <img src="/assets/logo.svg" className='absolute top-[50%] left-[50%] translate-[-50%] w-[70%] mix-blend-difference' alt="" /> */}
                    </div>
                </div>
                <div className='hidden sm:block absolute w-[10px] h-[100%] bg-[#929BA3]'></div>
            </section>

            <section className='bg-(--dark) relative z-1 overflow-hidden'>
                <div className="sm:container max-vs:px-1 vs:max-sm:px-3 mx-auto xl:px-10 py-10 sm:py-25">
                    <h2 className='text-2xl sx:text-3xl sm:text-4xl 2xl:text-5xl font-[macro] text-center text-(--light) lg:w-[70%] xl:w-[60%] leading-[1.4em] mx-auto tracking-[0.06em]' data-aos="fade-up">Resilution: A Smarter Way to Invest</h2>
                    <p className='lg:text-xl text-center lg:w-[70%] text-(--light) mx-auto my-10' data-aos="fade-up">
                        Resilution revolutionizes investment by bridging blockchain technology with real-world businesses. Our platform empowers investors to engage in
                        <strong> transparent, secure, and profitable</strong> opportunities while providing businesses with direct access to capital. By eliminating intermediaries and utilizing
                        <strong> smart contracts,</strong> we ensure fair profit distribution and verifiable transactions. Whether you’re an
                        <strong> investor</strong> looking for sustainable growth or a <strong>business </strong>seeking decentralized funding, Resilution creates a seamless and inclusive financial ecosystem.
                    </p>
                    <div className='p-1 bg-(--light) w-[fit-content] mx-auto my-15'>
                        <button className={`px-10 py-2  ${!isTab&&"bg-(--dark) text-(--light)"}`} onClick={()=>{setTab(false)}}>Investor</button>
                        <button className={`px-10 py-2  ${isTab&&"bg-(--dark) text-(--light)"}`} onClick={()=>{setTab(true)}}>Business</button>
                    </div>
                    {!isTab ? <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[480px_480px] xl:grid-cols-[504px_504px] gap-3 lg:gap-5 lg:w-[95%] justify-center mx-auto'>
                        <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-right">
                            <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>01</p>
                                <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Explore & <br /> Discover</p>
                            </div>
                            <div className='px-3 vs:px-7 py-9.5'>
                                <ul className='list-disc pl-5 opacity-65'>
                                    <li>Access a decentralized marketplace of<strong> verified businesses </strong> seeking investments. </li>
                                    <li>Review <strong>on-chain financial data, product lifecycle insights, and revenue trends</strong> to make informed decisions.</li>
                                    <li>Choose businesses that align with your  <strong>values, interests, and financial goals,</strong> ensuring a purpose-driven investment approach. </li>
                                </ul>
                            </div>
                        </div>
                        <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-left">
                            <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>02</p>
                                <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Invest in Real- <br /> World Businesses</p>
                            </div>
                            <div className='px-3 vs:px-7 py-10'>
                                <ul className='list-disc pl-5 opacity-65'>
                                    <li>Invest in  <strong>real, operational businesses</strong> using <strong>cryptocurrency or tokenized assets </strong>for seamless transactions.</li>
                                    <li>All funds are  <strong>securely held and managed </strong>through smart contracts on the <strong>VALUE blockchain,</strong>  ensuring trustless execution. </li>
                                    <li>Your investment fuels business <strong>operations, product expansion, and sustainable growth,</strong> fostering a <strong>fairer and more inclusive financial ecosystem.</strong></li>
                                </ul>
                            </div>
                        </div>
                        <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-right">
                            <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>03</p>
                                <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Track & Monitor<br /> Investments</p>
                            </div>
                            <div className='px-3 vs:px-7 py-10'>
                                <ul className='list-disc pl-5 opacity-65'>
                                    <li><strong>Stay updated in real time</strong> with on-chain financial tracking tools, ensuring complete investment transparency.</li>
                                    <li>Monitor <strong>business revenue, operational expenses, and key performance metrics</strong> as they evolve.</li>
                                    <li>Blockchain-powered <strong>immutable records </strong> guarantee <strong>tamper-proof financial tracking</strong> and trustless verification.</li>
                                </ul>
                            </div>
                        </div>
                        <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-left">
                            <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>04</p>
                                <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Earn & Withdraw<br /> Profits</p>
                            </div>
                            <div className='px-3 vs:px-7 py-10'>
                                <ul className='list-disc pl-5 opacity-65'>
                                    <li>Receive <strong>automated profit distribution,</strong> based on business performance and revenue generation. </li>
                                    <li>Smart contracts ensure <strong>secure, fair, and instant payouts,</strong> eliminating third-party delays.</li>
                                    <li>Choose to <strong>withdraw earnings seamlessly or reinvest in new opportunities,</strong> fostering continuous wealth growth.</li>
                                </ul>
                            </div>
                        </div>
                        <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-right">
                            <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>05</p>
                                <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Participate in <br /> Governance</p>
                            </div>
                            <div className='px-3 vs:px-7 py-10'>
                                <ul className='list-disc pl-5 opacity-65'>
                                    <li>Take an <strong>active role in decision-making</strong> through governance tokens, shaping the future of businesses. </li>
                                    <li>Utilize <strong>voting rights</strong> to influence strategic operations, ensuring businesses align with investor interests.</li>
                                    <li>Foster a <strong>community-led financial ecosystem,</strong> where collective insights drive sustainable growth.</li>
                                </ul>
                            </div>
                        </div>
                        <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-left">
                            <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>06</p>
                                <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Strengthen the <br /> Investor Community</p>
                            </div>
                            <div className='px-3 vs:px-7 py-10'>
                                <ul className='list-disc pl-5 opacity-65'>
                                    <li>Connect with a  <strong>global network of investors,</strong>  exchanging ideas, strategies, and opportunities.</li>
                                    <li>Support and back <strong>innovative businesses</strong>  that align with your financial goals and values.</li>
                                    <li>Contribute to <strong>long-term economic stability </strong> by fostering trust and collaboration in decentralized finance. </li>
                                </ul>
                            </div>
                        </div>
                    </div> :
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[480px_480px] xl:grid-cols-[504px_504px] gap-3 lg:gap-5 lg:w-[90%] justify-center mx-auto'>
                            <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-right">
                                <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                    <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>01</p>
                                    <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>List & Launch <br /> Opportunities</p>
                                </div>
                                <div className='px-3 vs:px-7 py-10'>
                                    <ul className='list-disc pl-5 opacity-65'>
                                        <li>Businesses register on Resilution and create investment listings.</li>
                                        <li>Provide detailed financial and operational insights to attract investors.</li>
                                        <li>Smart contracts ensure automated compliance and transparency.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-left">
                                <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                    <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>02</p>
                                    <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Secure Funding from<br /> Dec-Investors</p>
                                </div>
                                <div className='px-3 vs:px-7 py-10'>
                                    <ul className='list-disc pl-5 opacity-65'>
                                        <li>Receive direct investments from global backers without intermediaries.</li>
                                        <li>Blockchain ensures fund security and automatic distribution.</li>
                                        <li>Funds are used for expansion, innovation, and operational growth.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-right">
                                <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                    <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>03</p>
                                    <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Engage & Update <br /> Investors</p>
                                </div>
                                <div className='px-3 vs:px-7 py-10'>
                                    <ul className='list-disc pl-5 opacity-65'>
                                        <li>Share real-time financial reports and updates via the blockchain.</li>
                                        <li>Ensure full transparency on fund utilization and business performance.</li>
                                        <li>Build long-term trust with investors through open communication.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-left">
                                <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                    <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>04</p>
                                    <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Distribute Profits<br /> & Rewards</p>
                                </div>
                                <div className='px-3 vs:px-7 py-10'>
                                    <ul className='list-disc pl-5 opacity-65'>
                                        <li>Automatically distribute revenue shares and dividends to investors.</li>
                                        <li>Offer bonus incentives for long-term supporters.</li>
                                        <li>Maintain fair and equitable profit-sharing mechanisms.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-right">
                                <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                    <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>05</p>
                                    <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Expand & Scale <br />  the Business</p>
                                </div>
                                <div className='px-3 vs:px-7 py-10'>
                                    <ul className='list-disc pl-5 opacity-65'>
                                        <li>Use funds to enhance products, expand operations, and grow revenue.</li>
                                        <li>Leverage investor support to reach global markets.</li>
                                        <li>Adopt new strategies based on investor feedback and market trends.</li>
                                    </ul>
                                </div>
                            </div>
                            <div className='bg-(--light) hover:shadow-[0px_-400px_0px_0px_#c0ff8b_inset]' style={{ transition: ".4s ease" }} data-aos="fade-left">
                                <div className='p-3 lg:px-8 lg:py-7 flex gap-5 lg:gap-7 items-center' style={{ background: "linear-gradient(90deg, #F8FBFF -8.7%, #BACEDF 181.15%)" }}>
                                    <p className='w-[60px] h-[60px] bg-(--savegreen) flex justify-center items-center text-2xl'>06</p>
                                    <p className='font-[macro] sx:text-[18px] leading-[26px] tracking-[0.06em]'>Build a Loyal <br />  Business Community</p>
                                </div>
                                <div className='px-3 vs:px-7 py-10'>
                                    <ul className='list-disc pl-5 opacity-65'>
                                        <li>Foster a decentralized ecosystem where businesses and investors thrive together.</li>
                                        <li>Collaborate with investors to unlock long-term growth opportunities.</li>
                                        <li>
                                            Achieve sustainable success through continuous innovation and engagement.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>}
                </div>
                <img src="/assets/shap4.svg" className='absolute top-[50%] -z-1 left-0 w-[100%] translate-y-[-50%]' alt="" />
            </section>
            <section className='sm:container max-vs:px-1 vs:max-sm:px-3 xl:px-10 py-10 sx:py-20 mx-auto'>
                <div className='flex items-end gap-2 px-4.5 py-3.5 bg-(--savegreen) mb-5 w-[fit-content] mx-auto' data-aos="fade-up">
                    <img src="/icons/logo-text.svg" width={"170px"} alt="" />
                    {/* <span className='font-[macro] tracking-[0.15em]'>Resilution</span> */}
                </div>
                <h2 className='font-[macro] text-3xl sm:text-4xl tracking-[0.06] text-center my-5' data-aos="fade-up">Why It Works</h2>

                <div className='flex flex-wrap justify-center gap-5 my-10 sx:my-15'>
                    <div className='bg-[#F5F5F5] p-5 sm:p-10 xl:p-9 relative w-[100%] sm:w-[47%] lg:w-[32%] mt-3 g_card'>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>No <br />Middlemen</p>
                        <p className='mt-5'>Resilution removes unnecessary intermediaries by enabling <strong>direct peer-to-business transactions.</strong> This eliminates high fees and inefficiencies, ensuring that investments flow directly into businesses for sustainable growth.</p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[45px] h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" alt="" width="19px" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 sm:p-10 xl:p-9 relative w-[100%] sm:w-[47%] lg:w-[32%] mt-3 g_card'>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Secure & <br />Automated</p>
                        <p className='mt-5'>Smart contracts on the <strong>VALUE blockchain</strong> automate <strong>fund management, profit-sharing, and compliance.</strong>  Every transaction is <strong>immutable and verifiable, </strong> ensuring secure and transparent investment execution.</p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[45px] h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" alt="" width="19px" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 sm:p-10 xl:p-9 relative w-[100%] sm:w-[47%] lg:w-[32%] mt-3 g_card'>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Real-World <br />Impact</p>
                        <p className='mt-5'>Unlike speculative stock trading, Resilution investments are tied to <strong>real-world businesses, products, and services.</strong> Investors directly support business expansion, inventory management, and innovation. </p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[45px] h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" alt="" width="19px" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 sm:p-10 xl:p-9 relative w-[100%] sm:w-[47%] lg:w-[32%] mt-3 g_card'>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Global <br />Accessibility</p>
                        <p className='mt-5'>Built on decentralized blockchain technology, Resilution allows <strong>anyone, anywhere  </strong>to participate in investment opportunities without geographical restrictions, creating a <strong>borderless and inclusive financial ecosystem. </strong></p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[45px] h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" alt="" width="19px" />
                        </span>
                    </div>
                    <div className='bg-[#F5F5F5] p-5 sm:p-10 xl:p-9 relative w-[100%] sm:w-[47%] lg:w-[32%] mt-3 g_card'>
                        <p className='text-[18px] font-[macro] mt-16 tracking-[0.06em]'>Sustainable <br />Growth</p>
                        <p className='mt-5'>Resilution connects investors with businesses that  <strong>generate tangible value,</strong> ensuring that investments contribute to <strong>long-term stability, economic development, and transparent financial operations.</strong></p>
                        <span className='bg-(--savegreen) px-2 py-2.5 w-[45px] h-[45px] absolute top-0 translate-y-[-30%] flex justify-center items-center'>
                            <img src="/icons/check.svg" alt="" width="19px" />
                        </span>
                    </div>

                </div>
            </section>
        </>
    )
}
