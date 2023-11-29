import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth"
import { Form } from "../../components/Custom/Form/Form"
import { WrappedWidth } from "../../components/Custom/WrappedWidth"
import { useFormInput } from "../../hooks/useFormInput"
import { Input } from "../../components/Custom/Form/Input"
import { Select } from "../../components/Custom/Form/Select"
import logo from "../../assets/images/logo.png"

const initialState = {
    user: "",
    email: "",
    password: "",
    typeDocument: "",
    document: "",
    country: "",
    birthday: "",
}


const RegisterPage = () => {
    const { auth, setAuth } = useAuth()
    const navigate = useNavigate();
    const [countries, setCountries] = useState([])
    const [documents, setDocuments] = useState([])
    const [formData, handleChange, setFormData] = useFormInput(initialState)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(
                "http://localhost:4000/api/users/register",
                {
                    Email: formData.email,
                    Username: formData.user,
                    Password: formData.password,
                    Name: formData.user,
                    Country: formData.country,
                    Tipodoc: formData.typeDocument,
                    Document: formData.document
                }
            );
            setAuth({
                cargo: "Usuario",
                correo: formData.email,
                nombre_completo: formData.user,
                fecha_nacimiento: formData.fecha_nacimiento,
                id_role: 5,
            })
            navigate("/account")
        } catch (error) {
            console.log("Error", error);
        }
    }

    useEffect(() => {
        const request = async (url) => {
            return await fetch(url)
                .then(response => response.json())
        }
        request("http://localhost:4000/api/countries")
            .then(response => {
                const mapping = response.data.map(item => ({
                    name: item.nombre_pais,
                    value: item.id_pais
                }))
                setCountries(mapping)
            })
        request("http://localhost:4000/api/tipo_doc")
            .then(response => {
                const mapping = response.data.map(item => ({
                    name: item.descripcion,
                    value: item.id_documento
                }))
                setDocuments(mapping)
            })
    }, [])

    const handleChangeSelect = (event, name) => {
        const value = event.target.getAttribute("data-value")
        setFormData({
            ...formData,
            [name]: value
        })
    }

    if (auth) return <Navigate to="/account" />

    return (
        <WrappedWidth size={10}>
            <img className="mb-6" src={logo} alt="logo image" />
            <Form onSubmit={handleSubmit}>
                <Input value={formData.user} name="user" size="md" color="gray-300" placeholder="Usuario" onChange={handleChange} required />
                <Input type="email" value={formData.email} name="email" size="md" color="gray-300" placeholder="Correo" onChange={handleChange} required />
                <Select name="typeDocument" description="Tipo documento" options={documents} onChange={handleChangeSelect} required />
                <Input type="number" value={formData.document} name="document" size="md" color="gray-300" placeholder="Documento" onChange={handleChange} required />
                <Select name="country" description="Pais" options={countries} onChange={handleChangeSelect} required />
                <Input type="password" value={formData.password} name="password" size="md" color="gray-300" placeholder="Contraseña" onChange={handleChange} required />
                <Input className="mt-8 hover:cursor-pointer" type="submit" value="Registrarse" size="md" color="white" />
            </Form>
        </WrappedWidth>
    )
}

export { RegisterPage }