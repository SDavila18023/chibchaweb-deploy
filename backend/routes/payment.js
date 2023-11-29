import express from "express";
import DatabaseConnection  from "../config/db.js";

//Instanciación router de express
const pay = express.Router();
//Instanciación Conexión base de datos
const connection = DatabaseConnection.getConnection();

pay.post("/",(req,res)=>{
    const formData = req.body;
    console.log(formData)
    const verifyNumber = formData.newData.number

    const firstDigit = verifyNumber.substring(0, 1);

    let dbType;

    if (firstDigit === '4') {
        dbType = 1;
    } else if (firstDigit === '5') {
        dbType =  2;
    } else if (verifyNumber.startsWith('36') || verifyNumber.startsWith('38') ||
        (parseInt(verifyNumber.substring(0, 6)) >= 300000 && parseInt(verifyNumber.substring(0, 6)) <= 305999) ||
        (parseInt(verifyNumber.substring(0, 6)) >= 309500 && parseInt(verifyNumber.substring(0, 6)) <= 309599)) {
        dbType = 3;
    } else {
        dbType = 4
    }


    const values = [
        formData.newData.id_usuario,
        formData.newData.id_paquete,
        formData.newData.price,
        formData.newData.name,
        formData.newData.number,
        formData.newData.expiry,
        formData.newData.cvc,
        dbType
    ]
    console.log(values)

    const SQL="CALL registrarPago(?,?,?,?,?,?,?,?)";
    //Query
    connection.query(SQL, values, (err, results) => {
        if (err) {
            res.send(err);
        } else {
            console.log("Compra registrada correctamente");
            res.send({ message: "Compra realizada" });
        }
    });
})

export default pay;