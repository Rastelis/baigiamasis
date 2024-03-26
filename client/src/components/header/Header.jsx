import React from 'react'
import style from './Header.module.css'

export default function Header() {
  return (
    <header className=''>
      <div>
        <div>User Name</div>
        <i className="bi bi-gear-fill"></i>
      </div>
      <nav>
        <button className='btn btn-primary'>Teikti Nauja Projekta</button>
      </nav>
    </header>
  )
}
