import React,{FC,useState,useEffect, memo} from 'react'
import {BiSearch} from "react-icons/bi"

const Searchbar = memo(({setSearch}) => {
  const [value,setValue] = useState("")
  const handleOnChange = (e)=>{
    setValue(e.target.value)
  }
  useEffect(()=>{
    setSearch(value.trim())
  },[value,setSearch])
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
      value={value}
      onChange={handleOnChange}
      />
    </div>
  )
})
Searchbar.displayName = "Searchbar"
export default Searchbar