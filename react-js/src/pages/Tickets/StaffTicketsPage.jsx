import { useNavigate } from "react-router-dom"
import { Table } from "../../components/Custom/Table/Table"
import { TableBody } from "../../components/Custom/Table/Body/TableBody"
import { TableHeader } from "../../components/Custom/Table/TableHeader"
import { WrappedWidth } from "../../components/Custom/WrappedWidth"
import { TableRow } from "../../components/Custom/Table/TableRow"
import { TableBodyData } from "../../components/Custom/Table/Body/TableBodyData"
import axios from "axios";
import {useEffect, useState} from "react";

const headers = ["Id", "Título", "Usuario", "Fecha","Categoría","Estado", "Acción"]


const StaffTicketsPage = () => {
    const navigate = useNavigate()
    const [body,setBody] = useState([])
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [pending, setPending] = useState(0);
    const [totalTickets, setTotalTickets] = useState(0);


    const fetchPending = async  ()=>{
        const response = await  axios.get(
            `http://localhost:4000/api/ticket/countPending/${userInfo[0].id_usuario}`
        );
        setPending(response.data.data[0].Pending)
    }

    const fetchTotalTickets= async  ()=>{
        const response = await  axios.get(
            "http://localhost:4000/api/ticket/countTotal"
        );
        setTotalTickets(response.data.data[0].Total)
    }

    const fetchTicket =async  ()=>{
        const response = await  axios.get(
            `http://localhost:4000/api/ticket/assigned/${userInfo[0].id_usuario}`
        );
        setBody(response.data.data)
    }
    useEffect(() => {
        fetchTicket();
        fetchPending();
        fetchTotalTickets();

    }, [])

    const handleEdit = (id_ticket) => {
        localStorage.setItem("TicketEmployee",id_ticket)
        navigate("/see")
    }

    return (
        <WrappedWidth size={11}>
            <section className="w-full grid grid-cols-2 items-center justify-center font-bold font-inika">
                <div className="text-center">
                    <span className="text-blue-500 text-7xl">{pending}</span>
                    <p className="text-xl">Tickets Pendientes</p>
                </div>
                <div className="text-center border-l-2 border-yellow-400">
                    <span className="text-blue-500 text-7xl">{totalTickets}</span>
                    <p className="text-xl">Total Tickets</p>
                </div>
            </section>
            <Table className="mt-6 table rounded-lg overflow-hidden">
                <TableHeader headers={headers} />
                <TableBody>
                    {body.map(({ id_ticket, asunto, username, fecha_entrada, descripcion, estado }, key) => (
                        <TableRow key={key}>
                            <TableBodyData>{id_ticket}</TableBodyData>
                            <TableBodyData>{asunto}</TableBodyData>
                            <TableBodyData>{username}</TableBodyData>
                            <TableBodyData>{fecha_entrada}</TableBodyData>
                            <TableBodyData>{descripcion}</TableBodyData>
                            <TableBodyData>{estado}</TableBodyData>
                            <TableBodyData className="text-blue-300 hover:cursor-pointer" onClick={()=>handleEdit(id_ticket)}>
                                Ver
                            </TableBodyData>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </WrappedWidth>
    )
}

export { StaffTicketsPage }