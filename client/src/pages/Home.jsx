import { useEffect, useState } from 'react'
import axios from 'axios'

import Project from '../components/project/Project';
import style from './Home.module.css'

const Home = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/')
      .then(resp => setData(resp.data))
  }, []);

  console.dir(data);

  return (
    <div className={style.home_background}>
      <div className="container" >
        <div className={style.projects}>
          {data.map(project =>
            <Project data={project} key={project._id} />
          )}
        </div>
      </div>
    </div>
  )
}
export default Home
