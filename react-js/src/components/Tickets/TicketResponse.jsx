import { RowInformation } from "../Account/RowInformation"
import { TicketDescription } from "./TicketDescription"

const headers = ["Empleado:", "Estado:"]

const TicketResponse = ({ employee, state, response, title ="Descripcion Ticket" }) => {

    return (
        <article className="w-full py-6 px-10 rounded-md bg-yellow-100">
            <div className="flex gap-x-5 text-sm">
                <div className="py-4 px-2">
                    <RowInformation className="text-start font-semibold" items={headers} />
                </div>
                <div className="py-4 px-2">
                    <p>{employee}</p>
                    <p>{state}</p>
                </div>
            </div>
            <TicketDescription
                color="yellow-500"
                title={title}
                description={response}
            />
        </article>
    )
}

export { TicketResponse }