import { v4 as uuid } from "uuid";

const cliente = (nombre, principal) => ({
	id: uuid(),
	nombre,
	direcciones: [{ id: uuid(), ...principal }, null, null],
});

export const clientesIniciales = [
	cliente("María González", {
		coordenadas: { lat: -34.5955, lng: -58.404 },
		calle: "Av. Santa Fe",
		numero: "2450",
		piso: "3",
		depto: "A",
		ciudadId: "caba",
		localidad: "Palermo",
		aclaraciones: "",
		alias: "Casa",
	}),
	cliente("Juan Pérez", {
		coordenadas: { lat: -31.4228, lng: -64.189 },
		calle: "Obispo Trejo",
		numero: "650",
		piso: "",
		depto: "",
		ciudadId: "cordoba",
		localidad: "Nueva Córdoba",
		aclaraciones: "",
		alias: "Casa",
	}),
	cliente("Lucía Fernández", {
		coordenadas: { lat: -32.9528, lng: -60.65 },
		calle: "Bv. Oroño",
		numero: "1280",
		piso: "2",
		depto: "B",
		ciudadId: "rosario",
		localidad: "Centro",
		aclaraciones: "",
		alias: "Casa",
	}),
];
