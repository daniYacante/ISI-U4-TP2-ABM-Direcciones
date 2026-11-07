import { Table } from 'react-bootstrap'
import DireccionCell from './DireccionCell.jsx'

const ETIQUETAS = ['dirección principal', 'dirección 2', 'dirección 3']

export default function ClientesTable({ clientes, onAgregarDireccion }) {
  return (
    <div className="table-card">
      <Table responsive className="clientes-table mb-0">
        <thead>
          <tr>
            <th scope="col" className="col-nombre">Nombre</th>
            <th scope="col" className="col-dir">Dirección Principal</th>
            <th scope="col" className="col-dir">Dirección 2</th>
            <th scope="col" className="col-dir">Dirección 3</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-secondary py-5">
                No hay clientes registrados.
              </td>
            </tr>
          )}
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td className="cliente-nombre">{cliente.nombre}</td>
              {[0, 1, 2].map((slot) => (
                <td key={slot}>
                  <DireccionCell
                    direccion={cliente.direcciones[slot] ?? null}
                    etiqueta={`${ETIQUETAS[slot]} de ${cliente.nombre}`}
                    onAgregar={() => onAgregarDireccion(cliente.id, slot)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
