import { Form } from "react-bootstrap";
import { CIUDADES, getCiudad } from "../data/ubicaciones.js";

export default function DireccionFields({
	valores,
	errores,
	onChange,
	autoFocusPrimero = false,
}) {
	const ciudad = getCiudad(valores.ciudadId);

	const texto = (campo, etiqueta, { requerido = false, ...extra } = {}) => (
		<Form.Group controlId={`dir-${campo}`} className="field">
			<Form.Label>
				{etiqueta}
				{requerido && " *"}
			</Form.Label>
			<Form.Control
				className="input-line"
				value={valores[campo]}
				isInvalid={Boolean(errores[campo])}
				onChange={(e) => onChange(campo, e.target.value)}
				autoComplete="off"
				{...extra}
			/>
			<Form.Control.Feedback type="invalid">
				{errores[campo]}
			</Form.Control.Feedback>
		</Form.Group>
	);

	return (
		<>
			{texto("coordenadas", "Coordenadas", {
				requerido: true,
				placeholder: "-34.5955, -58.4040",
				autoFocus: autoFocusPrimero,
			})}
			{texto("calle", "Calle", { requerido: true })}

			<div className="grid-3">
				{texto("numero", "Número", {
					requerido: true,
					inputMode: "numeric",
				})}
				{texto("piso", "Piso")}
				{texto("depto", "Depto")}
			</div>

			<div className="grid-2">
				<Form.Group controlId="dir-ciudadId" className="field">
					<Form.Label>Ciudad *</Form.Label>
					<Form.Select
						className={`select-box ${valores.ciudadId ? "" : "is-placeholder"}`}
						value={valores.ciudadId}
						isInvalid={Boolean(errores.ciudadId)}
						onChange={(e) => onChange("ciudadId", e.target.value)}
					>
						<option value="">Selecciona tu ciudad</option>
						{CIUDADES.map((c) => (
							<option key={c.id} value={c.id}>
								{c.nombre}
							</option>
						))}
					</Form.Select>
					<Form.Control.Feedback type="invalid">
						{errores.ciudadId}
					</Form.Control.Feedback>
				</Form.Group>

				<Form.Group controlId="dir-localidad" className="field">
					<Form.Label>Localidad *</Form.Label>
					<Form.Select
						className={`select-box ${valores.localidad ? "" : "is-placeholder"}`}
						value={valores.localidad}
						disabled={!ciudad}
						isInvalid={Boolean(errores.localidad)}
						onChange={(e) => onChange("localidad", e.target.value)}
					>
						<option value="">Selecciona tu localidad</option>
						{ciudad?.localidades.map((l) => (
							<option key={l} value={l}>
								{l}
							</option>
						))}
					</Form.Select>
					<Form.Control.Feedback type="invalid">
						{errores.localidad}
					</Form.Control.Feedback>
				</Form.Group>
			</div>

			{texto("aclaraciones", "Aclaraciones")}
			{texto("alias", "Alias", { requerido: true })}
		</>
	);
}
