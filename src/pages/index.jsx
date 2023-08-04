//https://gitlab.com/restcountries/restcountries

import React, { useState, useEffect, useContext } from 'react'
import Searchbar from '../../components/Searchbar'
import Filter from '../../components/Filter'
import MemoizedRenderCountriesComponents from '../../components/RenderCountriesComponents';
import { BsFillArrowUpCircleFill } from "react-icons/bs"
import ClipLoader from "react-spinners/ClipLoader";
import Head from 'next/head';
import Pagination from '../../components/Pagination';
import SortByPopulation from '../../components/SortByPopualtion';
import { MyContext } from '../../Context/context';

const Home = () => {
  const { sortByPopulation, data, isLoading, isFetching, refetch, population } = useContext(MyContext)
  const [scrollY, setScrollY] = useState(0);
  const [countries, setCountries] = useState(data?.slice(0, 15))
  const handleScroll = () => {
    setScrollY(window.scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
  useEffect(() => {
    refetch()
  }, [sortByPopulation])
  return (
    <>
      <Head>
        <title>Where in the world?</title>
        <link rel='icon' href='icon.png' />
      </Head>
      <div className='
    w-full
    flex
    flex-col
    items-center
    gap-10
    lg:gap-12
    relative
    '>
        <div className='
      w-full
      flex
      flex-col
      gap-10
      relative
      md:flex-row
      md:justify-between
      '
        >
          <Searchbar />
          <div className='
          
          flex
          flex-col
          items-center
          gap-4
          lg:flex-row
          '>
            <div className='
            flex
            gap-3
            lg:gap-5
            lg:order-1
            '>
              <Filter />
              <SortByPopulation />
            </div>
            <div className='capitalize md:hidden 
            flex 
            flex-col 
            items-center
            lg:flex lg:flex-col lg:items-center
            '>
              <h1> Countries: <span className='font-bold mx-1'>{data?.length}</span></h1>
              {population && <h1>Total Population:<span className='font-bold mx-1'>{population}</span></h1>}
            </div>
          </div>
        </div>
        <h1 className='hidden capitalize gap-1  md:flex md:flex-col md:items-center md:self-center lg:hidden'>
          <h1> Countries: <span className='font-bold mx-1'>{data?.length}</span></h1>
          {population && <h1>Total Population:<span className='font-bold mx-1'>{population}</span></h1>}
        </h1>

        {/* Countries Container */}
        <div className='
      w-full
      flex
      flex-col
      gap-10
      justify-center
      items-center
      md:grid
      md:grid-cols-2
      md:px-0
      lg:grid-cols-5
      lg:gap-x-10
      lg:gap-y-10
      lg:px-0
      '>
          <MemoizedRenderCountriesComponents data={countries} />
          {!isLoading && !isFetching && !data?.length &&
            <div className='flex w-full md:col-span-2 lg:col-span-5 justify-center '>
              <h1 className='text-3xl'>
                No Results
              </h1>
            </div>
          }
          <div className='flex w-full md:col-span-2 lg:col-span-5 justify-center'>
            {<ClipLoader
              loading={isLoading || isFetching}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />}
          </div>
        </div>

        <Pagination data={data} setData={setCountries} itemsPerPage={15} />
        <ScrollToTopComponent scrollY={scrollY} />
      </div>
    </>
  )
}


const ScrollToTopComponent = ({ scrollY }) => {
  return <>
    {
      scrollY >= 500 &&
      <div className='
  fixed
  bottom-10
  right-5
  z-50
  cursor-pointer
  '
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <BsFillArrowUpCircleFill className='w-6 h-6' />
      </div>
    }
  </>
}


export default Home