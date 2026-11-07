import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { clientesIniciales } from "../data/clientesIniciales.js";

const STORAGE_KEY = "gestion-clientes:clientes";

function cargarClientes() {
	try {
		const guardado = localStorage.getItem(STORAGE_KEY);
		if (guardado) {
			const datos = JSON.parse(guardado);
			if (
				Array.isArray(datos) &&
				datos.every((c) => c && Array.isArray(c.direcciones))
			) {
				return datos;
			}
		}
	} catch {}
	return clientesIniciales;
}

export function useClientes() {
	const [clientes, setClientes] = useState(cargarClientes);

	useEffect(() => {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
		} catch {
			// cuota llena o modo privado: la app sigue funcionando en memoria
		}
	}, [clientes]);

	/** Alta de cliente con su dirección principal (slot 0). */
	const crearCliente = useCallback((nombre, direccion) => {
		setClientes((actuales) => [
			...actuales,
			{
				id: uuid(),
				nombre,
				direcciones: [{ ...direccion, id: uuid() }, null, null],
			},
		]);
	}, []);

	const agregarDireccion = useCallback((clienteId, slot, direccion) => {
		setClientes((actuales) =>
			actuales.map((c) => {
				if (c.id !== clienteId) return c;
				const direcciones = [...c.direcciones];
				direcciones[slot] = { ...direccion, id: uuid() };
				return { ...c, direcciones };
			}),
		);
	}, []);

	return { clientes, crearCliente, agregarDireccion };
}
