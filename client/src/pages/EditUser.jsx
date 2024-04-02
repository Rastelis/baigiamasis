import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


export default function NewUser() {

  const navigate = useNavigate();
  const [message, setMessage] = useState();
  const [data, setData] = useState();
  const { id } = useParams();

  useEffect(() => {
    axios.get('http://localhost:3000/vartotojai/' + id)
      .then(resp => setData(resp.data))
      .catch(err => console.log(err.message))
  }, [])

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    axios.put('http://localhost:3000/vartotojai/' + id, formData)
      .then(resp => navigate('/vartotojai'))
      .catch(err => setMessage(err.response.data))

  };

  return data && (
    <div>
      <div className="container">
        <div>
          <form
            className="mt-5 "
            onSubmit={handleSubmit}
            id="edit_user"
          >
            {
              message &&
              <div className="alert alert-danger">{message}</div>
            }
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="name"
              >
                Vardas
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                defaultValue={data.name}
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="surname"
              >Pavardė
              </label>
              <input
                className="form-control"
                type='text'
                name="surname"
                id="surname"
                defaultValue={data.surname}
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="party_name"
              >Partija
              </label>
              <input
                className="form-control"
                type='text'
                name="party_name"
                id="party_name"
                defaultValue={data.party_name}
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="email"
              >el. paštas
              </label>
              <input
                className="form-control"
                type='email'
                name="email"
                id="email"
                defaultValue={data.email}
              />
            </div>
            <div className="mb-3">
              <label
                className="form-label"
                htmlFor="password"
              >Slaptažodis
              </label>
              <input
                className="form-control"
                type='password'
                name="password"
                id="password"
                defaultValue={data.password}
              />
              <div className='form-text'>Slaptažodis turi turėti bent po vieną didžiaja ir mažają raides, skaičiu ir simbolį (#?!@$ %^&*-.+=) taip pat negali būti trumpesnis nei 8 simboliai.</div>
            </div>
          </form>
          <button
            className="btn btn-primary"
            type="submit"
            form="edit_user"
          >
            Saugoti
          </button>
        </div>
      </div>
    </div>
  )
}
