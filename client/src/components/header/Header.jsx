import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import style from './Header.module.css'

export default function Header() {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  return (
    <header className=''>
      <div className={'d-flex gap-3 ' + style.user}>
        <div><i className="bi bi-person-circle"></i> User Name</div>
        {/* <div
          className={style.settings}
          onClick={() => setShowMenu(true)}
        >
          <i className="bi bi-gear-fill"></i>
          {
            showMenu &&
            <div className={style.settings_menu}
              onMouseLeave={() => setShowMenu(false)}>
              <div
                className={style.menu_option}
              >
                Vartotojo nustatymai
              </div>
              <div
                className={style.menu_option}
              >
                Tvarkyti vartotojus
              </div>
            </div>
          }
        </div> */}
      <nav className='d-flex gap-3'>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/pagrindinis')}
        >
          <i className="bi bi-house-fill"></i> Pagrindinis</button>
        <button
          className='btn btn-primary'
          onClick={() => navigate('/naujas-projektas')}
        >
          Teikti Nauja Projekta</button>
        <button
        className='btn btn-primary'
        onClick={()=> navigate('/vartotojai')}
        >
          Tvarkyti vartotojus
        </button>
      </nav>
      </div>
    </header>
  )
}
