import {FC, memo} from "react"
import CountryCard from "./CountryCard"

const RenderCountriesComponents= ({ data })=>{
    return <>
      {data?.map((item) => {
        return (
          <div key={item.name.common + Date.now()} className='
      w-full
      h-[400px]
      lg:h-[350px]
      '>
            <CountryCard area={item.area} alt={item.flags.alt} name={item.name.common} region={item.region}
              capital={item?.capital} population={item.population} flag={item.flags.svg} cca3={item.cca3}/>
          </div>
  
        )
      })}
    </>
}
const MemoizedRenderCountriesComponents = memo(RenderCountriesComponents)
export default MemoizedRenderCountriesComponents;
