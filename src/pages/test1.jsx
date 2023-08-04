import React, { useContext } from 'react'
import { MyContext } from '../../Context/context'

const Test1 = () => {
    const value = useContext(MyContext)
  return (
    <div>{value}</div>
  )
}

export default Test1