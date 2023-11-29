// Archivo: db.js

import mysql from "mysql";

class DatabaseConnection {
  // Variable de instancia estática
  static instance;

  // Constructor privado
  constructor() {
    // Inicializamos la conexión
    this.connection = mysql.createConnection({
      host: "35.237.132.98",
      user: "chibchaweb",
      password: "proyectofinalen5.0",
      database: "chibchaweb",
    });

    // Conectamos a la base de datos
    this.connection.connect((err) => {
      if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
      }
      console.log("Conexión a la base de datos MySQL exitosa");
    });
  }

  // Método de fábrica estático
  static getConnection() {
    // Si no existe una instancia de la clase, creamos una nueva
    if (!this.instance) {
      this.instance = new DatabaseConnection();
    }

    // Devolvemos la instancia
    return this.instance.connection;
  }
}

// Exportamos la clase
export default DatabaseConnection;
