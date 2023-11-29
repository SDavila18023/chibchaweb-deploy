
const TableHeader = ({ headers }) => {

    return (
        <thead className="w-full bg-slate-100 rounded-md">
            <tr className="w-full text-gray-700 text-xs text-left uppercase">
                {headers.map((item, key) => (
                    <th className="p-3" key={key}>{item}</th>
                ))}
            </tr>
        </thead>
    )
}

export { TableHeader }