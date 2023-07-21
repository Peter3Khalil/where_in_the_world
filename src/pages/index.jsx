//https://gitlab.com/restcountries/restcountries

import React, { useState, useEffect } from 'react'
import Searchbar from '../../components/Searchbar'
import Filter from '../../components/Filter'
import MemoizedRenderCountriesComponents from '../../components/RenderCountriesComponents';
import { fetchCountriesByRegion } from '../../util/fetchApi'
import { QueryClient, dehydrate, useQuery } from "react-query"
import { BsFillArrowUpCircleFill } from "react-icons/bs"
import ClipLoader from "react-spinners/ClipLoader";
import Head from 'next/head';
import Pagination from '../../components/Pagination';
const fields = ["name", "capital", "region", "population", "flags", "area"]

const Home = () => {
  const [currentRegion, setCurrentRegion] = useState("all")
  const [search, setSearch] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const { data, isLoading, isFetching } = useQuery(["countriesByRegion", currentRegion], () => fetchCountriesByRegion(currentRegion, fields), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: data => {
      if (search === "") {
        let sortedNames = data.map(item => item.name.common).sort();
        let sortedData = []
        for (let i = 0; i < sortedNames.length; i++) {
          data.forEach(item => {
            if (item.name.common === sortedNames[i]) {
              sortedData.push(item)
            }
          })
        }
        return sortedData;
      }

      let arrayIncludesSearchValue = data.filter((item) => item.name.common.toLowerCase().includes(search.toLowerCase()))
      let arrayStartWithSearchValue = arrayIncludesSearchValue.filter((item) => item.name.common.toLowerCase().startsWith(search.toLowerCase()))

      let sortedNames = arrayStartWithSearchValue.map(item => item.name.common.toLowerCase()).sort();
      let sortedData = []
      for (let i = 0; i < sortedNames.length; i++) {
        arrayStartWithSearchValue.forEach(item => {
          if (item.name.common.toLowerCase() === sortedNames[i].toLowerCase()) {
            sortedData.push(item)
          }
        })
      }

      let array = new Set([...sortedData, ...arrayIncludesSearchValue])
      array = Array.from(array)
      return array
    }
  })
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
  return (
    <>
      <Head>
        <title>Where in the world?</title>
        <link rel='icon' href='clipart-earth-animated-19.png' />
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
      '>
          <Searchbar setSearch={setSearch} />
          <div className='
        flex
        justify-between
        items-center
        lg:gap-5
        '>
            <div className='lg:order-2'>
              <Filter currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} />
            </div>
            <h1 className='capitalize flex gap-1 md:hidden lg:flex lg:order-1'>
              result:<span>{data?.length}</span> {currentRegion.toLowerCase() === "all" ? "" : `in ${currentRegion}`}
            </h1>
          </div>
        </div>
        <h1 className='hidden capitalize gap-1  md:flex self-start lg:hidden'>
          result:<span>{data?.length}</span> {currentRegion.toLowerCase() === "all" ? "" : `in ${currentRegion}`}
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
        onClick={() => window.scrollTo({ top: 0 })}
      >
        <BsFillArrowUpCircleFill className='w-6 h-6' />
      </div>
    }
  </>
}


export async function getStaticProps() {
  const queryClient = new QueryClient();
  // // Prefetching the user data
  await queryClient.prefetchQuery(['countriesByRegion', "all"], () => fetchCountriesByRegion("all", fields));
  return {
    props: {
      // Serializing the query client to pass it to the client-side React Query setup
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default Home