import express from "express";
import  DatabaseConnection  from "../config/db.js";

const ticket = express.Router();
//Instanciación Conexión base de datos
const connection = DatabaseConnection.getConnection();

//Admin
ticket.get("/",(req,res)=>{
    connection.query("select t.id_ticket, t.asunto, u.username, DATE_FORMAT(t.fecha_entrada, '%d-%m-%y') as fecha_entrada, c.descripcion,  t.estado from ticket t join categoria c on t.categoria = c.id_categoria join usuario u on t.id_user = u.id_usuario;",(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })
})

//Empleado
ticket.get("/assigned/:id",(req,res)=>{
    const id = req.params.id;

    connection.query("select t.id_ticket, t.asunto, u.username, DATE_FORMAT(t.fecha_entrada, '%d-%m-%y') as fecha_entrada,c.descripcion, t.estado from ticket t\n" +
        "    join categoria c on t.categoria = c.id_categoria\n" +
        "    join usuario u on t.id_user = u.id_usuario\n" +
        "    join ticket_staff ts on t.id_ticket = ts.id_ticket\n" +
        "where ts.id_staff = ? and ts.id_staff in (select id_staff from ticket_staff);\n",id,(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })
})

//Count Tickets Pendientes
ticket.get("/countPending/:id",(req,res)=>{
    const id = req.params.id;

    connection.query("SELECT COUNT(*) as Pending FROM ticket_staff ts JOIN ticket t on ts.id_ticket = t.id_ticket WHERE id_staff = ? AND t.estado = 'P'\n",id,(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })
})

//Count Tickets Totales
ticket.get("/countTotal",(req,res)=>{

    console.log()
    connection.query("SELECT COUNT(*) as Total FROM ticket",(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })
})
ticket.post("/create",(req,res)=>{
    const formData = req.body.newData;
    console.log(formData)
    const Values = [
        formData.id_usuario,
        formData.trouble,
        formData.subject,
        formData.description
    ]

    //Falta Consulta SQL
    const SQL = "CALL createTicket (?,?,?,?)";

    connection.query(SQL, Values, (err,results)=>{
        if (err) {
            res.send(err);
        } else {
            console.log("Ticket creado");
            res.send({ message: "Ticket creado" });
        }
    })
})

ticket.post("/response",(req,res)=>{
    const formData = req.body;

    const Values = [
        formData.id_usuario,
        formData.categoria,
        formData.asunto,
        formData.descripcion
    ]

    //Falta Consulta SQL
    const SQL = "";

    connection.query(SQL, Values, (err,results)=>{
        if (err) {
            res.send(err);
        } else {
            console.log("Ticket creado");
            res.send({ message: "Ticket creado" });
        }
    })
})

ticket.get("/categorias",(req,res)=>{

    const SQL = "SELECT id_categoria, descripcion FROM categoria";

    connection.query(SQL, (err,results)=>{
        if (err) {
            console.error("Error al obtener los datos");
            res.status(500).json({ error: "Error" });
            return;
        }

        res.json({ data: results });
    })
})

ticket.get("/countEmpleados",(req,res)=>{

    const SQL = "select count(*) as totalEmpleados from user_role where id_role = 3 ";

    connection.query(SQL, (err,results)=>{
        if (err) {
            console.error("Error al obtener los datos");
            res.status(500).json({ error: "Error" });
            return;
        }

        res.json({ data: results });
    })
})

ticket.get("/countUnassigned",(req,res)=>{

    const SQL = "select count(*) as tickets from ticket where id_ticket not in (select id_ticket from ticket_staff)";

    connection.query(SQL, (err,results)=>{
        if (err) {
            console.error("Error al obtener los datos");
            res.status(500).json({ error: "Error" });
            return;
        }

        res.json({ data: results });
    })
})

ticket.get("/getCoordinatorTickets",(req,res)=>{

    const SQL = "SELECT * FROM coordinatorTickets";

    connection.query(SQL, (err,results)=>{
        if (err) {
            console.error("Error al obtener los datos");
            res.status(500).json({ error: "Error" });
            return;
        }

        res.json({ data: results });
    })
})

