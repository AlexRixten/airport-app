import React from 'react'
import { useParams } from 'react-router-dom'


export const AirportDetailPage = () => {

  const params = useParams<'id'>()
  return (
    <div className='container mx-auto max-w-[1140px] pt-5'>
      <h1>Airport {params.id}</h1>
    </div>

  )
}
