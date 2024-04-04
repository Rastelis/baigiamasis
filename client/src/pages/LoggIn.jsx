import axios from "axios";
import MainContext from '../context/Main.jsx'
import { useContext, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";



export default function LoggIn() {

  const { user, setUser } = useContext(MainContext);
  const navigate = useNavigate()

  if (user) {
    console.log("should redirect")
    navigate('/pagrindinis')
  }

  const [message, setMessage] = useState();

  function handleLoggIn(e) {
    e.preventDefault();

    const formData = new FormData(e.target);


    axios.post('http://localhost:3000/prisijungti', formData)
      .then(resp => {
        setUser(resp.data)
        navigate('/pagrindinis')
      })
      .catch(err => setMessage(err.message))
  }

  return (
    <div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-5">
            <form
              className="mt-5 "
              onSubmit={handleLoggIn}
              id="logg_in"
            >
              {message &&
                <div className="alert alert-danger">
                  {message}
                </div>
              }
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="email"
                >
                  El-pašto adresas.
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                />
              </div>
              <div className="mb-3">
                <label
                  className="form-label"
                  htmlFor="password"
                >
                  Slaptažodis
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="napassword"
                />
              </div>
            </form>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-primary"
                type="submit"
                form="logg_in"
              >
                Prisijungti
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
