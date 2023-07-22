 "use client";
import React, { FC, useMemo, useRef,memo } from 'react'
import formatNumber  from '../util/formatNumber'
import Link from 'next/link';
import Image from 'next/image';
import millify from "millify";
import { useRouter } from 'next/router';

const PropertyBox = ({ name, value ,title}) => {
  return (
    <div key={Date.now()} className='flex overflow-hidden'>
      <h2 className='capitalize font-semibold'>
        {name}
      </h2>
      <span className='mr-1'>:</span>
      <span className='text-left  text-ellipsis line-clamp-1' title={title}>{value}</span>
    </div>
  )
}

const CountryCard = ({ alt,flag, population, region, capital, name,area,cca3 }) => {
  const router = useRouter()
  return (<>
    <button onClick={()=>router.push(`/${cca3}`)}  className='
    w-full
    h-full
    lg:bg-white
    custom-shadow
    rounded-md
    flex
    flex-col
    gap-6
    pb-6
    dark:bg-dark-element
    lg:hover:scale-110
    transition-transform
    ease-in-out
    duration-300
    '>
      <div className='
      w-full
      h-48
      lg:h-36
      relative
      '
      >
          <Image className='w-full h-full 
          rounded-ss-md
          rounded-se-md
          object-cover absolute top-0 left-0' src={flag} width={100} height={100} 
          alt={`${alt}`}/>
       
      </div>
      <div className='
      flex
      flex-col
      px-6
      text-left
      '>
        <h1 className='
        mb-3
        capitalize
        font-bold
        text-xl
        overflow-hidden
        text-ellipsis
        line-clamp-2
        '
          title={name}
        >
          {name}
        </h1>
        <div className='flex flex-col gap-1'>
          <PropertyBox name={"population"} title={formatNumber(population)} value={millify(population)} />
          <PropertyBox name={"region"} title={region} value={region} />
          {capital?.length!==0 && <PropertyBox name={"capital"} title={capital} value={capital} />}
          <PropertyBox name={"area"} title={formatNumber(area)+" km²"} value={millify(area,{units:["","K","Million"]})+" km²"} />
        </div>
      </div>
    </button>
  </>
  )
}
CountryCard.displayName = "CountryCard"

export default CountryCard