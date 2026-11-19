import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? 'nav-link is-active' : 'nav-link'

  return (
    <header className="site-header">
      <Link to="/" className="site-brand">
        Objetos Perdidos UTP
      </Link>
      <nav className="site-nav" aria-label="Navegación principal">
        <NavLink to="/" end className={linkClass}>
          Inicio
        </NavLink>
        <NavLink to="/objetos" className={linkClass}>
          Buscar objetos
        </NavLink>
        <NavLink to="/reportar" className={linkClass}>
          Reportar objeto
        </NavLink>
      </nav>
    </header>
  )
}
