const REGEX_COORDENADAS =
	/^\s*(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)\s*$/;
const REGEX_NUMERO = /^\d{1,6}[A-Za-z]?$/;

export function parsearCoordenadas(texto) {
	const m = REGEX_COORDENADAS.exec(texto ?? "");
	if (!m) return null;
	const lat = Number(m[1]);
	const lng = Number(m[2]);
	if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
	return { lat, lng };
}

export const hayErrores = (errores) => Object.keys(errores).length > 0;

export function validarNombreCliente(nombre) {
	const limpio = nombre.trim();
	if (!limpio) return "El nombre es obligatorio.";
	if (limpio.length < 2) return "El nombre debe tener al menos 2 caracteres.";
	if (limpio.length > 80)
		return "El nombre no puede superar los 80 caracteres.";
	return "";
}

export function validarDireccion(v, aliasesUsados = []) {
	const e = {};

	if (!v.coordenadas.trim())
		e.coordenadas = "Las coordenadas son obligatorias.";
	else if (!parsearCoordenadas(v.coordenadas))
		e.coordenadas =
			'Usá el formato "latitud, longitud". Ej: -34.5955, -58.4040';

	if (!v.calle.trim()) e.calle = "La calle es obligatoria.";
	else if (v.calle.trim().length > 80) e.calle = "Máximo 80 caracteres.";

	if (!v.numero.trim()) e.numero = "Obligatorio.";
	else if (!REGEX_NUMERO.test(v.numero.trim())) e.numero = "Número inválido.";

	if (v.piso.trim().length > 6) e.piso = "Máximo 6 caracteres.";
	if (v.depto.trim().length > 6) e.depto = "Máximo 6 caracteres.";

	if (!v.ciudadId) e.ciudadId = "Seleccioná una ciudad.";
	if (!v.localidad) e.localidad = "Seleccioná una localidad.";

	if (v.aclaraciones.trim().length > 200)
		e.aclaraciones = "Máximo 200 caracteres.";

	const alias = v.alias.trim();
	if (!alias) e.alias = "El alias es obligatorio.";
	else if (alias.length > 30) e.alias = "Máximo 30 caracteres.";
	else if (
		aliasesUsados.some(
			(a) => a.trim().toLowerCase() === alias.toLowerCase(),
		)
	)
		e.alias = "Este cliente ya tiene una dirección con ese alias.";

	return e;
}
