import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

import DeletedUser from "../components/deleted_user/DeletedUser";
import style from './UserManagmet.module.css'


export default function ManageDeletedUsers() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [userLoader, setUserLoader] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3000/vartotojai')
      .then(resp => {
        const filteredData = resp.data.filter((user) => !user.active_user)
        setData(filteredData)
      })
      .catch(err => console.log(err.message))


    console.log('loading');
  }, [userLoader])
  console.dir(data)

  return (
    <div>
      <div className="container">
        <div className={style.add_user_block}>
          <button
            className=" btn btn-primary"
            onClick={() => navigate('/vartotojai')}
          >
            Aktyvūs vartotojai
          </button>
        </div>
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
                <DeletedUser
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
