
const TableBody = ({ className = "", children }) => {

    return (
        <tbody className={className}>
            {children}
        </tbody>
    )
}

export { TableBody }