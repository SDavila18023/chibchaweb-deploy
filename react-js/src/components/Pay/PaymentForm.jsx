import React, {memo, useState, useRef} from "react"
import { Form } from "../Custom/Form/Form"
import { Input } from "../Custom/Form/Input"
import { useNavigate } from "react-router-dom"


const PaymentForm = memo(({ formData, onChange, sendPay }) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        sendPay()
    }

    return (
        <section className="w-full">
            <h2 className="mt-6 mb-4 text-blue-500 text-2xl font-bold font-inika text-center">Metodo de pago</h2>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="number"
                    name="number"
                    placeholder="Número de tarjeta"
                    value={formData.number}
                    onChange={onChange}
                    size="md" color="gray-400"
                    maxLength="16"
                />
                <Input value={formData.name} size="md" color="gray-400" name="name" placeholder="Nombre del titular" onChange={onChange} />

                <label className="w-full flex items-center gap-x-3" htmlFor="">
                    <Input
                        type="tel"
                        name="cvc"
                        placeholder="CVC"
                        value={formData.cvc}
                        onChange={onChange}
                        size="md" color="gray-400"
                    />
                    <Input
                        type="tel"
                        name="expiry"
                        placeholder="Fecha de vencimiento"
                        value={formData.expiry}
                        onChange={onChange}
                        size="md" color="gray-400"
                    />
                </label>
                <Input className="mt-4" type="submit" value="Continuar" size="md" color="blue-300" />
            </Form>
        </section>
    )
})

export { PaymentForm }