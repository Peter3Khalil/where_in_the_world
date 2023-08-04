//https://gitlab.com/restcountries/restcountries

import React, { useState, useEffect } from 'react'
import Searchbar from '../../components/Searchbar'
import Filter from '../../components/Filter'
import MemoizedRenderCountriesComponents from '../../components/RenderCountriesComponents';
import { fetchCountriesByRegion } from '../../util/fetchApi'
import { useQuery } from "react-query"
import { BsFillArrowUpCircleFill } from "react-icons/bs"
import ClipLoader from "react-spinners/ClipLoader";
import Head from 'next/head';
import Pagination from '../../components/Pagination';
import SortByPopulation from '../../components/SortByPopualtion';
const fields = ["name", "capital", "region", "population", "flags", "area","cca3"]

const Home = () => {
  const [currentRegion, setCurrentRegion] = useState("")
  const [sortByPopulation, setSortByPopulation] = useState("")
  const [search, setSearch] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const { data, isLoading, isFetching,refetch } = useQuery(["countriesByRegion", currentRegion], () => fetchCountriesByRegion(currentRegion, fields), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    select: data => {
      data = data.filter(item => item.population !== 0)
      if (search === "") {
        let sortedNames = data.map(item => item.name.common).sort();
        let sortedDataAlpha = []
        for (let i = 0; i < sortedNames.length; i++) {
          data.forEach(item => {
            if (item.name.common === sortedNames[i]) {
              sortedDataAlpha.push(item)
            }
          })
        }
        if (sortByPopulation === "asc")
          return sort(sortedDataAlpha)
        else if (sortByPopulation === "desc") return sort(sortedDataAlpha, false)
        else return sortedDataAlpha
      }

      let arrayIncludesSearchValue = data.filter((item) => item.name.common.toLowerCase().includes(search.toLowerCase()))
      let arrayStartWithSearchValue = arrayIncludesSearchValue.filter((item) => item.name.common.toLowerCase().startsWith(search.toLowerCase()))

      let sortedNames = arrayStartWithSearchValue.map(item => item.name.common.toLowerCase()).sort();
      let sortedDataAlpha = []
      for (let i = 0; i < sortedNames.length; i++) {
        arrayStartWithSearchValue.forEach(item => {
          if (item.name.common.toLowerCase() === sortedNames[i].toLowerCase()) {
            sortedDataAlpha.push(item)
          }
        })
      }

      let array = new Set([...sortedDataAlpha, ...arrayIncludesSearchValue])
      array = Array.from(array)
      if (sortByPopulation === "asc") return sort(array)
      else if (sortByPopulation === "desc") return sort(array, false)
      else return array
    }
  })
  const [countries, setCountries] = useState(data?.slice(0, 15))
  const handleScroll = () => {
    setScrollY(window.scrollY)
  }
  function sort(data, asc = true){
    for (let i = 1; i < data?.length; i++) {
      let currentElement = data[i];
      let j = i - 1;
      if (asc)
        while (j >= 0 && data[j]?.population > currentElement.population) {
          data[j + 1] = data[j];
          j--;
        }
      else
        while (j >= 0 && data[j]?.population <= currentElement.population) {
          data[j + 1] = data[j];
          j--;
        }
      data[j + 1] = currentElement;
    }
    return data
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [])
useEffect(()=>{
refetch()
},[sortByPopulation])
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
          <Searchbar setSearch={setSearch} />
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
              <Filter currentRegion={currentRegion} setCurrentRegion={setCurrentRegion} />
              <SortByPopulation setSortByPopulation={setSortByPopulation} sortByPopulation={sortByPopulation} />
            </div>
            <h1 className='capitalize md:hidden lg:flex'>
              result: <span className='font-bold mx-1'>{data?.length}</span>
            </h1>
          </div>
        </div>
        <h1 className='hidden capitalize gap-1  md:flex md:self-start lg:hidden'>
          result: <span className='font-bold mx-1'>{data?.length}</span>
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
        onClick={() => window.scrollTo({ top: 0 ,behavior:"smooth"})}
      >
        <BsFillArrowUpCircleFill className='w-6 h-6' />
      </div>
    }
  </>
}


export default Home