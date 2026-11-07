export const CIUDADES = [
	{
		id: "caba",
		nombre: "Ciudad de Buenos Aires",
		provincia: null,
		localidades: [
			"Palermo",
			"Recoleta",
			"Belgrano",
			"Caballito",
			"Villa Crespo",
			"San Telmo",
		],
	},
	{
		id: "cordoba",
		nombre: "Córdoba",
		provincia: null,
		localidades: [
			"Nueva Córdoba",
			"Centro",
			"Alberdi",
			"Güemes",
			"Cerro de las Rosas",
		],
	},
	{
		id: "rosario",
		nombre: "Rosario",
		provincia: "Santa Fe",
		localidades: ["Centro", "Pichincha", "Echesortu", "Fisherton"],
	},
	{
		id: "mendoza",
		nombre: "Mendoza",
		provincia: null,
		localidades: ["Centro", "Quinta Sección", "Barrio Bombal"],
	},
	{
		id: "la-plata",
		nombre: "La Plata",
		provincia: "Buenos Aires",
		localidades: ["Centro", "City Bell", "Tolosa", "Los Hornos"],
	},
];

export const getCiudad = (id) => CIUDADES.find((c) => c.id === id) ?? null;
