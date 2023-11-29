import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "../Custom/Loading/Modal";
import { Form } from "../Custom/Form/Form";
import { Input } from "../Custom/Form/Input";
import { Image } from "../Custom/Loading/Image";
import close from "../../assets/icons/close.svg";
import { useAuth } from "../../hooks/useAuth.js";

const AccountEdit = ({ isOpen, onToggle }) => {
    const modalRef = useRef(null);
    const [countries, setCountries] = useState([]);
    const [documents, setDocuments] = useState([]);

    const [correo, setCorreo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [nombreCompleto, setNombreCompleto] = useState("");
    const [tDoc, setTDoc] = useState(0);
    const [documento, setDocumento] = useState("");
    const [username, setUsername] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [pais, setPais] = useState(0);

    const { auth } = useAuth();

    useEffect(() => {
        const fetchPaises = async () => {
            const response = await axios.get("http://localhost:4000/api/countries");
            setCountries(response.data.data);
        }
        const fetchTiposDocumentos = async () => {
            const response = await axios.get(
                "http://localhost:4000/api/tipo_doc"
            );
            setDocuments(response.data.data);
        }

        fetchPaises();
        fetchTiposDocumentos();

        if (auth) {
            const {
                correo,
                descripcion,
                nombre_completo,
                t_doc,
                documento,
                username,
                fecha_nacimiento,
                telefono,
                direccion,
                pais,
            } = auth;

            setCorreo(correo ?? "");
            setDescripcion(descripcion ?? "");
            setNombreCompleto(nombre_completo ?? "");
            setDocumento(documento ?? "");
            setUsername(username ?? "");
            setFechaNacimiento(fecha_nacimiento ?? "");
            setTelefono(telefono ?? "");
            setDireccion(direccion ?? "");
        }
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            correo,
            descripcion,
            nombre_completo: nombreCompleto,
            t_doc: tDoc,
            documento,
            username,
            fecha_nacimiento: fechaNacimiento,
            telefono,
            direccion,
            pais,
        };

        try {
            await axios.put("http://localhost:4000/api/users/update", formData);
            const userInfo = JSON.parse(localStorage.getItem('authentication'));
            const updatedUserInfo = { ...userInfo[0], ...formData };
            localStorage.setItem("authentication", JSON.stringify([updatedUserInfo]));
            alert("Se actualizó la información")
        } catch (error) {
            console.error("Error al actualizar la información:", error);
        }
    };

    return (
        <Modal className="w-11/12 mx-auto pt-10 pb-6 px-5 max-w-md rounded-lg" ref={modalRef} isOpen={isOpen}>
            <Image className="w-5 h-5 ml-auto mb-8 hover:cursor-pointer" src={close} alt="arrow icon" onClick={onToggle} />
            <Form className="" onSubmit={handleSubmit}>
                <label htmlFor="nombre_completo" size="sm" color="gray-300">Nombre</label>
                <Input type="text" id="nombre_completo" name="nombre_completo" size="sm" color="gray-300" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
                <label htmlFor="username" size="sm" color="gray-300">Usuario</label>
                <Input type="text" id="username" name="username" size="sm" color="gray-300" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="fecha" size="sm" color="gray-300">Fecha de nacimiento</label>
                <Input type="date" id="fecha_nacimiento" name="fecha_nacimiento" size="sm" color="gray-300" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
                <label htmlFor="telefono" size="sm" color="gray-300">Telefono</label>
                <Input type="number" id="telefono" name="telefono" size="sm" color="gray-300" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                <label htmlFor="direccion" size="sm" color="gray-300">Dirección</label>
                <Input type="text" id="direccion" name="direccion" size="sm" color="gray-300" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                <label htmlFor="descripcion" size="sm" color="gray-300">Descripción</label>
                <textarea className="w-full py-3 px-2 border border-gray-200 rounded-sm resize-none focus:outline-none" id="descripcion" name="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                <Input className="mt-8 hover:cursor-pointer" type="submit" value="Actualizar" size="sm" color="blue-300" />
            </Form>
        </Modal>
    );
};

export { AccountEdit };

