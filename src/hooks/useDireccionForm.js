import { useCallback, useState } from "react";
import { DIRECCION_VACIA } from "../utils/direccion.js";
import { hayErrores, validarDireccion } from "../utils/validacion.js";

export function useDireccionForm(aliasesUsados = []) {
	const [valores, setValores] = useState(DIRECCION_VACIA);
	const [intento, setIntento] = useState(false);

	const errores = validarDireccion(valores, aliasesUsados);

	const cambiar = useCallback((campo, valor) => {
		setValores((prev) =>
			campo === "ciudadId"
				? { ...prev, ciudadId: valor, localidad: "" }
				: { ...prev, [campo]: valor },
		);
	}, []);

	const validar = () => {
		setIntento(true);
		return !hayErrores(errores);
	};

	return { valores, cambiar, errores: intento ? errores : {}, validar };
}
