//Dependencias
import express from "express";
import cors from "cors";
import user from "./routes/user.js";
import dotenv from "dotenv";
import countries from "./routes/countries.js";
import tipo_doc from "./routes/tipo_doc.js";
import plan from "./routes/plan.js";
import morgan from "morgan";
import admin from "./routes/admin.js";
import pay from "./routes/payment.js";
import ticket from "./routes/ticket.js";
import dominio from "./routes/dominio.js";
import errorHandler from "./middlewares/errorHandler.js"

//Dotenv
dotenv.config();

//Init express
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan());

//Middlewares
app.use(errorHandler);


//Rutas
app.use("/api/users", user);
app.use("/api/countries",countries)
app.use("/api/tipo_doc",tipo_doc)
app.use("/api/plan",plan)
app.use("/api/admin",admin)
app.use("/api/pay",pay)
app.use("/api/ticket",ticket)
app.use("/api/domain",dominio)

//Servidor
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Servidor en https://localhost:${port}`);
});
