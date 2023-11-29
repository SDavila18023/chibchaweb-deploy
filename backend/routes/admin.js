import express from "express";
import  DatabaseConnection  from "../config/db.js";

//Instanciación router de express
const admin = express.Router();
//Instanciación Conexión base de datos
const connection = DatabaseConnection.getConnection();

admin.get('/', async (req, res) => {
    connection.query("SELECT u.id_usuario, u.username, r.cargo, u.estado, p.id_paquete, p2.nombre_paquete FROM usuario u LEFT JOIN user_paquete p ON u.id_usuario = p.id_user JOIN user_role ur ON u.id_usuario = ur.id_user JOIN role r ON ur.id_role = r.id_role LEFT JOIN paquete p2 on p.id_paquete = p2.id_paquete ORDER BY u.id_usuario;\n",(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })
});

admin.get('/countUsers', async (req, res) => {
    connection.query("SELECT COUNT(*) as Users FROM user_role WHERE id_role = 5",(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })
});

admin.get('/countProvider', async (req, res) => {
    connection.query("SELECT COUNT(*) as Provider FROM user_role WHERE id_role = 4",(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })
});


admin.post('/create', async (req, res) => {

    const Email = req.body.Email;
    const Username = req.body.Username;
    const Password = req.body.Password;
    const t_doc= req.body.Tipodoc;
    const doc= req.body.Document;
    const Country = req.body.Country;
    const Nombre_Completo = req.body.Name;

    //Consulta SQL
    const SQL =
        "INSERT INTO usuario (nombre_completo, t_doc, documento, correo, username, password, pais) VALUES (?,?,?,?,?,?,?)";

    //Ingreso de datos
    const Values = [Nombre_Completo, t_doc, doc, Email, Username, Password, Country];

    //Query
    connection.query(SQL, Values, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log("Usuario creado correctamente");
            res.send({ message: "Usuario creado" });
        }
    });
});

admin.put('/update', async (req, res) => {
    const formData = req.body;
    console.log(formData)
    // Actualizar la tabla correspondiente en la base de datos basado en el correo electrónico
    const sql = 'CALL updateUserByPage (?,?,?,?)';

    const values = [
        formData.id_usuario,
        formData.username,
        formData.paquete,
        formData.role,
    ];

    connection.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send("Error al actualizar los datos");
            throw err;
        }
        res.status(200).send("Datos actualizados correctamente");
    });
});

admin.put('/delete', async (req, res) => {
    const id_usuario = req.body.key;
    console.log(id_usuario)
    const sql = "UPDATE usuario SET estado = 'I' where id_usuario= ?";

    connection.query (sql, [id_usuario], (err, result) => {
        if(err) {
            res.status(500).send("Error al borrar el usuario");
            throw err;
        }
        res.status(200).send("Usuario eliminado exitosamente")
    })
});

admin.put('/activate', async (req, res) => {
    const id_usuario = req.body.key;
    const sql = "UPDATE usuario SET estado = 'A' where id_usuario= ?";

    connection.query (sql, [id_usuario], (err, result) => {
        if(err) {
            res.status(500).send("Error al borrar el usuario");
            throw err;
        }
        res.status(200).send("Usuario eliminado exitosamente")
    })
});

export default admin;