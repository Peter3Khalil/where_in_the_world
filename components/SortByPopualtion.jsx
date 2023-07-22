import React, { useState, memo } from 'react'
import { FaAngleDown } from "react-icons/fa"
const list = ['asc',"desc"]
const SortByPopulation = memo(({sortByPopulation,setSortByPopulation}) => {
  const [show, setShow] = useState(false)
  return (
    <div className='
    w-[150px]
    h-14
    md:w-[180px]
    md:h-16
    bg-white
    dark:bg-dark-element
    custom-shadow
    rounded-md
    gap-1
    cursor-pointer
    relative
    '
    >
      <div className='
      w-full
      h-full
      flex
      justify-center
      items-center
      gap-2
      text-sm
      md:text-[16px]
      '
      onClick={() => setShow(!show)}
      >
        <h1 className='capitalize font-[400]'>Sort By Population</h1>
        <FaAngleDown className='w-5 h-5' />
      </div>
      <div className='
      w-full
      bg-white
      dark:bg-dark-element
      custom-shadow
      absolute
      top-20
      rounded-md
      z-20
      '
        style={{ display: show ? "block" : "none" }}
      >
      {list.map(item => {
          return (<h1 key={item} className={
            item.toLowerCase()===sortByPopulation.toLowerCase()?
            `font-semibold capitalize h-10  dark:text-black
             bg-slate-300 flex justify-center items-center
             text-lg
             `
            :
            `font-semibold capitalize h-10 dark:hover:bg-slate-500 hover:bg-slate-100 flex justify-center items-center`
          }
            onClick={() => {
                sortByPopulation===item?setSortByPopulation(""):setSortByPopulation(item)
                setShow(!show)
            }
            }
          >
            {item}
          </h1>)
        })}
      </div>
    </div>
  )
})
SortByPopulation.displayName = "SortByPopulation"
export default SortByPopulation