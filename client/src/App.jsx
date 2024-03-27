import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Header from './components/header/Header'
import Home from './pages/Home.jsx'
import SingleProject from './pages/SingleProject.jsx'
import NewProject from './pages/NewProject.jsx'


function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/pagrindinis' element={<Home/>} />
          <Route path='/projektas/:id' element={<SingleProject/>} />
          <Route path='/naujas-projektas' element={<NewProject/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
