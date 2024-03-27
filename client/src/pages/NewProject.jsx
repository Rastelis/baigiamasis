import style from './NewProject.module.css'

export default function NewProject() {

  function handleSubmit(e) {

  }

  return (
    <div>
      <div className="container">
        <div>
          <form className={"mt-5 " + style.project_form} onSubmit={handleSubmit} id="new_project">
            <div className="mb-3">
              <label className="form-label" for="project_name">Projekto pavadinimas</label>
              <input className="form-control" type="text" name="project_name" id="project_name" />
            </div>
            <div className="mb-3">
              <label className="form-label" for="description">Projekto aprašymas</label>
              <textarea className="form-control" name="description" id="description" rows="30" ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label" for="picture">Projekto nuotrauka</label>
              <input className="form-control" type="file" name="picture" id="picture" />
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
