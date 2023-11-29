import { WrappedWidth } from "../components/Custom/WrappedWidth"
import { TableHeader } from "../components/Custom/Table/TableHeader"
import { Table } from "../components/Custom/Table/Table"
import { TableBody } from "../components/Custom/Table/Body/TableBody"
import { Modal } from "../components/Custom/Loading/Modal"
import { Form } from "react-router-dom"
import { Input } from "../components/Custom/Form/Input"
import { useFormInput } from "../hooks/useFormInput"
import { useToggle } from "../hooks/useToggle"
import {useEffect, useRef, useState} from "react"
import { Image } from "../components/Custom/Loading/Image"
import close from "../assets/icons/close.svg"
import { Textarea } from "../components/Custom/Form/Textarea"
import { Select } from "../components/Custom/Form/Select"
import { TableRow } from "../components/Custom/Table/TableRow"
import { TableBodyData } from "../components/Custom/Table/Body/TableBodyData"
import axios from "axios";

const headers = ["ID", "Nombre", "Plan","Tipo", "Estado", "Editar","Eliminar"]


const roles = [
    { name: "User", value: "5" },
    { name: "Admin", value: "1" }
]

const paquetes = [
    { name: "Chibcha Plata", value: "1" },
    { name: "Chibcha Oro", value: "2" },
    { name: "Chibcha Platino", value: "3" },
]

const initialState = {
    id_usuario: "",
    username: "",
    paquete: '', // Cambiado de 0 a ''
    role: '',    // Cambiado de 0 a ''
}


const ManagementUserPage = () => {

    const [body,setBody] = useState([])
    const [numUsers, setNumUsers] = useState(0)
    const [numProviders, setNumProviders] = useState(0)
    const modalRef = useRef(null)
    const [isOpen, setIsOpen] = useToggle()
    const [formData, handleChange, setFormData] = useFormInput(initialState)

    const fetchUsers = async () =>{
        const response = await axios.get(
            "http://localhost:4000/api/admin/"
        );
        console.log(response.data.data)
        setBody(response.data.data);

    }

    const fetchNumUsers = async () =>{
        const response = await axios.get(
            "http://localhost:4000/api/admin/countUsers"
        );
        console.log(response.data.data[0].Users)
        setNumUsers(response.data.data[0].Users);
    }

    const fetchProviders = async () =>{
        const response = await axios.get(
            "http://localhost:4000/api/admin/countProvider"
        );
        setNumProviders(response.data.data[0].Provider)

    }

    useEffect(() => {
        fetchUsers();
        fetchNumUsers();
        fetchProviders();
        console.log(body)
    }, [])


    const handleEdit = (id_usuario) => {
        setIsOpen(false); // Cierra el modal antes de configurar los datos

        const selectedUser = body.find(user => user.id_usuario === id_usuario);

        if (selectedUser) {
            setFormData({
                id_usuario: selectedUser.id_usuario || "",
                username: selectedUser.username || "",
                paquete: selectedUser.paquete || "",
                role: selectedUser.role || "",
            });

            setIsOpen(true); // Abre el modal después de configurar los datos
        } else {
            console.log("Usuario no encontrado");
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(formData)



        const selectedPackageValue = parseInt(formData.paquete, 10);
        const selectedRoleValue = parseInt(formData.role, 10);


        const response = await axios.put(
            "http://localhost:4000/api/admin/update",
            {
                id_usuario: formData.id_usuario,
                username: formData.username,
                paquete: selectedPackageValue,
                role: selectedRoleValue
            }
        );

        // Realizar acciones con la respuesta si es necesario
        console.log(response.data); // Mostrar la respuesta en la consola
        window.location.reload();
    }
    const handleDelete = async (key, estado) =>{
        console.log(key,estado)
        if(estado === 'I') {
            console.log("Entra")
            try {
                const { data } = await axios.put("http://localhost:4000/api/admin/activate", {
                    key
                });
                alert("Usuario Activado")
                window.location.reload()
            }
            catch (error) {
                alert("Error" + error)
            }
        } else if (estado === 'A'){
            console.log("Es A")
                try {
                    const { data } = await axios.put("http://localhost:4000/api/admin/delete", {
                        key
                    });
                    alert("Usuario Desactivado")
                    window.location.reload()
                }
                catch (error) {
                    alert("Error" + error)
                }
        }
    }

    const handleChangeSelect = (event, name) => {
        const value = event.target.getAttribute("data-value")
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <>
            <WrappedWidth size={11}>
                <section className="w-full grid grid-cols-2 items-center justify-center font-bold font-inika">
                    <div className="text-center">
                        <span className="text-blue-500 text-7xl">{numUsers}</span>
                        <p className="text-xl">Usuarios</p>
                    </div>
                    <div className="text-center border-l-2 border-yellow-400">
                        <span className="text-blue-500 text-7xl">{numProviders}</span>
                        <p className="text-xl">Proveedores</p>
                    </div>
                </section>
                <Table className="mt-6 table rounded-lg overflow-hidden">
                    <TableHeader headers={headers} />
                    <TableBody>
                        {body.map(({ id_usuario, username, nombre_paquete, cargo, estado }, index) => (
                            <TableRow key={index}>
                                <TableBodyData>{id_usuario}</TableBodyData>
                                <TableBodyData>{username}</TableBodyData>
                                <TableBodyData>{nombre_paquete}</TableBodyData>
                                <TableBodyData>{cargo}</TableBodyData>
                                <TableBodyData>{estado}</TableBodyData>
                                <TableBodyData className="text-blue-300 hover:cursor-pointer" onClick={() => handleEdit(id_usuario)}>
                                    Editar
                                </TableBodyData>
                                <TableBodyData className="text-blue-300 hover:cursor-pointer" onClick={() => handleDelete(id_usuario, estado)}>
                                    {estado === 'I' ? "Activar" : "Eliminar"}
                                </TableBodyData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </WrappedWidth>
            <Modal className="w-11/12 mx-auto pt-10 pb-6 px-5 max-w-md rounded-lg" ref={modalRef} isOpen={isOpen}>
                <Image className="w-5 h-5 ml-auto mb-8 hover:cursor-pointer" src={close} alt="arrow icon" onClick={setIsOpen} />
                <Form className="flex flex-col gap-y-5" onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        <span className="mb-1 block text-sm text-blue-500 italic">Usuario</span>
                        <Input value={formData.username} name="username" size="sm" color="gray-300" onChange={handleChange} />
                    </label>
                    <label htmlFor="plan">
                        <span className="mb-1 block text-sm text-blue-500 italic">Plan</span>
                        <Select classButton="h-8" description="paquete" name="paquete" options={paquetes} value={formData.paquete} onChange={handleChangeSelect} />
                    </label>
                    <label htmlFor="role">
                        <span className="mb-1 block text-sm text-blue-500 italic">Role</span>
                        <Select classButton="h-8" description="Role" name="role" options={roles} value={formData.role} onChange={handleChangeSelect} />
                    </label>
                    <Input className="mt-8 hover:cursor-pointer" type="submit" value="Actualizar" size="sm" color="blue-300" />
                </Form>
            </Modal>
        </>
    )
}

export { ManagementUserPage }