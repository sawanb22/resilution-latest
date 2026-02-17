import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import style from "./common.module.css"
import { trackMetaEvent } from "../../utils/metaPixelTracking";

export const Navbar = () => {
    const [isopen, setOpen] = useState(false)
    const navigate = useNavigate()
    const {pathname} = useLocation()

    const scroller =()=>{
        let target = document.querySelector("#paradigm").offsetTop
        window.scroll(0,target)
    }

    const path_checker = () => {
        if(pathname!=="/"){
            navigate("/")
            setTimeout(() => {
                scroller()
            }, 200);
        }else{
            scroller()
        }
    }


    return (
        <nav className={style.nav + ' bg-(--dark)'}>
            <div className='sm:container mx-auto lg:px-5 xl:px-10 py-3 md:py-2 flex items-center justify-between max-sm:px-3'>
                <div className='flex gap-20'>
                    <Link to="/">
                        <img src="/logo.svg" alt="" />
                    </Link>
                    <div className='hidden md:flex text-(--light) text-sm gap-5'>
                        <Link to="/why-resilution" className='hover:text-(--savegreen)'>Why Resilution</Link>
                        <Link to="/blockchain-paradigm " className='hover:text-(--savegreen)'>Blockchain Paradigm </Link>
                        <Link to="/about" className='hover:text-(--savegreen)'>About </Link>
                        {/* <a href="#faq" className='hover:text-(--savegreen)'>FAQ</a> */}
                    </div>
                </div>
                <button
                className='hidden md:inline px-8 py-2 bg-(--savegreen) g_hover'
                onClick={() => {
                    trackMetaEvent("GetStartedClick", { location: "navbar_desktop" });
                    window.open("https://discord.com/invite/KG5WKCnkWW", "_blank", "noopener,noreferrer");
                }}
                >
                Get Started
                </button>
                <button className={`${style.menubtn} ${isopen && style.active} md:hidden`} onClick={() => { setOpen(!isopen) }}>
                    <span></span>
                    <span className='mt-1'></span>
                    <span className='mt-1'></span>
                </button>
            </div>
            <div className={`${style.snav} ${isopen && style.active} sm:container mx-auto md:hidden m`}>
                <div className='text-(--light) text-sm gap-5 pt-1 max-sm:px-3'>
                    <Link to="/why-resilution" className='hover:text-(--savegreen) block mt-2' onClick={() => { setOpen(false) }}>Why Resilution</Link>
                    <Link to="/blockchain-paradigm " className='hover:text-(--savegreen) block mt-2' onClick={() => { setOpen(false) }}>Blockchain Paradigm </Link>
                    <Link to="/about" className='hover:text-(--savegreen) block mt-2' onClick={() => { setOpen(false) }}>About </Link>
                    {/* <Link to="/#faq" className='hover:text-(--savegreen) block mt-2' onClick={() => { setOpen(false) }}>FAQ</Link> */}
                </div>
                <div className='pt-3 pb-5 max-sm:px-3'>
                    <button
                    className='px-8 text-sm py-2 bg-(--savegreen) g_hover'
                    onClick={() => {
                        trackMetaEvent("GetStartedClick", { location: "navbar_mobile" });
                        setOpen(false);
                        window.open("https://discord.com/invite/KG5WKCnkWW", "_blank", "noopener,noreferrer");
                    }}
                    >
                    Get Started
                    </button>
                </div>
            </div>
        </nav>
    )
}
