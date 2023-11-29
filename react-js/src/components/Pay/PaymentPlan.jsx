import { Form } from "../Custom/Form/Form"
import { Select } from "../Custom/Form/Select"
import axios from "axios";
import {useEffect, useState} from "react";

const PaymentPlan = ({ formData, onChange }) => {

    const [precios, setPrecios] = useState([]);
    const [selectedPrecio, setSelectedPrecio] = useState('');
    const [preciosArray, setPreciosArray] = useState({});

    useEffect(() => {
        // Llamada a la API para obtener los precios desde tu backend
        fetch(`http://localhost:4000/api/plan/prices?id=${localStorage.getItem("plan")}`)
            .then(response => response.json())
            .then(data => {
                const preciosData = data.data[0];
                setPreciosArray(preciosData);
                const opcionesPrecios = Object.keys(preciosData);
                setPrecios(opcionesPrecios);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePrecioChange = event => {
        const { name, value } = event.target
        onChange(event)
    };


    return (
        <section className="w-full mb-6">
            <h2 className="mt-6 mb-4 text-blue-500 text-2xl font-bold font-inika text-center">Nombre del plan</h2>
            <Form>
                <select size="sm" color="gray-300" name="price" required onChange={handlePrecioChange}>
                    <option value="">Selecciona un precio</option>
                    {precios.map((precio, index) => (
                        <option key={index} name="price" value={preciosArray[precio] ?? 0}>
                            {precio.replace('_', ' ')} - {precio === 'precio_anual' ? `$${preciosArray[precio]}` : `$${preciosArray[precio]}`}
                        </option>
                    ))}
                </select>
            </Form>
        </section>
    )
}

export { PaymentPlan }