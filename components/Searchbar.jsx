import React,{FC,useState,useEffect, memo, useContext} from 'react'
import {BiSearch} from "react-icons/bi"
import { MyContext } from '../Context/context'

const Searchbar = memo(() => {
  const {search,setSearch} = useContext(MyContext)
  const handleOnChange = (e)=>{
    setSearch(e.target.value.trim())
  }
  return (
    <div className='
    h-16
    md:w-[50vw]
    lg:w-[450px] 
    bg-white
    dark:bg-dark-element
    custom-shadow
    rounded-md
    flex
    pl-10
    items-center
    gap-4
    '>
      <BiSearch className='w-6 h-6'/>
      <input type='text' placeholder='Search for a country...'
      className='
      w-full
      h-full
      outline-none
      bg-transparent
      text-lg
      tracking-wide
      font-semibold
      '
      value={search}
      onChange={handleOnChange}
      />
    </div>
  )
})
Searchbar.displayName = "Searchbar"
export default Searchbar