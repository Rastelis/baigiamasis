import { useState } from 'react';
import style from './NewProject.module.css';
import axios from 'axios';

export default function NewProject() {

  const [message, setMessage] = useState();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.post('http://localhost:3000', formData)
      .catch(err => setMessage(err.response.data))

  };

  return (
    <div>
      <div className="container">
        <div>
          <form
            className={"mt-5 " + style.project_form}
            onSubmit={handleSubmit}
            id="new_project"
          >
            {
              message &&
              <div className="alert alert-danger">{message}</div>
            }
            <div className="mb-3">
              <label
                className="form-label"
                htmlhtmlFor="project_name"
              >
                Projekto pavadinimas
              </label>
              <input
                className="form-control"
                type="text"
                name="project_name"
                id="project_name"
              />
              <div className='form-text'>Projekto pavadinimas yra privalomas ir negali buti ilgesnis nei 80 simbolių.</div>
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
              >
              </textarea>
              <div className='form-text'>Projekto aprašymas yra privalomas ir negali būti ilgesnis nei 2000 simbolių.</div>
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
              />
            <div className='form-text'>svarstymo data turi būti nurodyta.</div>
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
            <div className='form-text'>Įkelti nuotrauką yra privaloma</div>
            </div>
          </form>
          <button
            className="btn btn-primary"
            type="submit"
            form="new_project"
          >
            Teikti
          </button>
        </div>
      </div>
    </div>
  )
}
