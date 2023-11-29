import {useEffect, useState} from "react"
import {Table} from "../../components/Custom/Table/Table.jsx";
import {TableHeader} from "../../components/Custom/Table/TableHeader.jsx";
import {TableBody} from "../../components/Custom/Table/Body/TableBody.jsx";
import {TableBodyData} from "../../components/Custom/Table/Body/TableBodyData.jsx";
import {TableRow} from "../../components/Custom/Table/TableRow.jsx";
import {Link} from "react-router-dom";
import {WrappedWidth} from "../../components/Custom/WrappedWidth.jsx";
import {useAuth} from "../../hooks/useAuth.js";

const headers = ["ID", "Titulo", "Estado", "Ver"]
const UserTicketsPage = () => {
    const { auth } = useAuth()
    const [tickets, setTickets] = useState([])
    const id = auth["id_usuario"]

    useEffect(() => {
        fetch(`https://localhost:4000/api/ticket/getTicketsByUser/${id}`)
            .then(response => response.json())
            .then(response => setTickets(response.data))
        console.log(tickets)
    }, []);

    return (
        <WrappedWidth size={10}>
            <h2 className="text-3xl text-blue-500 font-bold font-inika text-center">Mis Tickets</h2>
            <section className="w-full mt-4">
                <Table>
                    <TableHeader headers={headers} />
                    <TableBody>
                        {tickets.map(({ id_ticket, asunto, estado }, key) => (
                            <TableRow key={key}>
                                <TableBodyData>{id_ticket}</TableBodyData>
                                <TableBodyData>{asunto}</TableBodyData>
                                <TableBodyData>{estado}</TableBodyData>
                                <TableBodyData className="text-blue-300 hover:cursor-pointer">
                                    <Link to={`/ticketnose/${id_ticket}`} >Ver</Link>
                                </TableBodyData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </WrappedWidth>
    )
}

export  { UserTicketsPage }