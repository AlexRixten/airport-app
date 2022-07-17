import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { useDebounce } from '../hook/debounce'
import { useInput } from '../hook/input'
import { IAirport, ServerResponse } from '../models/models'

export const Search = () => {

  const [airports, setAirports] = useState<IAirport[]>([])

  const input = useInput('')
  const debounce = useDebounce(input.value)

  async function searchAirports(){
    const response = await axios.get<ServerResponse<IAirport>>(`airports`, {
      params:{
        search: debounce,
        count: 10
      }})
      setAirports(response.data.results)
  }

  useEffect(() => {
    if(debounce.length > 3){
      searchAirports()
    }
  },[debounce])

  return (
    <div className='mb-4 relative'>
      <input 
        type="text"
        className='border py-2 px-4 mb-4 outline-0 w-full h-[42px]'
        placeholder='Type something here...'
        {...input}
      />
      <ul className="absolute list-none left-0 right-0 h-[200px] top-[42px] shadow-md bg-white">
        {airports.map(airport => (
          <li key={airport.id}>{airport.name}</li>
        ))}
      </ul>
    </div>
  )
}
