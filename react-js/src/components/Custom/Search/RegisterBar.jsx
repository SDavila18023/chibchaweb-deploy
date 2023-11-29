import { Form } from "../Form/Form"
import { Input } from "../Form/Input"
import { merge } from "../../../utils/merge"
import axios from "axios";
import {useState} from "react";


const RegisterBar = ({ className ="", placeholder, query, onChange, onSubmit }) => {

    const [domain, setDomain] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))

    const handleSubmit = async (event) => {
        event.preventDefault();

        const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
    <user>
      <id>${userInfo[0].id_usuario}</id>
      <domain>${domain}</domain>
    </user>`;

        try {
            const response = await axios.post("http://localhost:4000/api/domain/registerDomain", xmlData, {
                headers: {
                    'Content-Type': 'application/xml',
                },
                responseType: 'blob', // Indica que la respuesta es un blob (archivo)
            });


            alert("Dominio registrado exitosamente, descargando archivo XML...")
            const blob = new Blob([response.data], { type: 'application/xml' });
            // Crear un enlace de descarga y hacer clic en él para descargar el archivo
            const downloadLink = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadLink;
            link.download = 'response.xml';
            link.click();

        } catch (error) {
            console.log("Error", error);
        }
    };


    return (
        <Form className={merge("w-full mt-4 grid grid-cols-[1fr_0.5fr] gap-x-3", className)} onSubmit={handleSubmit}>
            <Input value={domain} size="sm" color="gray-300" placeholder={placeholder} onChange={(e)=>{setDomain(e.target.value)}}/>
            <Input className="" type="submit" value="Registrar" size="sm" color="white" />
        </Form>
    )
}

export { RegisterBar }