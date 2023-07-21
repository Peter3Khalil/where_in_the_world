import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import Image from "next/image";
import { AiOutlineArrowLeft } from "react-icons/ai"
import formatNumber from '../../util/formatNumber';
import { useQuery, QueryClient, dehydrate } from 'react-query';
import { fetchCountryByCode, fetchCountryByName } from '../../util/fetchApi';
const fields = ["name", "population", "region", "capital", "languages", "currencies", "flags", "tld", "area", "idd", "borders", "subregion"]


const PropertyBox = ({ property, value }) => {
  return (<>
    <div className='flex text-sm'>
      <h1 className='capitalize font-medium '>{property}</h1>
      <span className='mr-[4px]'>:</span>
      <h3 className='capitalize'>{value}</h3>
    </div>
  </>)
}
const CountryDetails = ({ dehydratedState, borders }) => {
  const data = dehydratedState.queries[0].state.data[0]
  let { flags, name, population, area, capital, region, subregion, currencies, tld, idd, languages } = data
  languages = Object.values(languages);
  currencies = Object.values(currencies)
  idd = Object.values(idd)
  idd = idd[0] + idd[1][0]
  let nativeName = Object.values(name?.nativeName)[0]?.official

  return (
    <div className='
    w-full
    flex
    flex-col
    gap-12
    '>
      <Link href={"/"} type='button'
        className='
      w-24
      h-8
      custom-shadow
      flex
      justify-center
      items-center
      rounded-md
      gap-1
      text-sm
      dark:bg-dark-element
      '
      >
        <AiOutlineArrowLeft />
        <h1 className='capitalize font-thin'>back</h1>
      </Link>
      <div className='
      w-full
      flex
      flex-col
      gap-8
      lg:flex-row
      lg:justify-between
      lg:gap-20
      lg:items-center
      '>
        <div className='
        w-full
        h-[250px]
        relative
        md:h-[400px]
        lg:h-[500px]
        '>
          <Image src={flags.svg} width={100} height={100} alt={flags.alt}
            className='
          absolute
          object-cover
          top-0
          left-0
          w-full
          h-full
          '
          />
        </div>
        <div className='
        w-full
        lg:h-[400px]
        '>
          <h1 className='text-xl font-bold mb-5 lg:mb-10 lg:text-3xl'>{name.common}</h1>

          <div className='
          flex
          flex-col
          gap-8
          relative
          h-full
          '>
            <div className='
            flex
            flex-col
            gap-8
            lg:flex-row
            lg:justify-between
            '>
              <div className='
          flex
          flex-col
          gap-3
          '>
                <PropertyBox property={"native name"} value={nativeName || name.common} />
                <PropertyBox property={"population"} value={formatNumber(population)} />
                <PropertyBox property={"region"} value={region} />
                {subregion && <PropertyBox property={"sub region"} value={subregion} />}
                {capital.length !== 0 && <PropertyBox property={"capital"} value={capital} />}
              </div>
              <div className='
          flex
          flex-col
          gap-3
          '>
                <PropertyBox property={"area"} value={formatNumber(area) + " km²"} />
                {tld[0] && <PropertyBox property={"top level domain"} value={tld[0]} />}
                {currencies.length !== 0 && <PropertyBox property={"currencies"} value={currencies[0]?.name + ` (${currencies[0]?.symbol})`} />}
                {languages.length !== 0 ? <PropertyBox property={"languages"} value={languages?.join()} />
                  : <PropertyBox property={"languages"} value={"it does not have an official language"} />
                }
                {idd !== undefined && <PropertyBox property={"calling code"} value={idd} />}
              </div>
            </div>

            {borders.length !== 0 &&
              <div className='
            w-full
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
            lg:absolute
            lg:bottom-0
            lg:flex-col
            lg:items-start
            '>
                <h1 className='capitalize text-lg'>border countries:</h1>
                <div className='
              grid
              grid-cols-3
              w-full
              items-center
              gap-3
              md:flex-row
              md:flex
              md:justify-between
              '>
                  {borders.map((item, i) => {
                    return <div key={i + item.name.common} className='
                    w-28
                    min-h-[2.25rem]
                    md:w-36
                    '>
                      <BorderComponents key={i + item.name.common} name={item.name.common} />
                    </div>
                  })}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const BorderComponents = ({ name }) => {
  return <Link href={`/${name}`} className='
w-full
h-full
flex
justify-center
items-center
rounded-md
shadow-md
dark:bg-dark-element
line-clamp-1
px-3
py-1
'
    title={name}
  >
    <h1 className='overflow-hidden text-ellipsis'>{name}</h1>
  </Link>
}

export const getServerSideProps = async ({ params }) => {
  const { name } = params;
  let { borders } = (await fetchCountryByName(name, ["borders"]))[0]
  borders = borders.map(item => fetchCountryByCode(item, ["name"]))
  borders = await Promise.all(borders)
  borders = borders.slice(0, 3)

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery(["country", name], () => fetchCountryByName(name, fields));
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      borders
    }
  }
}
export default CountryDetails