import  DatabaseConnection  from "../config/db.js";
import express from "express";

const app = express();
//Instanciación Conexión base de datos
const connection = DatabaseConnection.getConnection();

app.get('/', async (req, res) => {
    connection.query("SELECT id_documento, descripcion FROM tipo_documento",(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })


});

export default app;