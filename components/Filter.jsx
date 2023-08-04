import React, { useState,FC, memo } from 'react'
import { FaAngleDown } from "react-icons/fa"




const regions = ["Africa","Asia","Europe","Americas","Antarctic","Oceania"]
const Filter = memo(({setCurrentRegion,currentRegion}) => {
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
      text-[12px]
      md:text-[16px]
      '
      onClick={() => setShow(!show)}

      >
        <h1 className='capitalize font-[400]'>
          {currentRegion?currentRegion:"filter by region"}
        </h1>
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
        {regions.map(item => {
          return (<h1 key={item} className={
            item.toLowerCase()===currentRegion.toLowerCase()?
            `font-semibold capitalize h-10  dark:text-black
             bg-slate-300 flex justify-center items-center
             text-lg
             `
            :
            `font-semibold capitalize h-10 dark:hover:bg-slate-500 hover:bg-slate-100 flex justify-center items-center`
          }
            onClick={() => {
              item.toLowerCase()===currentRegion.toLowerCase() ?setCurrentRegion(""):setCurrentRegion(item)
              setShow(!show)}}
          >
            {item}
          </h1>)
        })}
      </div>
    </div>
  )
})
Filter.displayName = "Filter"
export default Filter