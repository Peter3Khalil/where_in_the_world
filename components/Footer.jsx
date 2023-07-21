import { useRouter } from 'next/router'
import React from 'react'
import { AiFillGithub } from "react-icons/ai"
const Footer = () => {
  const router = useRouter()
  return (
    <div className='
    w-full
    min-h-full
    flex
    items-center
    justify-center
    border-t-2
    dark:border-t
    flex-col
    py-4
    gap-3
    '>
      <div className='
      flex
      items-center
      gap-3
      cursor-pointer
      '
      onClick={() => router.push("https://github.com/Peter3Khalil/where_in_the_world")}
      >
        <AiFillGithub className='
        w-9
        h-9 
        ' />
        <h1 className='capitalize text-sm'>Source code</h1>
      </div>
      <h1 className='text-sm text-gray-400'>Made by <span className='text-black font-semibold dark:text-white ml-1'>Peter Khalil</span></h1>
    </div>
  )
}

export default Footer