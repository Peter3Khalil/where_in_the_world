import React, { FC, useEffect, useState, useRef, memo } from 'react'




const Pagination = memo(({ data, itemsPerPage, setData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data?.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const next = () => {
        setCurrentPage(prev => prev === totalPages ? totalPages : prev + 1)
    }
    const previous = () => {
        setCurrentPage(prev => prev === 1 ? prev : prev - 1)
    }

    useEffect(() => {
        setData(data?.slice(0, itemsPerPage))
        setCurrentPage(1)
    }, [data]);

    useEffect(() => {
        setData(data?.slice(startIndex, endIndex))
    }, [currentPage])

    return (
        <>
            {(data?.length !== 0 && itemsPerPage <= data?.length) &&
                <div className='flex gap-2'>
                    <Button text={"prev"} onClick={previous} disabled={currentPage === 1} />
                    <Button text={"next"} onClick={next} disabled={currentPage === totalPages} />
                </div>
            }
        </>
    )
})
Pagination.displayName = "Pagination"
const Button = ({text,onClick,disabled=false})=>{
    return(<button type='button' className={
    disabled? `
    flex
    justify-center
    items-center
    capitalize
    w-20
    shadow-md
    rounded-md
    py-1
    opacity-60
    scale-75
    dark:bg-dark-element
    mb-14
    `
    : 
    `flex
    justify-center
    items-center
    capitalize
    w-20
    shadow-md
    rounded-md
    py-1
    dark:bg-dark-element
    mb-14
    `}
    disabled={disabled}
    onClick={onClick}
    >
      {text}
    </button>)
  }
export default Pagination