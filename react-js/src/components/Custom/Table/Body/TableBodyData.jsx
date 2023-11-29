import { merge } from "../../../../utils/merge"


const TableBodyData = ({ className = "", children, onClick }) => {

    return (
        <td className={merge("p-3", className)} onClick={onClick}>
            {children}
        </td>
    )
}

export { TableBodyData }