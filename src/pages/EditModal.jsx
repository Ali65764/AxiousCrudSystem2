import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useGlobalContext } from '../stores/GlobalContext';
import { useNavigate } from 'react-router-dom';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { EditSingleUser } from '../api/Request';
import { QUERIES } from '../constant/Queries';
import { ROUTER } from '../constant/router';
import { toast } from 'react-toastify';
import { isValidEmail, isValidPhone } from '../constant/ValidRegex';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const initialState = {
    fullName: "",
    age: 0,
    email: "",
    phone: "",
};

const EditModal = () => {
    const {
        showEdit,
        closeEditModal,
        editUser,
    } = useGlobalContext();

    const [userData, setUserData] = useState(initialState);
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const mutation = useMutation({
        mutationFn: (editedUser) => EditSingleUser(editUser.id, editedUser),
        onSuccess: () => {
            queryClient.invalidateQueries([QUERIES.SingleUser, editUser.id]);
            toast.success("User edited successfully", { autoClose: 1000 });
            setTimeout(() => {
                closeEditModal();
                navigate(ROUTER.Home);
            }, 1500);
        },
    });

    const handleEditUser = (event) => {
        event.preventDefault();
        if (!userData.fullName || !userData.email || !userData.age || !userData.phone) {
            toast.error("Please fill in all fields!!!", {
                autoClose: 1500,
            });
            return;
        }

        if (!isValidEmail(userData.email)) {
            toast.error("Wrong Email Address!!!", {
                autoClose: 1500,
            });
            return;
        }

        if (!isValidPhone(userData.phone)) {
            toast.error("Wrong Phone Number!!!", {
                autoClose: 1500,
            });
            return;
        }


        mutation.mutate(userData);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    useEffect(() => {
        if (editUser) {
            setUserData(editUser);
        }
    }, [editUser]);


    return (
        <Dialog
            open={showEdit}
            onClose={closeEditModal}
            aria-labelledby="edit-user-title"
            aria-describedby="edit-user-description"
        >
            <DialogTitle id="edit-user-title">
                {"Edit Product"}
            </DialogTitle>
            <Box
                component="form"
                sx={{ 
                    display: 'flex',
                    flexWrap:"wrap",
                    alignItems: 'center',
                    justifyContent:"center", 
                    '& .MuiTextField-root': { m: 1, width: '25ch' } 
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleEditUser}
            >
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="FullName"
                        name="fullName"
                        value={userData.fullName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="age"
                        name="age"
                        value={userData.age}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <Button type="submit" variant="contained" sx={{marginBottom:"20px"}} autoFocus>
                        SAVE CHANGES
                    </Button>
                </div>
            </Box>
        </Dialog>

    );
};

export default EditModal;
