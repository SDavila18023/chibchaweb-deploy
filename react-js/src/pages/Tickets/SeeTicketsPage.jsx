import {useEffect, useRef, useState} from "react"
import { Button } from "../../components/Custom/Button"
import { Form } from "../../components/Custom/Form/Form"
import { Modal } from "../../components/Custom/Loading/Modal"
import { WrappedWidth } from "../../components/Custom/WrappedWidth"
import { useFormInput } from "../../hooks/useFormInput"
import { useToggle } from "../../hooks/useToggle"
import { Input } from "../../components/Custom/Form/Input"
import { Textarea } from "../../components/Custom/Form/Textarea"
import { Image } from "../../components/Custom/Loading/Image"
import { RowInformation } from "../../components/Account/RowInformation"
import { TicketDescription } from "../../components/Tickets/TicketDescription"
import close from "../../assets/icons/close.svg"
import { TicketResponse } from "../../components/Tickets/TicketResponse"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {info} from "autoprefixer";

const headers = ["Usuario:", "Estado:", "Empleado:"]
const response = ["Juan Jose", "Pendiente", "Nicolás Rodrígruez"]

const SeeTicketsPage = ({ isValid = true }) => {
    const modalRef = useRef(null)
    const [isOpen, setIsOpen] = useToggle()
    const [responseTicket, setResponseTicket] = useFormInput({ response: "" })
    const ticketStorage = JSON.parse(localStorage.getItem("TicketEmployee"));
    const [infoTicket, setInfoTicket] = useState(null);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [responseTicketBack, setResponseTicketBack] = useState([])
    const navigate = useNavigate();
    const isTicketResolved = responseTicketBack && responseTicketBack.response !== null;
    

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/ticket/getInfoTicketEmployee/${ticketStorage}`
                );
                if (response.data.data && response.data.data.length > 0) {
                    const ticketData = response.data.data[0]
                    setInfoTicket(ticketData)
                }
            } catch (err) {
                console.error('Error al obtener el ticket:', err);
            }
        };

        const fetchResponses = async ()=>{
            try{
                const response = await axios.get(
                    `http://localhost:4000/api/ticket/getResponses/${ticketStorage}`
                );
                console.log(response.data.data[0])
                setResponseTicketBack(response.data.data[0])
            }catch (err){

            }
        }

        fetchResponses();
        fetchInfo();
    }, [])



    const handleReponseTicket = () => {
        setIsOpen(true)
    }

    const handleSubmitResponse = async (event) => {
        event.preventDefault()
        setIsOpen(false)
        try{
            const { data } = await axios.post("http://localhost:4000/api/ticket/responseTicket", {
                ticketStorage,
                employee: userInfo[0].id_usuario,
                response: responseTicket.response

            });

            alert("Respuesta enviada!")
            window.location.reload();
        }catch (err){

        }
    }

    return (
        <WrappedWidth size={10}>
            <h3 className="text-blue-500 text-3xl font-bold font-inika text-center">Datos del ticket</h3>
            <h4 className="w-full mt-8 mb-4 text-lg font-inika text-center rounded-md bg-blue-200">{infoTicket && infoTicket.asunto}</h4>
            <section className="w-full py-6 px-4 text-center rounded-md bg-blue-200">
                <h5 className="text-blue-400">Información Ticket</h5>
                <section className="w-full flex gap-x-5 text-sm">
                    <div className="py-4 px-2 flex flex-col gap-y-2">
                        {/* Renderización de los encabezados */}
                        {headers.map((header, index) => (
                            <div key={index} className="font-semibold text-start">{header}</div>
                        ))}
                    </div>
                    <div className="w-full py-4 px-2 flex items-start flex-col gap-y-2">
                        {/* Renderización de los valores de Usuario, Estado y Empleado */}
                        {[infoTicket?.username_user, infoTicket?.estado, infoTicket?.username_staff].map((value, index) => (
                            <div key={index} className="pl-4">{value}</div>
                        ))}
                    </div>
                </section>
                <TicketDescription 
                    title="Descripcion Ticket" 
                    description={infoTicket?.mensaje}
                />
                <section className="w-full py-6 px-4 text-center rounded-md bg-blue-200">
                    {/* ... (código previo) */}
                    {isTicketResolved ? (
                        <p>Ticket resuelto</p>
                    ) : (
                        <Button className="mb-6" size="md" color="blue-300" onClick={handleReponseTicket}>
                            Responder
                        </Button>
                    )}
                </section>

            </section>
            <section className="w-full mt-2 flex flex-col gap-y-4">
                {responseTicketBack && (
                    <TicketResponse
                        state="Resuelto"
                        employee={responseTicketBack.username}
                        response={responseTicketBack.response}
                    />
                )}
            </section>
            <Modal className="w-11/12 mx-auto pt-10 pb-6 px-5 max-w-md rounded-lg" ref={modalRef} isOpen={isOpen}>
                <Image className="w-5 h-5 ml-auto mb-8 hover:cursor-pointer" src={close} alt="arrow icon" onClick={setIsOpen} />
                <h2 className="mb-8 text-blue-500 text-3xl font-bold text-center">Respuesta</h2>
                <Form onSubmit={handleSubmitResponse}>
                    <Textarea 
                        value={responseTicket.response} 
                        size="md" 
                        color="gray-200" 
                        name="response"
                        placeholder="Estimado usuario..." 
                        onChange={setResponseTicket}
                    />
                    <Input className="mt-2 hover:cursor-pointer" type="submit" value="Responder" size="md" color="blue-300" />
                </Form>
            </Modal>
        </WrappedWidth>
    )
}

export { SeeTicketsPage }