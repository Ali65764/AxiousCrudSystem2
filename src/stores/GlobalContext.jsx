import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => { 
  const [show, setShow] = useState(false);
  const [deletedUser, setDeletedUser] = useState(null);
  const [showEdit,setShowEdit] = useState(false);
  const [editUser,setEditUser] = useState(null)

  const openDeleteModal = (user) => {
    setShow(true);
    setDeletedUser(user);
  };

  const closeDeleteModal = () => {
    setShow(false);
    setDeletedUser(null);
  };

  const openEditModal = (user) => { 
    setShowEdit(true);
    setEditUser(user);
  };

  const closeEditModal = () => {
    setShowEdit(false);
    setEditUser(null);
  };
  const contextValue = {
    show,
    setShow,
    deletedUser,
    setDeletedUser,
    openDeleteModal,
    closeDeleteModal,
    editUser,
    showEdit,
    openEditModal,
    closeEditModal,   
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext=()=>useContext(GlobalContext)
export {useGlobalContext,GlobalContextProvider}