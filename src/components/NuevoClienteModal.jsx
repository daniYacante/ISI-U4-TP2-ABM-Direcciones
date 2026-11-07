import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { v4 as uuid } from "uuid";
import DireccionFields from "./DireccionFields.jsx";
import ModalTitulo from "./ModalTitulo.jsx";
import { useDireccionForm } from "../hooks/useDireccionForm.js";
import { construirDireccion } from "../utils/direccion.js";
import { validarNombreCliente } from "../utils/validacion.js";

const FORM_ID = "form-nuevo-cliente";

export default function NuevoClienteModal({ onGuardar, onCancelar }) {
	const [nombre, setNombre] = useState("");
	const [intento, setIntento] = useState(false);
	const form = useDireccionForm();

	const errorNombre = validarNombreCliente(nombre);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIntento(true);
		const direccionOk = form.validar(); // se evalúa siempre, para mostrar todos los errores
		if (errorNombre || !direccionOk) return;
		onGuardar(nombre.trim(), construirDireccion(form.valores, uuid()));
	};

	return (
		<Modal
			show
			onHide={onCancelar}
			centered
			scrollable
			dialogClassName="app-modal app-modal--lg"
		>
			<ModalTitulo titulo="Nuevo cliente" onCerrar={onCancelar} />
			<Modal.Body>
				<Form id={FORM_ID} noValidate onSubmit={handleSubmit}>
					<Form.Group controlId="cliente-nombre" className="field">
						<Form.Label>Nombre *</Form.Label>
						<Form.Control
							className="input-line"
							value={nombre}
							autoFocus
							autoComplete="off"
							isInvalid={intento && errorNombre !== ""}
							onChange={(e) => setNombre(e.target.value)}
						/>
						<Form.Control.Feedback type="invalid">
							{errorNombre}
						</Form.Control.Feedback>
					</Form.Group>

					<p className="form-section">Dirección principal</p>
					<DireccionFields
						valores={form.valores}
						errores={form.errores}
						onChange={form.cambiar}
					/>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button
					type="button"
					variant="light"
					className="btn-cancel"
					onClick={onCancelar}
				>
					Cancelar
				</Button>
				<Button type="submit" form={FORM_ID} className="btn-save">
					Guardar
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