ticket.get("/getInfoTicket/:id",(req,res)=>{
    const id_ticket = req.params.id;

    const SQL = "SELECT t.asunto, u.username, t.estado, mensaje FROM ticket t join usuario u on t.id_user = u.id_usuario where id_ticket = ?;\n";

    connection.query(SQL,id_ticket,(err,results)=>{
        if(err){
            console.error("Error al obtener los datos");
            res.status(500).json({ error: "Error" });
            return;
        }
        res.json({ data: results });
    })
})

ticket.get("/getEmployees",(req,res)=>{
    const SQL = "SELECT u.username, u.id_usuario from usuario u JOIN user_role ur on u.id_usuario = ur.id_user WHERE id_role = 3 or id_role = 1";

    connection.query(SQL,(err,results)=>{
        if(err){
            console.error("Error al obtener los datos");
            res.status(500).json({ error: "Error" });
            return;
        }
        res.json({ data: results });
    })
})

ticket.post("/assignEmployee",(req,res)=>{


    const idTicket = req.body.ticketStorage;
    const idEmployee = req.body.formData.employee;

    console.log(idEmployee)

    const SQL = "CALL asignStafftoTicket (?,?)";

    connection.query(SQL,[idTicket, idEmployee],(err,results)=>{
        if(err){
            console.error(err);
            res.status(500).json({ error: "Error" });
            return;
        }
        console.log("Empleado asignado");
        res.send({ message: "Empleado asignado" });
    })
})

ticket.get("/getInfoTicketEmployee/:id",(req,res)=>{
    const id_ticket = req.params.id;

    const SQL = "SELECT t.asunto, u.username AS username_user, t.estado , IFNULL(s.username, 'Sin asignar') AS username_staff, t.mensaje, c.descripcion\n" +
        "FROM ticket t\n" +
        "JOIN categoria c ON t.categoria = c.id_categoria\n" +
        "JOIN usuario u ON t.id_user = u.id_usuario\n" +
        "LEFT JOIN ticket_staff ts ON t.id_ticket = ts.id_ticket\n" +
        "LEFT JOIN usuario s ON ts.id_staff = s.id_usuario where t.id_ticket = ?;";

    connection.query(SQL,id_ticket,(err,results)=>{
        if(err){
            console.error("Error al obtener los datos");
            res.status(500).json({ error: "Error" });
            return;
        }
        res.json({ data: results });
    })
})

ticket.post("/responseTicket",(req,res)=>{

    const idTicket = req.body.ticketStorage;
    const idEmployee = req.body.employee;
    const response = req.body.response;

    console.log(idEmployee)

    const SQL = "CALL responseToTicket (?,?,?)";

    connection.query(SQL,[idTicket, idEmployee,response],(err,results)=>{
        if(err){
            console.error(err);
            res.status(500).json({ error: "Error" });
            return;
        }
        console.log("Empleado asignado");
        res.send({ message: "Empleado asignado" });
    })
})

ticket.get("/getResponses/:id",(req,res)=>{

    const idTicket = req.params.id;
    console.log(idTicket)
    const SQL = "select r.response, s.username from ticket_response r\n" +
        "LEFT JOIN usuario s ON r.id_staff = s.id_usuario where r.id_ticket = ?;";

    connection.query(SQL,[idTicket],(err,results)=>{
        if(err){
            console.error("Error al obtener los datos");
            res.status(500).json({ error: "Error" });
            return;
        }
        res.json({ data: results });
    })
})

ticket.get("/getTicketsByUser/:id",(req,res)=>{

    const idUser = req.params.id;
    console.log(idUser)
    const SQL = "SELECT id_ticket, asunto, estado from ticket where id_user = ?;";

    connection.query(SQL,[idUser],(err,results)=>{
        if(err){
            console.error("Error al obtener los datos");
            res.status(500).json({ error: "Error" });
            return;
        }
        res.json({ data: results });
    })
})

ticket.get("/getDescriptionById/:id",(req,res)=>{

    const idTicket = req.params.id;
    const SQL = "SELECT mensaje from ticket where id_ticket = ?;";

    connection.query(SQL,[idTicket],(err,results)=>{
        if(err){
            console.error("Error al obtener los datos");
            res.status(500).json({ error: "Error" });
            return;
        }
        res.json({ data: results });
    })
})




export default ticket;