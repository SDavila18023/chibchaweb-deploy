import express from "express";
import axios from "axios";
import  DatabaseConnection  from "../config/db.js";
import xml2js from "xml2js";

const dominio = express.Router();
//Instanciación Conexión base de datos
const connection = DatabaseConnection.getConnection();

dominio.get("/:id",async (req,res)=>{
  try{
    const id = req.params.id;
    const SQL = "select id_dominio, nombre_dominio, DATE_FORMAT(fecha_registro, '%d-%m-%y') as fecha_registro, DATE_FORMAT(fecha_caducidad, '%d-%m-%y') as fecha_caducidad from dominio where id_user = ?;";
    connection.query(SQL, id, (err,results)=>{
      if(err){
        console.error("Error al obtener los datos");
        res.status(500).json({ error: "Error" });
      }else{
        res.json({ data: results });
      }
    })
  }catch (err){

  }
})

dominio.get("/countDomains/:id",async (req,res)=>{
  try{
    const id = req.params.id;
    const SQL = "select count(*) as dominios from dominio where id_user = ?;";
    connection.query(SQL, id, (err,results)=>{
      if(err){
        console.error("Error al obtener los datos");
        res.status(500).json({ error: "Error" });
      }else{
        res.json({ data: results });
      }
    })
  }catch (err){

  }
})



dominio.post("/checkDomain", async (req, res) => {
  try {
    const { domain } = req.body;
    if (!domain) {
      return res
          .status(400)
          .json({ error: "Se requiere un dominio para verificar." });
    }

    const apiKey = "5BGMcb7rb6EpmbCvFrqnaQ==LChclnR8gTyEdB6z";
    const apiUrl = `https://api.api-ninjas.com/v1/whois?domain=${domain}`;

    const response = await axios.get(apiUrl, {
      headers: {
        "X-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.data || Object.keys(response.data).length === 0) {
      return res.json({
        message: `El dominio ${domain} está disponible para registrar.`,
      });
    } else {
      return res.json({
        message: `El dominio ${domain} no está disponible para registrar.`,
      });
    }
  } catch (error) {
    return res
        .status(500)
        .json({ error: "Ocurrió un error al consultar la API." });
  }
});

dominio.post(
    "/registerDomain",
    express.text({ type: "application/xml" }),
    async (req, res) => {
      const xmlData = req.body;
      let domain;
      let userId;

      try {
        const parsedXml = await new Promise((resolve, reject) => {
          xml2js.parseString(xmlData, (err, result) => {
            if (err) {
              reject("Error al convertir XML a JSON");
            } else {
              resolve(result);
            }
          });
        });

        const userData = parsedXml.user;
        if (!userData || !userData.id || !userData.domain) {
          return res.status(400).send('Formato XML incorrecto. Asegúrate de incluir el ID del usuario y el dominio.');
        }

        userId = userData.id[0];
        domain = userData.domain[0];

        const checkSQL = 'SELECT * FROM dominio WHERE nombre_dominio = ?';
        connection.query(checkSQL, domain, async (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).send("Error al consultar la base de datos");
          }

          const apiKey = "5BGMcb7rb6EpmbCvFrqnaQ==LChclnR8gTyEdB6z";
          const apiUrl = `https://api.api-ninjas.com/v1/whois?domain=${domain}`;

          try {
            const response = await axios.get(apiUrl, {
              headers: {
                "X-Api-Key": apiKey,
                "Content-Type": "application/json",
              },
            });

            if (!response.data || Object.keys(response.data).length === 0) {
              const SQL = "CALL registerDomain(?,?)";
              connection.query(SQL, [userId, domain], (err, results) => {
                if (err) {
                  console.error(err);
                  return res.status(500).send("Error al registrar el dominio en la base de datos");
                }

                const xmlResponse = `
                  <response>
                    <status>success</status>
                    <message>Dominio registrado exitosamente</message>
                    <userId>${userId}</userId>
                    <domain>${domain}</domain>
                  </response>
                `;

                res.setHeader("Content-Type", "application/xml");
                res.setHeader(
                    "Content-Disposition",
                    `attachment; filename="response.xml"`
                );
                res.status(200).send(xmlResponse);
              });
            } else {
              return res.status(500).send("Lo sentimos, el dominio ya está en uso");
            }
          } catch (error) {
            return res.status(500).send("Error al verificar la disponibilidad del dominio");
          }
        });
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Error en el servidor");
      }
    }
);

export default dominio;
