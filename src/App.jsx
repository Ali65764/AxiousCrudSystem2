import React from 'react'
import { Route,Routes } from 'react-router-dom'
import {ROUTER} from "./constant/router"
import Home from "./components/Home"
import AddUser from "./components/AddUser"
import DetailsPage from "./components/DetailsPage"
import Editpages from './pages/Editpages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        <Route path={ROUTER.Home} element={<Home/>}/>
        <Route path={ROUTER.AddUser} element={<AddUser/>}/>
        <Route path={`${ROUTER.DetailsPage}/:id`} element={<DetailsPage/>}/>
        <Route path={`${ROUTER.Editpages}/:id`} element={<Editpages/>}/>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
