import { Button } from "react-bootstrap";
import { formatearCalle, formatearZona } from "../utils/direccion.js";

export default function DireccionCell({ direccion, onAgregar, etiqueta }) {
	if (!direccion) {
		return (
			<Button
				variant="light"
				className="btn-agregar"
				onClick={onAgregar}
				aria-label={`Agregar ${etiqueta}`}
			>
				Agregar
			</Button>
		);
	}

	return (
		<div className="dir" title={direccion.aclaraciones || undefined}>
			<div className="dir__calle">{formatearCalle(direccion)}</div>
			<div className="dir__zona">{formatearZona(direccion)}</div>
			{direccion.alias && (
				<span className="dir__alias">{direccion.alias}</span>
			)}
		</div>
	);
}
