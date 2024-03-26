import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import Status from "../components/status/Status.jsx";
import DateFormat from "../components/date_format/DateFormat.jsx";
import style from './SingleProject.module.css'


export default function SingleProject() {

  const [data, setData] = useState();
  const { id } = useParams()


  useEffect(() => {
    console.log(id);
    axios.get('http://localhost:3000/projektas/' + id)
      .then(resp => {
        setData(resp.data)
      })
  }, [])

  return data && (
    <div className={'container ' + style.project_wraper}>

      <table className='table table-striped'>

        <tbody>
          <tr>
            <td><strong>Projekto pavadinimas:</strong></td>
            <td>{data.project_name}</td>
          </tr>
          <tr>
            <td><strong>Projekto statusas:</strong></td>
            <td><Status data={data.status} /></td>
          </tr>
          <tr>
            <td><strong>Projekto nuotrauka:</strong></td>
            <td><img className={style.photo} src={'http://localhost:3000/uploads/' + data.picture} /></td>
          </tr>
          <tr>
            <td><strong>Projekto sukūrimo data:</strong></td>
            <td><DateFormat data={data.created_at} /></td>
          </tr>
          <tr>
            <td><strong>Projekto svarstymo data:</strong></td>
            <td><DateFormat data={data.hearing_at} /></td>
          </tr>
          <tr>
            <td><strong>Projekto aprašymas:</strong></td>
            <td>{data.description}</td>
          </tr>
          <tr>
            <td><strong>Projekto autorius:</strong></td>
            <td>
              {data.author.name}
              {data.author.surname}
            </td>
          </tr>
          <tr>
            <td><strong>Partija:</strong></td>
            <td className="d-flex gap-1" >
              <div>{data.author.party_name}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
