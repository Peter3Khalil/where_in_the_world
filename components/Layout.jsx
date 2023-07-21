"use client";
import Head from 'next/head'
import React,{FC,useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer';

const Layout = ({children}) => {
    const [mode,setMode] = useState("");
    const handleMode = ()=>{
        setMode(mode=>mode==="dark"?"":"dark")
    }
  return (
    <>
    <Head>
        <title>where in the world</title>
    </Head>
    <div className={mode}>
    <div className='
     w-full
     flex
     flex-col
     gap-6
     min-h-screen 
     bg-light-bg
     dark:bg-dark-bg
     dark:text-white
    '>
        <header>
            <Navbar mode={mode} setMode={handleMode}/>
        </header>
        <main className='
        mt-20
        px-6
        pb-20
        lg:px-14
        '>
            {children}
        </main>
        <footer className='self-center w-full'>
            <Footer/>
        </footer>
        </div>
    </div>
    </>
  )
}

export default Layout