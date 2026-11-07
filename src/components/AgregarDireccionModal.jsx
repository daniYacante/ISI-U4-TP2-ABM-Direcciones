import { Button, Form, Modal } from 'react-bootstrap'
import { v4 as uuid } from 'uuid'
import DireccionFields from './DireccionFields.jsx'
import ModalTitulo from './ModalTitulo.jsx'
import { useDireccionForm } from '../hooks/useDireccionForm.js'
import { construirDireccion } from '../utils/direccion.js'

const FORM_ID = 'form-agregar-direccion'

export default function AgregarDireccionModal({ cliente, onGuardar, onCancelar }) {
  const aliasesUsados = cliente.direcciones.filter(Boolean).map((d) => d.alias)
  const form = useDireccionForm(aliasesUsados)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.validar()) return
    onGuardar(construirDireccion(form.valores, uuid()))
  }

  return (
    <Modal show onHide={onCancelar} centered scrollable dialogClassName="app-modal app-modal--lg">
      <ModalTitulo titulo="Agregar dirección" onCerrar={onCancelar} />
      <Modal.Body>
        <Form id={FORM_ID} noValidate onSubmit={handleSubmit}>
          <DireccionFields
            valores={form.valores}
            errores={form.errores}
            onChange={form.cambiar}
            autoFocusPrimero
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="light" className="btn-cancel" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button type="submit" form={FORM_ID} className="btn-save">
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
