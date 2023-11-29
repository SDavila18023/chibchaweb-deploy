import { Form } from "../Custom/Form/Form"
import { Input } from "../Custom/Form/Input"
import { Select } from "../Custom/Form/Select"
import { useFormInput } from "../../hooks/useFormInput"
import { troubles } from "../../utils/data"
import { Textarea } from "../Custom/Form/Textarea"
import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {Button} from "../Custom/Button.jsx";

const initialState = {
    description: "",
    subject: "",
    trouble: ""
}

const TicketsCreate = () => {
    
    const [categories, setCategories] = useState([])
    const [formData, handleChange, setFormData] = useFormInput(initialState)
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    const navigate = useNavigate();

    const fetchCategories = async ()=>{
        const request = async (url) => {
            return await fetch(url)
                .then(response => response.json())
        }
        request("http://localhost:4000/api/ticket/categorias")
            .then(response => {
                const mapping = response.data.map(item => ({
                    name: item.descripcion,
                    value: item.id_categoria
                }))
                setCategories(mapping)
            })
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        const newData = {
            ...formData,
            id_usuario: userInfo[0].id_usuario
        };
        try {
            const {data} = axios.post("http://localhost:4000/api/ticket/create",{
                newData
            })

            alert("Ticket creado exitosamente")
            navigate("/usertickets")
        }catch (err){

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
        <section className="mt-8 relative z-0">
            <h3 className="mb-6 text-blue-400 font-bold font-inika text-center sm:text-lg">Bienvenidos al soporte de ChibchaWeb</h3>
            <Form className="gap-y-3" onSubmit={handleSubmit}>
                <Select className="mb-8" description="Selecciona tu problema" name="trouble" options={categories}  value={formData.trouble} onChange={handleChangeSelect} />
                <Input value={formData.subject} name="subject" size="md" color="gray-300" placeholder="Asunto" onChange={handleChange} />
                <Textarea className="h-36" value={formData.description} name="description" size="md" color="gray-200" placeholder="Cuéntanos tu problema" onChange={handleChange} />
                <Input className="max-w-xs mx-auto mt-6" type="submit" value="Generar ticket" size="md" color="white" />
            </Form>
            <Button className="w-full max-w-xs mt-4 mx-auto block" size="md" color="red-400">
                <Link className="w-full h-full grid place-content-center" to="/usertickets">Ver mis tickets</Link>
            </Button>
        </section>
    )
}

export {  TicketsCreate }