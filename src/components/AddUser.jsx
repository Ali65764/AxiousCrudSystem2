import React, { useState } from 'react'
import NavBar from './NavBar'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { AddSingleUser } from '../api/Request';
import { toast } from 'react-toastify';
import { ROUTER } from "../constant/router"
import moment from 'moment';
import { isValidEmail, isValidPhone } from '../constant/ValidRegex';

const AddUser = () => {
  const initialState = {
    fullName: "",
    age: 0,
    email: "",
    phone: "",
  }

  const [newUser, setNewUser] = useState(initialState);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: AddSingleUser,
    onSuccess: () => {
      setNewUser(initialState)
      toast.success("User Added Successfully!!!", {
        autoClose: 1000
      })
      setTimeout(() => {
        navigate(ROUTER.Home)
      }, 1500)
    },
    onError: (error) => {
      toast.error("User don't Added Successfully!!!", {
        autoClose: 1500
      })
    }
  })

  const handleAddUser = async () => {
    if(!newUser.fullName || !newUser.email || !newUser.age || !newUser.phone){
      toast.error("Please fill in all fields!!!",{
        autoClose:1500,
      })
      return;
    }

    if (!isValidEmail(newUser.email)) {
      toast.error("Wrong Email Address!!!", {
        autoClose: 1500,
      })
      return;
    }

    if (!isValidPhone(newUser.phone)) {
      toast.error("Wrong Phone Number!!!", {
        autoClose: 1500,
      })
      return;
    }

    const createDate = moment().valueOf();
    const userWithDate = { ...newUser, createTime: createDate }
    setLoading(true)
    mutation.mutate(userWithDate)
  }

  const handleInputChange = (event)=>{
    const {name,value} = event.target;
    setNewUser({
      ...newUser,
      [name]:value,
    })
  }
  return (
    <>
      <NavBar />
      <div>
        <p className='flex justify-center font-semibold text-4xl mt-6 text-blue-700'>Add User</p>
      </div>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '70ch', display: 'flex', flexDirection: "column", margin: "15px auto", } }}
        noValidate
        autoComplete="off"
      >
        <div className='mt-10'>
          <TextField
            id="fullname"
            name="fullName"
            label="Please Enter FullName"
            multiline
            variant="standard"
            value={newUser.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className='mt-9'>
          <TextField
            id="email"
            name="email"
            label="Please Enter Email"
            multiline
            variant="standard"
            value={newUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div className='mt-11'>
          <TextField
            id="standard-number"
            name="age"
            type="text"
            multiline
            variant="standard"
            value={newUser.age}
            onChange={handleInputChange}
          />
        </div>
        <div className='mt-9'>
          <TextField
            id="phone"
            name="phone"
            label="Please Enter Phone Number"
            multiline
            variant="standard"
            value={newUser.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex justify-center mt-11'>
          <Button variant='contained' color='secondary' sx={{ width: "78ch" }} onClick={handleAddUser}>{loading ? "LOADING..." : "ADD USER"}</Button>
        </div>
      </Box>
    </>
  )
}

export default AddUser
