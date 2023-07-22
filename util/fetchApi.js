import axios from "axios"
import https from "https"
const agent = new https.Agent({
  rejectUnauthorized:false
})
export const fetchAllCountries = async(fields=[])=>{
    let url = "https://restcountries.com/v3.1/all?fields=";
    for(let i=0;i<fields.length;i++){
      url+=fields[i]+","
    }
    const {data} = await axios.get(url,{httpsAgent:agent});
    return data;
}
export const fetchCountryByName = async(name,fields=[])=>{
  let url = `https://restcountries.com/v3.1/name/${name}?fields=`
  for(let i=0;i<fields.length;i++){
    url+=fields[i]+","
  }
    const {data} = await axios.get(url,{httpsAgent:agent});
    return data;
}
export const fetchCountriesByRegion = async(region="",fields=[])=>{
  if(region.toLowerCase()==="")
    return fetchAllCountries(fields)

    let url = `https://restcountries.com/v3.1/region/${region}?fields=`
    for(let i=0;i<fields.length;i++){
      url+=fields[i]+","
    }
    const {data} = await axios.get(url,{httpsAgent:agent});
    return data;
}
export const fetchCountryByCode = async(code,fields=[])=>{
    let url = `https://restcountries.com/v3.1/alpha/${code}?fields=`
    for(let i=0;i<fields.length;i++){
      url+=fields[i]+","
    }
    const {data} = await axios.get(url,{httpsAgent:agent});
    return data;
}
