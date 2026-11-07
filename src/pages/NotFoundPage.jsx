import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="text-center">
      <h1 className="page-title">Página no encontrada</h1>
      <p className="page-subtitle mb-4">La dirección que buscás no existe.</p>
      <Link to="/clientes" className="btn btn-primary btn-pill">
        Ir a Clientes
      </Link>
    </section>
  )
}
