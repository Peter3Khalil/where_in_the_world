import React, { FC, useEffect, useState,useRef } from 'react'


const Button = ({ text, handleOnClick, disabled }) => {
    return <button type='button' onClick={handleOnClick}
        className='
    flex
    justify-center
    items-center
    capitalize
    dark:bg-dark-element
    dark:text-white
    bg-white
    text-light-text
    custom-shadow
    rounded-md
    px-6
    py-3
    disabled:bg-slate-100
    disabled:text-gray-400
    dark:disabled:bg-gray-800
    dark:disabled:text-gray-500
    '
        disabled={disabled}
    >
        {text}
    </button>
}

const Pagination= ({ data,itemsPerPage,setData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const goToPreviosPage = () => {
        setCurrentPage(prevPage => prevPage - 1)
    }
    const goToNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1)
    }
    const goToPage = (page) => {
        setCurrentPage(page)
    }
   useEffect(()=>{
    window.scrollTo({top:0})
    setData(data?.slice(startIndex,endIndex))
   },[currentPage])
    return (
        <div className='
    w-full
    flex
    gap-3
    items-center
    '
            style={{ display: totalPages <= 1 ? "none" : "flex" }}
        >
            <Button key={"prev"} disabled={currentPage === 1} text='prev' handleOnClick={goToPreviosPage} />
            <div className='w-24 overflow-auto md:w-48 lg:w-52 flex gap-3'>
                {
                    Array.from({ length: totalPages }).map((_item, i) => {
                        return <span key={i} onClick={() => goToPage(i + 1)}
                            className={`
                    w-6 h-6 
                    bg-white 
                    dark:bg-dark-element
                    shadow-sm
                    rounded-full
                    flex
                    justify-center
                    items-center
                    hover:bg-slate-100
                    dark:hover:bg-slate-800
                    cursor-pointer
                    `}
                    style={{backgroundColor:currentPage===(i+1)?"skyblue":""}}
                        >
                            {i + 1}
                        </span>
                    })
                }
            </div>
            <Button key={"next"} disabled={currentPage === totalPages} text='next' handleOnClick={goToNextPage} />

        </div>
    )
}

export default Pagination