import { Modal } from 'react-bootstrap'
import { CloseIcon } from './icons.jsx'

export default function ModalTitulo({ titulo, onCerrar }) {
  return (
    <Modal.Header>
      <Modal.Title as="h2">{titulo}</Modal.Title>
      <button type="button" className="modal-close" aria-label="Cerrar" onClick={onCerrar}>
        <CloseIcon width={18} height={18} />
      </button>
    </Modal.Header>
  )
}
