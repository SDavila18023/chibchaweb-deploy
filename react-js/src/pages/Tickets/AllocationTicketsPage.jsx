import {useEffect, useRef, useState} from "react"
import { Button } from "../../components/Custom/Button"
import { Form } from "../../components/Custom/Form/Form"
import { Select } from "../../components/Custom/Form/Select"
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
import axios from "axios";
import {useNavigate} from "react-router-dom";

const headers = ["Usuario:", "Estado:"]


const initialState = {
    employee: "",
}

const AllocationTicketspage = () => {
    const modalRef = useRef(null)
    const [isOpen, setIsOpen] = useToggle()
    const [formData, handleChange, setFormData] = useFormInput(initialState)
    const [infoTicket, setInfoTicket] = useState(null);
    const ticketStorage = JSON.parse(localStorage.getItem("Ticket"));

    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInfo = async () => {
            console.log(ticketStorage);
            try {
                const response = await axios.get(
                    `http://localhost:4000/api/ticket/getInfoTicket/${ticketStorage}`
                );
                if (response.data.data && response.data.data.length > 0) {
                    const ticketData = response.data.data[0];
                    console.log('Valor del ticket obtenido:', ticketData);
                    setInfoTicket(ticketData);
                    console.log('Valor actual de infoTicket:', ticketData); // Imprime el valor actual de infoTicket después de actualizarlo
                }
            } catch (err) {
                console.error('Error al obtener el ticket:', err);
            }
        };

        const fetchEmployees = async () => {
            console.log(ticketStorage);
            try {
                const response = await axios.get(
                    "http://localhost:4000/api/ticket/getEmployees"
                );
                if (response.data.data && response.data.data.length > 0) {
                    const employeeData = response.data.data;
                    console.log('Valor de los empleados obtenidos:', employeeData);
                    setEmployees(employeeData);
                    console.log('Valor actual de employees:', employeeData); // Imprime el valor actual de infoTicket después de actualizarlo
                }
            } catch (err) {
                console.error('Error al obtener los empleados:', err);
            }
        };

        fetchInfo();
        fetchEmployees();
    }, []);



    const handleReponseTicket = () => {
        setIsOpen(true)
    }

    const handleChangeSelect = (event, name) => {
        const value = event.target.getAttribute("data-value")
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsOpen(false)
        setFormData(initialState)
        try{
            const { data } = await axios.post("http://localhost:4000/api/ticket/assignEmployee", {
                ticketStorage,
                formData
            });
            alert("Ticket asignado!")
            navigate("/managementallocation")
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
                        <RowInformation className="text-start font-semibold" items={headers} />
                    </div>
                    <div className="w-full py-4 px-2 flex items-start flex-col gap-y-2">
                        <RowInformation className="pl-4" items={[infoTicket?.username,infoTicket?.estado] } />
                    </div>
                </section>
                <TicketDescription 
                    title="Descripcion Ticket" 
                    description={infoTicket?.mensaje}
                />
                <Button className="mb-6" size="md" color="blue-300" onClick={handleReponseTicket}>Asignar</Button>
                <div className="w-full flex items-center justify-between">
                </div>
            </section>
            <Modal className="w-11/12 mx-auto pt-10 pb-6 px-5 max-w-md rounded-lg" ref={modalRef} isOpen={isOpen}>
                <Image className="w-5 h-5 ml-auto mb-8 hover:cursor-pointer" src={close} alt="arrow icon" onClick={setIsOpen} />
                <h2 className="mb-8 text-blue-500 text-3xl font-bold text-center">Asignar Empleado</h2>
                <Form onSubmit={handleSubmit}>
                    <Select
                        description="Empleados disponibles"
                        name="employee"
                        options={employees.map((employee) => ({
                            name: employee.username, // Reemplaza 'nombre' por el campo adecuado de tus datos de empleado
                            value: employee.id_usuario // Reemplaza 'id' por el campo adecuado de tus datos de empleado
                        }))}
                        onChange={handleChangeSelect}
                    />
                    <Input className="mt-2 hover:cursor-pointer" type="submit" value="Enviar" size="md" color="blue-300" />
                </Form>
            </Modal>
        </WrappedWidth>
    )
}

export { AllocationTicketspage }