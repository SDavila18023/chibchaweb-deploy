import express from "express";
import  DatabaseConnection  from "../config/db.js";

//Instanciación router de express
const user = express.Router();
//Instanciación Conexión base de datos
const connection = DatabaseConnection.getConnection();

user.get("/", async (req, res) => {
  // Consulta SQL
  const SQL = "SELECT * FROM usuario";
  // Declaración de la variable connection


  connection.query(SQL, (err, results) => {
    if (err) {
      console.error("Error al obtener los datos",err);

      res.status(500).json({ error: "Error" });
      return;
    }

    res.json({ data: results });
  });
});

//Ruta de registro
user.post("/register", (req, res) => {

  //Recibir datos del front
  const Email = req.body.Email;
  const Username = req.body.Username;
  const Password = req.body.Password;
  const t_doc= req.body.Tipodoc;
  const doc= req.body.Document;
  const Country = req.body.Country;
  const Nombre_Completo = req.body.Name;

//Consulta SQL
  const verificarEmail = "SELECT * FROM usuario WHERE correo = ?";

  //Query con la primera consulta
  connection.query(verificarEmail, Email, (err, results) => {
    //Validación de error
    if (err) {
      console.error("Error al verificar el correo", err);
      return;
    }
    //Validación del correo
    if (results.length > 0) {
      res.status(200).json({ message: "Correo ya registrado!" });
      return;
    } else {
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
          console.log("Usuario registrado correctamente");
          res.send({ message: "Usuario agregado" });
        }
      });
    }
  });
});

//Ruta de login
user.post("/login", (req, res) => {
  //Recibir datos del front
  const email = req.body.email;
  const password = req.body.password;
  //Consulta SQL
  const SQL = "select role.id_role,role.cargo, usuario.* from usuario join user_role on usuario.id_usuario = user_role.id_user join role on user_role.id_role = role.id_role WHERE correo = ? && password = ?";

  //Query
  connection.query(SQL, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ message: "Error al iniciar sesión" });
    }
    if (results.length > 0) {
      console.log(results)
      res.json({ data: results });
    } else {
      res.status(401).json({ message: "Las credenciales no coinciden" })
    }
  });
});

user.put("/update", (req, res) => {
  const formData = req.body;

  // Actualizar la tabla correspondiente en la base de datos basado en el correo electrónico
  const sql = `UPDATE usuario SET descripcion = ?, nombre_completo = ?, t_doc = ?, documento = ?, username = ?, telefono = ?, direccion = ? WHERE correo = ?`;

  const values = [
    formData.descripcion,
    formData.nombre_completo,
    formData.t_doc,
    formData.documento,
    formData.username,
    formData.fecha_nacimiento,
    formData.telefono,
    formData.direccion,
    formData.pais,
    formData.correo // Usando el correo electrónico para identificar el registro
  ];

  connection.query(sql, values, (err, result) => {
    if (err) {
      res.status(500).send("Error al actualizar los datos");
      throw err;
    }
    res.status(200).send("Datos actualizados correctamente");
  });
});

user.put("/delete", (req, res) => {

  const email = req.body.correo;
  const estado = req.body.estado;
  const sql = 'UPDATE usuario SET estado = ? where correo = ?';

  connection.query (sql, [estado,email], (err, result) => {
    if(err) {
      res.status(500).send("Error al borrar el usuario");
      throw err;
    }
    res.status(200).send("Usuario eliminado exitosamente")
  })
});


export default user;
