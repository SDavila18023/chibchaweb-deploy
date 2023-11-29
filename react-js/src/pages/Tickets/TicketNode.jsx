import {WrappedWidth} from "../../components/Custom/WrappedWidth.jsx";
import {useState, useEffect} from "react";
import {TicketDescription} from "../../components/Tickets/TicketDescription.jsx";
import {RowInformation} from "../../components/Account/RowInformation.jsx";
import {TicketResponse} from "../../components/Tickets/TicketResponse.jsx";
import {useAuth} from "../../hooks/useAuth.js";
import {useParams} from "react-router-dom";

const TicketNode = () => {
    const { auth } = useAuth()
    const { id } = useParams()
    const [ticket, setTicket] = useState({ mensaje: "" })
    const [responses, setResponses] = useState({ response: null, username: null });
    const isSuccessful = responses && responses.response && responses.username

    useEffect(() => {
        fetch(`http://localhost:4000/api/ticket/getDescriptionById/${id})`)
            .then(response => response.json())
            .then(response => setTicket(response.data[0]))

        fetch(`http://localhost:4000/api/ticket/getResponses/${id})`)
            .then(response => response.json())
            .then(response => setResponses(response.data[0]))
    }, []);


    return (
        <WrappedWidth size={10}>
            <section className="w-full mb-6 py-6 px-4 text-center rounded-md bg-blue-200">
                <h2 className="text-blue-500 text-xl font-bold">Ticket</h2>
                <TicketDescription title="Ticket" description={ticket.mensaje} />
            </section>
            { isSuccessful && <TicketResponse response={responses.response} employee={responses.username} state="Resuelto" />}
        </WrappedWidth>
    )
}

export  { TicketNode }