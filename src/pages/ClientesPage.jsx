import { useState } from "react";
import { Button } from "react-bootstrap";
import ClientesTable from "../components/ClientesTable.jsx";
import NuevoClienteModal from "../components/NuevoClienteModal.jsx";
import AgregarDireccionModal from "../components/AgregarDireccionModal.jsx";
import { PlusIcon } from "../components/icons.jsx";
import { useClientes } from "../hooks/useClientes.js";

export default function ClientesPage() {
	const { clientes, crearCliente, agregarDireccion } = useClientes();
	const [modal, setModal] = useState(null);

	const cerrar = () => setModal(null);
	const clienteActivo =
		modal?.tipo === "direccion"
			? clientes.find((c) => c.id === modal.clienteId)
			: null;

	const total = clientes.length;

	return (
		<section>
			<div className="page-head">
				<div>
					<h1 className="page-title">Clientes</h1>
					<p className="page-subtitle">
						Administrá los clientes registrados en el sistema y sus
						direcciones.
					</p>
				</div>
				<Button
					className="btn-pill"
					onClick={() => setModal({ tipo: "nuevo" })}
				>
					<PlusIcon /> Nuevo Cliente
				</Button>
			</div>

			<ClientesTable
				clientes={clientes}
				onAgregarDireccion={(clienteId, slot) =>
					setModal({ tipo: "direccion", clienteId, slot })
				}
			/>

			<p className="page-foot">
				{total}{" "}
				{total === 1 ? "cliente registrado" : "clientes registrados"}
			</p>

			{modal?.tipo === "nuevo" && (
				<NuevoClienteModal
					onGuardar={(nombre, direccion) => {
						crearCliente(nombre, direccion);
						cerrar();
					}}
					onCancelar={cerrar}
				/>
			)}

			{modal?.tipo === "direccion" && clienteActivo && (
				<AgregarDireccionModal
					cliente={clienteActivo}
					onGuardar={(direccion) => {
						agregarDireccion(
							clienteActivo.id,
							modal.slot,
							direccion,
						);
						cerrar();
					}}
					onCancelar={cerrar}
				/>
			)}
		</section>
	);
}
