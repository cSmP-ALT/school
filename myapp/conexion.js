import mysql from 'mysql2';

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "farmacia_salud_bienestar"
});

conexion.connect((error) => {
    if(error){
        console.log("❌ Error al conectar a la base de datos:", error);
        return;
    }
    console.log("✅ Conectado exitosamente a la base de datos: farmacia_salud_bienestar");
});

export default conexion;