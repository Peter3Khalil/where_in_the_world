import React from 'react'

const SplashScreen = () => {
    return (
        <div className='
    w-full
    h-screen
    bg-white
    dark:bg-dark-bg
    flex
    justify-center
    items-center
    dark:text-white
    text-black
    capitalize
    flex-col
    relative
    '>
           <h1 className='text-xl
                            font-bold
                            tracking-widest
    '> where in the world?</h1>
    
            <h1 className='text-sm text-gray-400 absolute bottom-0 mb-8'>Made by
                <span className='text-black dark:text-white font-semibold ml-1'>Peter Khalil</span>
            </h1>
        </div>
    )
}

export default SplashScreen