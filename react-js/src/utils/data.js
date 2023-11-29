import disk from "../assets/icons/disk.svg"
import cloud from "../assets/icons/cloud.svg"
import email from "../assets/icons/mail.svg"
import domain from "../assets/icons/globe.svg"
import database from "../assets/icons/database.svg"
import card from "../assets/icons/card.svg"

const typesDocuments = [
    { name: "Cedula de ciudadania", value: "cedulaCiudadania" },
    { name: "Cedula extranjera", value: "cedulaExtranjera" }
]

const listCountries = [
    { name: "Colombia", value: "Colombia" },
    { name: "Portugal", value: "Portugal"},
    { name: "Brasil", value: "Brasil"}
]

const listAreas = [
    { name: "Administracion", value: "administracion" },
    { name: "Finanzas", value: "finanzas" },
]

const troubles = [
    { name: "Dominios", value: "Dominio" },
    { name: "Hosting", value: "Host" }
]

const homeLinks = [
    { name: "Registrarte", to: "register" },
    { name: "Iniciar sesión", to: "login" },
    { name: "Planes", to: "plans" },
    { name: "Ayuda", value: "" },
]

const homeAuthUser = [
    { name: "Mi cuenta", to: "account" },
    { name: "Dominios", to: "domains" },
    { name: "Planes", to: "plans" },
    { name: "Tickets", to: "tickets" },
    { name: "Registrar Dominios", to: "test" },
]

const homeAuthAdministrator = [
    { name: "Gestión usuarios", to: "/managementuser" },
    { name: "Gestión tickets", to: "/managementallocation" },
]

const homeAuthCoordinator = [
    { name: "Gestión tickets", to: "/managementallocation" },
]

const homeAuthStaff = [
    { name: "Tickets Asignados", to: "/assignedtickets" },
]

const footerServices = [
    { name: "Servicios", to: "." },
    { name: "Dominios", to: "domains" },
    { name: "Planes", to: "plans" },
]

const footerHelp = [
    { name: "Ayuda", to: "." },
    { name: "Generar ticket", to: "tickets" },
]


const planBasic = {
    id: "1",
    title: "Chibcha Plata",
    subtitle: "Plan Básico",
    price: "12.000 / mes",
    benefits: [
        { urlImage: disk, title: "10GB de espacio SSD" },
        { urlImage: cloud, title: "Copia de seguridad" },
        { urlImage: email, title: "10 Correos asociados" },
        { urlImage: domain, title: "5 Dominios" },
        { urlImage: database, title: "2 Base de datos" },
        { urlImage: card, title: "Pagos: PSE, Crédito o Débito"  },
    ]
}

const planMedium = {
    id: "2",
    title: "Chibcha Oro",
    subtitle: "Plan Medio",
    price: "23.100 / mes",
    benefits: [
        { urlImage: disk, title: "20GB de espacio SSD" },
        { urlImage: cloud, title: "Copia de seguridad" },
        { urlImage: email, title: "20 Correos asociados" },
        { urlImage: domain, title: "20 Dominios" },
        { urlImage: database, title: "20 Base de datos" },
        { urlImage: card, title: "Pagos: PSE, Crédito o Débito" },
    ]
}


const planPlatinum = {
    id: "3",
    title: "Chibcha Platino",
    subtitle: "Plan Empresarial",
    price: "67.700 / mes",
    benefits: [
        { urlImage: disk, title: "60GB de espacio SSD" },
        { urlImage: cloud, title: "Copia de seguridad" },
        { urlImage: email, title: " Correos asociados" },
        { urlImage: domain, title: "5 Dominios" },
        { urlImage: database, title: "1 Base de datos" },
        { urlImage: card, title: "Pagos: PSE, Crédito o Débito" },
    ]
}

const listPlans = [
    planBasic,
    planMedium,
    planPlatinum
]


export { typesDocuments, listCountries, listAreas, homeLinks, homeAuthUser, homeAuthAdministrator, footerServices, footerHelp, listPlans, planBasic, troubles, homeAuthCoordinator, homeAuthStaff }