import React,{createContext, memo, use, useEffect, useState} from 'react'
import { fetchCountriesByRegion } from '../util/fetchApi'
import { useQuery } from 'react-query'
import millify from 'millify'
const fields = ["name", "capital", "region", "population", "flags", "area", "cca3"]
export const MyContext = createContext()
const ContextProvider = memo(({children}) => {
    const [currentRegion, setCurrentRegion] = useState("")
    const [sortByPopulation, setSortByPopulation] = useState("")
    const [search,setSearch] = useState("")
    const [currentPage,setCurrentPage] = useState(1)
    const [population,setPopulation] = useState(null);
    const { data, isLoading, isFetching, refetch } = useQuery(["countriesByRegion", currentRegion], () => fetchCountriesByRegion(currentRegion, fields), {
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
    function sort(data, asc = true) {
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
    function calcPopulation(data1) {
      let total = 0;
      data1?.forEach(item => {
        total += item.population
      })
      return total
    }
    useEffect(() => {
      if(search!=="")setPopulation(null)
     else setPopulation(millify(calcPopulation(data)))
    },[data])
      return (
    <MyContext.Provider value={{
        currentRegion,
        setCurrentRegion,
        sortByPopulation,
        setSortByPopulation,
        search,
        setSearch,
        currentPage,
        setCurrentPage,
        data,
        isLoading,
        isFetching,
        refetch,
        population
    }}>
        {children}
    </MyContext.Provider>
  )
})
ContextProvider.displayName = "ContextProvider"

export default ContextProvider