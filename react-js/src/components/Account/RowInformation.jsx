

const RowInformation = ({ className = "", items }) => {
    return items.map((item, key) => (
        <p className={className} key={key}>{item}</p>
    ))
}

export { RowInformation }