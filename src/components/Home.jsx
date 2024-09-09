import React, { useState } from 'react';
import NavBar from './NavBar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetUsers } from '../api/Request';
import { QUERIES } from "../constant/Queries";
import { useQuery } from '@tanstack/react-query';
import { styled } from '@mui/system';
import { Button } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import moment from 'moment';
import Delete from '../pages/Delete';
import { useGlobalContext } from '../stores/GlobalContext';
import { useNavigate,Link} from 'react-router-dom';
import {ROUTER} from "../constant/router"
import EditModal from '../pages/EditModal';
const Home = () => {
  const { openDeleteModal, openEditModal } = useGlobalContext();
  const navigate = useNavigate();
  const [sortedUser, setSortedUser] = useState([]);

  const { data: users, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERIES.Users],
    queryFn: GetUsers,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  const StyledContainer = styled("div")({
    width: "65%",
    margin: "20px auto"
  });

  const SortedContainer = styled("div")({
    display: 'flex',
    justifyContent: 'center',
    marginTop: "20px",
  });

  const sortUsers = (e) => {
    const sortedValue = e.target.value;
    const sortedData = [...users]; 

    sortedData.sort((a, b) => {
      if (sortedValue === "A-Z") {
        return a.fullName.localeCompare(b.fullName);
      } else if (sortedValue === "Z-A") {
        return b.fullName.localeCompare(a.fullName);
      } else if (sortedValue === "Low-to-High") {
        return a.age - b.age;
      } else if (sortedValue === "High-to-Low") {
        return b.age - a.age;
      }
      return 0;
    });

    setSortedUser(sortedData);
  };

  const resetSort = () => {
    setSortedUser(users); 
  };

  return (
    <>
      <NavBar />
      <p className='flex justify-center text-blue-700 text-4xl mt-6 font-bold'>Table</p>
      <SortedContainer>
        <p className='text-purple-700 font-semibold text-[18px]'>Sort Users</p>
        <select className='border w-12 ml-1 mr-2' onChange={sortUsers}>
          <option value=""></option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Low-to-High">Low-to-High</option>
          <option value="High-to-Low">High-to-Low</option>
        </select>
        <Button variant="contained" size='small' onClick={resetSort}>RESET SORT</Button>
      </SortedContainer>

      <StyledContainer>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>FullName</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Added_Time</TableCell>
                <TableCell>Updates</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(sortedUser.length ? sortedUser : users).map((user, index) => (
                <TableRow key={`${user.id}-${index}`}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{moment(user.createTime).fromNow()}</TableCell>
                  <TableCell sx={{ display: "flex", flexDirection: "column", width: "160px" }}>
                    <Button color="secondary" variant='contained' size='medium' onClick={() => openEditModal(user)}>MODAL EDIT</Button>
                    <Button sx={{ backgroundColor: "orange", marginTop: "5px" }} variant='contained' size='medium'>
                      <Link to={`${ROUTER.Editpages}/${user.id}`}>PAGE EDIT</Link>
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Button color='error' variant='contained' onClick={() => openDeleteModal(user)}><DeleteForeverIcon /></Button>
                    </div>
                    <div className='mt-2'>
                      <Button variant='contained' color='success'><Link to={`${ROUTER.DetailsPage}/${user.id}`}><RemoveRedEyeIcon /></Link></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledContainer>
      <Delete />
      <EditModal/>
    </>
  );
};

export default Home;

