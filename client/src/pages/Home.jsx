import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { redirect } from 'react-router-dom';

import Project from '../components/project/Project';
import style from './Home.module.css'
import MainContext from '../context/Main.jsx'

const Home = () => {

  const [data, setData] = useState([])
  const { user } = useContext(MainContext);
  const [filterMode, setFilterMode] = useState();
  const [filter, setFilter] = useState(false);

  if (!user) redirect('/')

  useEffect(() => {
    axios.get('http://localhost:3000')
      .then(resp => {
        const sortedData = [...resp.data]
        console.log({ unsortedData: sortedData });
        sortedData.sort((a, b) => {
          return new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
        })
        console.log({ sortedData: sortedData });
        if (filter) {
          const filteredData = sortedData.filter(data => {
            return data.author[Object.keys(filter)[0]] === filter[Object.keys(filter)[0]]
          })
          // console.log({unfilteredData:data.author[Object.keys(filter)[0]]})
          // console.log({filter:filter[Object.keys(filter)[0]]})
          console.log({ filtededData: filteredData });
          setData(filteredData);
        }
        else setData(sortedData);
      })
      .catch(err => console.log(err.message))
  }, [filter]);

  function handleFilter(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const filterValue = Object.fromEntries(formData);
    console.log(Object.keys(filterValue)[0])
    setFilter(filterValue)
    // Obj[Object.keys(filterValueObj)[0]]);
  }

  // console.dir(data);
  const uiniqueAuthors = data.map(obj => obj.author).filter((author, index) => index === data.map(obj => obj.author).findIndex(obj => author._id === obj._id))
  const uiniqueParties = data.map(obj => obj.author).filter((author, index) => index === data.map(obj => obj.author).findIndex(obj => author.party_name === obj.party_name))
  // console.log(uiniqueParties)
  return (
    <div className={style.home_background}>
      <div className='container'>
        <div className={style.sort_projects_container}>
          <div className={'d-flex gap-3 ' + style.project_display_controls} >
            <div className="col-3">
              <label
                className="form-label"
                htmlFor="email"
              >
                Filtruoti pagal.
              </label>
              <select name="sort" id="sort" className='form-control' onChange={(e) => setFilterMode(e.target.value)}>
                <option value={false}>-</option>
                <option value="user">Autorių</option>
                <option value="party">Partiją</option>
              </select>
            </div>

            {filterMode === "user" &&
              <div className='d-flex align-items-end gap-3 col-7'>
                <form className='col-5' id='filter'
                  onSubmit={handleFilter}>
                  <div >
                    <label
                      className="form-label"
                      htmlFor="email"
                    >
                      Autorius.
                    </label>
                    <select name="_id" id="_id" className='form-control'>
                      {uiniqueAuthors.map(author => {
                        return <option value={author._id} key={author._id}>{author.name} {author.surname}</option>
                      })}
                    </select>
                  </div>
                </form>
                <div className='d-flex gap-3'>
                  <div><button className='btn btn-primary' type='submit' form='filter'>Filtruoti</button></div>
                  <div><button className='btn btn-secondary' onClick={() => setFilter(false)}>Valyti filtra</button></div>
                </div>
              </div>
            }
            {filterMode === "party" &&
              <div className='d-flex align-items-end gap-3 col-7'>
                <form className='col-5' id='filter'
                  onSubmit={handleFilter}>
                  <div >
                    <label
                      className="form-label"
                      htmlFor="email"
                    >
                      Partija.
                    </label>
                    <select name="party_name" id="party_name" className='form-control'>
                      {uiniqueParties.map(author => {
                        return <option value={author.party_name} key={author._id}>{author.party_name}</option>
                      })}
                    </select>
                  </div>
                </form>
                <div className='d-flex gap-3'>
                  <div><button className='btn btn-primary' type='submit' form='filter'>Filtruoti</button></div>
                  <div><button className='btn btn-secondary' onClick={() => setFilter(false)}>Valyti filtra</button></div>
                </div>
              </div>
            }

          </div>
        </div>
      </div>
      <div className="container" >
        <div className={style.projects}>
          {data.map(project => {
            // console.log(project);
            return <Project data={project} key={project._id} />
          }
          )}
        </div>
      </div>
    </div>
  )
}
export default Home
