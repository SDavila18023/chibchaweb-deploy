import { Link } from "react-router-dom"
import { Button } from "../../components/Custom/Button"
import { WrappedWidth } from "../../components/Custom/WrappedWidth"
import { TicketsCreate } from "../../components/Tickets/TicketsCreate"

const TicketsPage = () => {

    return (
        <WrappedWidth className="max-w-lg mt-10 mb-14 lg:max-w-lg" size={11}>
            <div className="w-full mb-6 grid grid-cols-2 gap-x-3">

            </div>
            <TicketsCreate />
        </WrappedWidth>
    )
}

export { TicketsPage }