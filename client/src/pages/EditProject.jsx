import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import style from './NewProject.module.css';


export default function NewProject() {

  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [data, setData] = useState();
  const { id } = useParams()

  useEffect(() => {
    axios.get('http://localhost:3000/projektas/' + id)
      .then(resp => setData(resp.data))
      .catch(err => console.log(err.message))
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.put('http://localhost:3000/' + id, formData)
      .then(resp => navigate('/pagrindinis'))
      .catch(err => setMessage(err.response.data))
  };

  return data && (
    <div>
      <div className="container">
        <div>
          <form
            className={"mt-5 " + style.project_form}
            onSubmit={handleSubmit}
            id="edit_project"
          >
            {
              message &&
              <div className="alert alert-danger">{message}</div>
            }
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="project_name"
              >
                Projekto pavadinimas
              </label>
              <input
                className="form-control"
                type="text"
                name="project_name"
                id="project_name"
                defaultValue={data.project_name}
              />
              {/* <div className='form-text'>Projekto pavadinimas yra privalomas ir negali buti ilgesnis nei 80 simbolių.</div> */}
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="description"
              >Projekto aprašymas
              </label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                rows="30"
                defaultValue={data.description}
              >
              </textarea>
              {/* <div className='form-text'>Projekto aprašymas yra privalomas ir negali būti ilgesnis nei 2000 simbolių.</div> */}
            </div>
            <div className='mb-3'>
              <label
                className='form-labelw'
                htmlFor="hearing_at"
              >Svarstymo data
              </label>
              <input
                className='form-control'
                type='date'
                name='hearing_at'
                id='hearing_at'
                defaultValue={new Date(data.hearing_at).toLocaleDateString('lt-LT')}
              />
              {/* <div className='form-text'>svarstymo data turi būti nurodyta.</div> */}
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="picture"
              >
                Projekto nuotrauka
              </label>
              <input
                className="form-control"
                type="file"
                name="picture"
                id="picture"
              />
              {/* <div className='form-text'>Įkelti nuotrauką yra privaloma</div> */}
            </div>
          </form>
          <button
            className="btn btn-primary"
            type="submit"
            form="edit_project"
          >
            Teikti
          </button>
        </div>
      </div>
    </div>
  )
}
