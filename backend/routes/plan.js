import  DatabaseConnection  from "../config/db.js";
import express from "express";

const app = express.Router();
//Instanciación Conexión base de datos
const connection = DatabaseConnection.getConnection();


app.get("/currentPlan/:id",async (req,res)=>{
    const id = req.params.id;
    connection.query("select p.nombre_paquete from paquete p\n" +
        "join chibchaweb.paquete_usuario pu on p.id_paquete = pu.id_paquete\n" +
        "where id_usuario = ?;",id,(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })
})


app.get('/', async (req, res) => {
    connection.query("SELECT id_paquete, nombre_paquete, precio_mes,precio_trimestral,precio_semestral,precio_anual from paquete",(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })
});

app.get('/prices', async (req, res) => {
    const plan = req.query.id
    connection.query("SELECT precio_mes,precio_trimestral,precio_semestral,precio_anual from paquete where id_paquete=?",[plan],(err,results)=>{
        if(err){
            console.error("Error al obtener los datos")
            res.status(500).json({error:"Error"})
            return;
        }
        res.json({ data: results });
    })
});


export default app;