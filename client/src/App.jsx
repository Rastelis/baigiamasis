import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Header from './components/header/Header'
import Home from './pages/Home.jsx'
import SingleProject from './pages/SingleProject.jsx'
import NewProject from './pages/NewProject.jsx'
import UserManagment from './pages/UserManagment.jsx'
import NewUser from './pages/NewUser.jsx'
import EditUser from './pages/EditUser.jsx'
import ManageDeletedUsers from './pages/ManageDeletedUsers.jsx'
import EditProject from './pages/EditProject.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/pagrindinis' element={<Home/>} />
          <Route path='/projektas/:id' element={<SingleProject/>} />
          <Route path='/naujas-projektas' element={<NewProject/>} />
          <Route path='/projektas/tvarkyti-projekta/:id' element={<EditProject/>} />
          <Route path='/vartotojai' element={<UserManagment/>} />
          <Route path='/vartotojai/naujas-vartotojas' element={<NewUser/>} />
          <Route path='/vartotojai/:id' element={<EditUser/>} />
          <Route path='/vartotojai/pasalinti-vartotojai' element={<ManageDeletedUsers/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
