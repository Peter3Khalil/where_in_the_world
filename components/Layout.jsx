"use client";
import Head from 'next/head'
import React, { FC, useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer';
import SplashScreen from './SplashScreen';

const Layout = ({ children }) => {
    const [mode, setMode] = useState("dark");
    const [loading, setLoading] = useState(true)
    const handleMode = () => {
        setMode(mode => mode === "dark" ? "" : "dark")
    }
    useEffect(() => {
        setMode(localStorage.getItem("mode") || "")
    }, [])
    useEffect(() => {
        localStorage.setItem("mode", mode)
    }, [mode])

    useEffect(() => {
        const splashTimeout = setTimeout(() => {
            setLoading(false)
        }, 2000)
        return () => {
            clearTimeout(splashTimeout)
        }
    }, [])
    return (
        <>
            <Head>
                    <title>Where in the world?</title>
            </Head>


            <div className={mode}>
                {loading ? <SplashScreen /> :
                    <div className='
                            w-full
                            flex
                            flex-col
                            gap-6
                            min-h-screen 
                            bg-light-bg
                            dark:bg-dark-bg
                            dark:text-white
                            relative
                            '>
                        <header>
                            <Navbar mode={mode} setMode={handleMode} />
                        </header>
                        <main className='
                            mt-20
                            px-6
                            pb-20
                            lg:px-14
                            mb-12
                            '>
                            {children}
                        </main>
                        <footer className='self-center w-full absolute bottom-0 left-0'>
                            <Footer />
                        </footer>
                    </div>
                }
            </div>

        </>
    )
}

export default Layout