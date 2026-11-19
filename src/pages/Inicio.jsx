import { Link } from 'react-router-dom'

export default function Inicio() {
  return (
    <section className="page-section">
      <h1>Objetos perdidos y encontrados</h1>
      <p>
        Consulta los objetos reportados en la universidad o informa sobre algo
        que encontraste.
      </p>
      <div className="page-actions">
        <Link to="/objetos">Buscar objetos</Link>
        <Link to="/reportar">Reportar un objeto</Link>
      </div>
    </section>
  )
}
