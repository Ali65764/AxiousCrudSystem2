import React from 'react'
import { GetSingleUser } from '../api/Request'
import { QUERIES } from '../constant/Queries'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import NavBar from "../components/NavBar"
import {ROUTER} from "../constant/router"
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
const DetailsPage = () => {

  const { id } = useParams()

  const { data: user, isLoading, isError } = useQuery({
    queryKey: [QUERIES.SingleUser, id],
    queryFn: () => GetSingleUser(id)
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <>
      <NavBar />
      <div className='w-full'>
        <div className='m-auto max-w-md my-32 bg-white rounded-md py-8 text-[17px]'>
          <h1 className='text-3xl ml-6'><strong>Datas of {user.fullName}</strong></h1>
          <p className='mt-2 ml-6'><strong>Name:</strong> {user.fullName}</p>
          <p className='text-gray-600 ml-6 mt-2'><strong>Email:</strong> {user.email}</p>
          <p className='text-gray-600 mt-2 ml-6'><strong>Age:</strong> {user.age}</p>
          <p className='text-gray-600 mt-2 ml-6'><strong>Phone:</strong> {user.phone}</p>
          <Link to={ROUTER.Home} className='flex justify-center mt-7'><Button variant="contained">GO BACK</Button></Link>
        </div>
      </div>


    </>
  )
}

export default DetailsPage