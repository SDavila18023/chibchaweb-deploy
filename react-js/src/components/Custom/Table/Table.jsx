import { merge } from "../../../utils/merge"

const Table = ({ className = "", children }) => {

    return (
        <table className={merge("w-full", className)}>
            {children}
        </table>
    )
}

export { Table }