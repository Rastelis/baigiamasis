import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import User from "../components/user/User";
import style from './UserManagmet.module.css'


export default function UserManagment() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [userLoader, setUserLoader] = useState(false)
  const [message, setMessage] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/vartotojai')
      .then(resp => {
        const filteredData = resp.data.filter((user) => user.active_user)
        setData(filteredData)
      })
      .catch(err => console.log(err.message))


    console.log('loading');
  }, [userLoader])
  console.dir(data)

  return (
    <div>
      <div className="container">
        <div className={"d-flex gap-3 " + style.manage_users_block}>
          <button
            className=" btn btn-primary"
            onClick={() => {
              if (data.length < 3) navigate('/vartotojai/naujas-vartotojas')
              else setMessage("Maksimalus aktyvių vartotojų skaičius pasiektas.")
            }}
          >
            Prideti naują vartotją
          </button>
          <button
            className="btn btn-secondary"
            onClick={(() => navigate('/vartotojai/pasalinti-vartotojai'))}
          >
            Pašalinti vartotojai
          </button>
        </div>
            {
              message &&
              <div className="alert alert-danger">{message}</div>
            }
        <div className={style.user_table_container}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>vardas pavardė</th>
                <th>el. paštas</th>
                <th>partija</th>
                <th>Registravimo data</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map(user =>
                <User
                  key={user._id}
                  data={user}
                  userLoader={userLoader}
                  setUserLoader={setUserLoader}
                />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
