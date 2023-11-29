import { Button } from "../Custom/Button"
import { RowInformation } from "./RowInformation"
import axios from "axios";
import { Input } from "../Custom/Form/Input.jsx";
import { useAuth } from "../../hooks/useAuth.js";
import { Table } from "../Custom/Table/Table.jsx";
import { TableHeader } from "../Custom/Table/TableHeader.jsx";
import { TableBody } from "../Custom/Table/Body/TableBody.jsx";
import {TableRow} from "../Custom/Table/TableRow.jsx";
import {TableBodyData} from "../Custom/Table/Body/TableBodyData.jsx";
import {useEffect, useState} from "react";
import * as domain from "domain";

const headerList = ["Nombre:", "Correo:", "Rol:", "Cumpleaños:", "Telefono:", "Dirección:"]
const map = ["nombre_completo", "correo", "cargo", "fecha_nacimiento", "telefono", "direccion", "descripcion"]
const tableHeaders = ["Id", "Dominio", "Fecha registro", "Fecha vencimiento"]


const AccountProfile = ({ onToggle }) => {
    const { auth } = useAuth()
    const values = map.map(key => auth[key] ?? "Indefinido")
    const descripcion = auth["descripcion"] ?? "Indefinido"
    const [body,setBody] = useState([])
    const [numDomains, setNumDomains] = useState(0)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [plan, setPlan] = useState("¡Adquierelo!");

    const handleDelete = async (e) => {
        e.preventDefault();
        const confirmacion = window.confirm("Estas seguro?")
        if (confirmacion) {
            try {
                const { request } = await axios.put("http://localhost:4000/api/users/delete", {
                    correo: auth.correo,
                    estado: "I",
                });
                alert("Usuario borrado");
            } catch (error) {
                console.error("Error al borrar la información:", error);
            }
            onToggle()
        }
    }

    const fetchPlan = async () =>{
        const response = await axios.get(
            `http://localhost:4000/api/plan/currentPlan/${userInfo[0].id_usuario}`
        );
        console.log(response.data.data[0].nombre_paquete)
        setPlan("Chibcha " +response.data.data[0].nombre_paquete);

    }

    const fetchUsers = async () =>{
        const response = await axios.get(
            `http://localhost:4000/api/domain/${auth["id_usuario"]}`
        );
        console.log(response.data.data)
        setBody(response.data.data);
    }

    const fetchDomains= async  ()=>{
        const response = await  axios.get(
            `http://localhost:4000/api/domain/countDomains/${auth["id_usuario"]}`
        );
        setNumDomains(response.data.data[0].dominios)
    }

    useEffect(() => {
        fetchUsers();
        fetchDomains()
        fetchPlan();
    }, [])



    return (
        <>
            <section className="w-full py-6 px-4 rounded-md bg-blue-100/50">
                <h3 className="text-blue-400 text-lg font-bold text-center">Información Personal</h3>
                <section className="">
                    <section className="mt-4 w-full flex flex-row gap-x-3">
                        <div className="py-4 px-2 rounded-md bg-blue-100">
                            <RowInformation items={headerList} />
                        </div>
                        <div className="py-4 px-2">
                            <RowInformation items={values} />
                        </div>
                    </section>
                    <div>
                        <p className="mt-4 mb-6 text-sm/relaxed">{descripcion}</p>
                        <Button className="w-full mb-6" size="md" color="blue-300" onClick={onToggle}>Editar perfil</Button>
                    </div>
                    <div className="w-full flex items-center justify-between gap-x-2 text-sm font-bold font-inika">
                        <Button className="px-0 hover:cursor-pointer" size="xs">Cambiar tu contraseña</Button>
                        <form className="w-full" onSubmit={handleDelete}>
                            <Input className="mx-auto px-0 block" size="xs" type="submit" value="Borrar cuenta" />
                        </form>
                    </div>
                </section>
            </section>
            <section className="w-full py-6 mt-10">
                <div className="w-full grid grid-cols-2 items-center justify-center font-bold font-inika">
                    <div className="text-center">
                        <span className="text-blue-500 text-7xl">{numDomains}</span>
                        <p className="text-xl">Dominio(s)</p>
                    </div>
                    <div className="text-center">
                        <span className="text-blue-500 text-7xl">Plan</span>
                        <p className="text-xl">{plan}</p>
                    </div>
                </div>
                <Table className="mt-6">
                    <TableHeader headers={tableHeaders} />
                    <TableBody>
                        {body.map(({ id_dominio, nombre_dominio, fecha_registro, fecha_caducidad}, key) => (
                            <TableRow key={key}>
                                <TableBodyData>{id_dominio}</TableBodyData>
                                <TableBodyData>{nombre_dominio}</TableBodyData>
                                <TableBodyData>{fecha_registro}</TableBodyData>
                                <TableBodyData>{fecha_caducidad}</TableBodyData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </>

    )
}

export { AccountProfile }