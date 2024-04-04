import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'

import style from './Header.module.css'
import MainContext from '../../context/Main.jsx'
import axios from 'axios'

export default function Header() {
  const navigate = useNavigate()
  // const [showMenu, setShowMenu] = useState(false);
  const { user } = useContext(MainContext)

  function handleLoggout() {
    axios.get('http://localhost:3000/atsijungti')
      .then(resp => {
        navigate('/')
        window.location.reload()
      })
      .catch(err => console.log(err.message))
  }

  return (
    <header className=''>
      <div className={'d-flex gap-3 ' + style.user}>
        <div><i className="bi bi-person-circle"></i> {user.name} {user.surname}</div>
        <div
          className={style.loggout}
          onClick={() => handleLoggout()}
        >
          <i className="bi bi-box-arrow-right"></i>
          {/* {
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
          } */}
        </div>
        <nav className='d-flex gap-3'>
          <button
            className='btn btn-primary btn-sm-small'
            onClick={() => navigate('/pagrindinis')}
          >
            <i className="bi bi-house-fill"></i> Pagrindinis</button>
          {!user.addmin &&
            <button
              className='btn btn-primary'
              onClick={() => navigate('/naujas-projektas')}
            >
              Teikti Nauja Projekta
            </button>
          }
          {user.addmin &&
            <button
              className='btn btn-primary'
              onClick={() => navigate('/vartotojai')}
            >
              Tvarkyti vartotojus
            </button>
          }
        </nav>
      </div>
    </header>
  )
}
