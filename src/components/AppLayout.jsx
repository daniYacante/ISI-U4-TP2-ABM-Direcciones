import { Link, Outlet } from 'react-router-dom'
import { ChevronDownIcon, UserIcon } from './icons.jsx'

export default function AppLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-header__left">
            <Link to="/clientes" className="app-brand">
              <span className="app-brand__logo" aria-hidden="true">A</span>
              <span className="app-brand__name">Administración</span>
            </Link>
            <nav aria-label="Ruta de navegación" className="app-breadcrumb">
              <span>Delivery</span>
              <span className="app-breadcrumb__sep">/</span>
              <span className="app-breadcrumb__current" aria-current="page">Clientes</span>
            </nav>
          </div>
          <button type="button" className="app-user" aria-label="Menú de usuario">
            <span className="app-user__avatar"><UserIcon /></span>
            <ChevronDownIcon width={14} height={14} />
          </button>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
