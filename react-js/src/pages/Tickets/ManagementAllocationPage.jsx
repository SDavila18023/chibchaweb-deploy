import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Custom/Button"
import { TableBody } from "../../components/Custom/Table/Body/TableBody"
import { TableBodyData } from "../../components/Custom/Table/Body/TableBodyData"
import { Table } from "../../components/Custom/Table/Table"
import { TableHeader } from "../../components/Custom/Table/TableHeader"
import { TableRow } from "../../components/Custom/Table/TableRow"
import { WrappedWidth } from "../../components/Custom/WrappedWidth"
import axios from "axios";
import {useEffect, useState} from "react";

const headers = ["Id", "Titulo", "Usuario", "Fecha Entrada", "Estado" , "Empleado", "Categoria","Asignar"]


const ManagementAllocationPage = () => {

    const [body, setBody] = useState([]);
    const [staff, setStaff] = useState(0);
    const [tickets, setTickets] = useState(0);
    const navigate = useNavigate()

    const handleEdit = (id_ticket) => {
        localStorage.setItem("Ticket",id_ticket)
        navigate("/allocationTickets")
    }

    const fetchUnassignedTickets = async  ()=>{
        const response = await  axios.get(
            "http://localhost:4000/api/ticket/countUnassigned"
        );
        console.log(response.data.data[0].tickets)
        setTickets(response.data.data[0].tickets)
    }

    const fetchStaff = async  ()=>{
        const response = await  axios.get(
            "http://localhost:4000/api/ticket/countEmpleados"
        );
        setStaff(response.data.data[0].totalEmpleados)
    }

    const fetchCoordinatorTickets = async  ()=>{
        const response = await  axios.get(
            "http://localhost:4000/api/ticket/getCoordinatorTickets"
        );
        setBody(response.data.data);
    }



    useEffect(() => {
        fetchStaff();
        fetchUnassignedTickets();
        fetchCoordinatorTickets();
    }, [])


    return (
        <WrappedWidth size={10}>
            <section className="w-full pb-10 grid grid-cols-2 items-center justify-center font-bold font-inika border-b-2 border-yellow-400">
                <div className="text-center">
                    <span className="text-blue-500 text-7xl">{staff}</span>
                    <p className="text-xl">Empleados</p>

                </div>
                <div className="text-center">
                    <span className="text-blue-500 text-7xl">{tickets}</span>
                    <p className="text-xl">Tickets sin asignar</p>

                </div>
            </section>
            <section className="mt-8">
                <h2 className="text-blue-500 text-2xl font-bold font-inika">Tickets Pendientes</h2>
                <Table className="mt-6 table rounded-lg overflow-hidden">
                    <TableHeader headers={headers} />
                    <TableBody>
                        {body.map(({ id_ticket, asunto, username_user, username_staff, estado, descripcion , fecha_entrada}, key) => (
                            <TableRow key={key}>
                                <TableBodyData>{id_ticket}</TableBodyData>
                                <TableBodyData>{asunto}</TableBodyData>
                                <TableBodyData>{username_user}</TableBodyData>
                                <TableBodyData>{fecha_entrada}</TableBodyData>
                                <TableBodyData>{estado}</TableBodyData>
                                <TableBodyData>{username_staff}</TableBodyData>
                                <TableBodyData>{descripcion}</TableBodyData>
                                <TableBodyData>
                                    {username_staff !== "Sin asignar" ? (
                                        <span>Empleado ya asignado</span>
                                    ) : (
                                        <span className="text-blue-300 hover:cursor-pointer" onClick={() => handleEdit(id_ticket)}>
                                        Asignar empleado
                                         </span>
                                    )}
                                </TableBodyData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </WrappedWidth>
    )
}

export { ManagementAllocationPage }