const Image = ({ className, src, alt = "", onClick }) => {
    return <img className={className} src={src} alt={alt} loading="lazy" draggable="false" onClick={onClick} />
}

export { Image }