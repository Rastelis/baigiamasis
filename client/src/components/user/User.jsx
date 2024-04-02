import { useNavigate } from 'react-router-dom'
import style from './User.module.css'
import axios from 'axios';

export default function User({ data, userLoader, setUserLoader }) {
  const navigate = useNavigate();
  function handleDelete(id) {
    const formData = new FormData();
    formData.append('active_user', 'false')
    axios.put('http://localhost:3000/vartotojai/' + id, formData)
      .then(resp => setUserLoader(!userLoader))
  }

  return (
    <tr>
      <td>{data.name} {data.surname}</td>
      <td>{data.email}</td>
      <td>{data.party_name}</td>
      <td>{new Date(data.created_at).toLocaleDateString()}</td>
      <td className={style.manage_user}>
        <button
          className="btn btn-warning btn-sm"
          onClick={() => navigate('/vartotojai/' + data._id)}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => handleDelete(data._id)}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  )
}
