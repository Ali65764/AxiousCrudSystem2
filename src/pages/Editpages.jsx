import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate, useParams } from 'react-router-dom';
import { EditSingleUser, GetSingleUser } from '../api/Request';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERIES } from '../constant/Queries';
import { ROUTER } from '../constant/router';
import { toast } from 'react-toastify';
import { isValidEmail, isValidPhone } from '../constant/ValidRegex';


const initialState = {
  fullName: "",
  age: 0,
  email: "",
  phone: "",
}

function Editpages() {
  const [editUser, setEditUser] = useState(initialState);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [QUERIES.SingleUser, id],
    queryFn: () => GetSingleUser(id),
  });

  const mutation = useMutation({
    mutationFn: (editedUser) => EditSingleUser(id,editedUser),
    onSuccess: () => {
      queryClient.invalidateQueries([QUERIES.SingleUser, id]);
      toast.success("User edited successfully", { autoClose: 1000 });
      setTimeout(() => {
        navigate(ROUTER.Home);
      }, 1500);
    },
  });

  const handleEditUser = (event) => {
    event.preventDefault(); 
    if(!editUser.fullName || !editUser.email || !editUser.age || !editUser.phone){
      toast.error("Please fill in all fields!!!",{
        autoClose:1500,
      })
      return;
    }

    if (!isValidEmail(editUser.email)) {
      toast.error("Wrong Email Address!!!", {
        autoClose: 1500,
      })
      return;
    }

    if (!isValidPhone(editUser.phone)) {
      toast.error("Wrong Phone Number!!!", {
        autoClose: 1500,
      })
      return;
    }
    setLoading(true)
    mutation.mutate(editUser);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditUser({
      ...editUser,
      [name]: value,
    });
  };

  useEffect(() => {
    if (data) {
      setEditUser(data);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user data</div>;

  return (
    <>
      <NavBar />
      <div>
        <p className="flex justify-center font-semibold text-4xl mt-6 text-blue-700">Update User</p>
      </div>
      <Box
        component="form"
        sx={{ '& .MuiTextField-root': { m: 1, width: '70ch', display: 'flex', flexDirection: "column", margin: "15px auto" } }}
        noValidate
        autoComplete="off"
        onSubmit={handleEditUser}
      >
        <div className="mt-10">
          <TextField
            id="fullname"
            name="fullName"
            label="Please Enter FullName"
            variant="standard"
            value={editUser.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-9">
          <TextField
            id="email"
            name="email"
            label="Please Enter Email"
            variant="standard"
            value={editUser.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-11">
          <TextField
            id="standard-number"
            name="age"
            label="Please Enter Age"
            variant="standard"
            value={editUser.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-9">
          <TextField
            id="phone"
            name="phone"
            label="Please Enter Phone Number"
            variant="standard"
            value={editUser.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex justify-center mt-11">
          <Button type="submit" variant="contained" color="secondary" sx={{ width: "78ch" }}>
            {loading ? "LOADING..." : "UPDATE USER"}
          </Button>
        </div>
      </Box>
    </>
  );
}

export default Editpages;
