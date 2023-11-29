import { merge } from "../../../utils/merge"

const TableRow = ({ className = "", children }) => {

    return (
        <tr className={merge("text-sm border-b last:border-b-0", className)}>
            {children}
        </tr>
    )
}

export { TableRow }