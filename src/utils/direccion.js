import { getCiudad } from "../data/ubicaciones.js";
import { parsearCoordenadas } from "./validacion.js";

export const DIRECCION_VACIA = {
	coordenadas: "",
	calle: "",
	numero: "",
	piso: "",
	depto: "",
	ciudadId: "",
	localidad: "",
	aclaraciones: "",
	alias: "",
};

export function construirDireccion(valores, id) {
	return {
		id,
		coordenadas: parsearCoordenadas(valores.coordenadas),
		calle: valores.calle.trim(),
		numero: valores.numero.trim(),
		piso: valores.piso.trim(),
		depto: valores.depto.trim(),
		ciudadId: valores.ciudadId,
		localidad: valores.localidad,
		aclaraciones: valores.aclaraciones.trim(),
		alias: valores.alias.trim(),
	};
}

export function formatearCalle(d) {
	const partes = [`${d.calle} ${d.numero}`];
	if (d.piso) partes.push(`Piso ${d.piso}`);
	if (d.depto) partes.push(`Depto. ${d.depto}`);
	return partes.join(", ");
}

export function formatearZona(d) {
	const ciudad = getCiudad(d.ciudadId);
	return [d.localidad, ciudad?.nombre, ciudad?.provincia]
		.filter(Boolean)
		.join(", ");
}
