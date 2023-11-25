import express from "express";
import bcrypt from "bcrypt";
import connection from "../config/db.js";

const Register = express.Router();
const saltRounds = 10;

Register.post("/", (req, res) => {
    const institucion = "1";
    const { nombre, app, apm, correo, password } = req.body;

    // Verifica que no exista un usuario con el mismo correo electrónico si no existe inserta el usuario
    connection.query('SELECT * FROM docentes WHERE correo_electronico = ?', [correo], (err, result) => {
        if (err) {
            console.log("Error al verificar el correo electrónico", err);
            return res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
        if (result.length > 0) {
            return res.status(200).json({ success: false, message: "El correo electrónico ya está registrado" });
        }
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.log("Error al hashear la contraseña", err);
                return res.status(500).json({ success: false, message: "Error interno del servidor" });
            }
            connection.query('INSERT INTO docentes(id_institucion, nombre, app, apm, correo_electronico, password) VALUES(?,?,?,?,?,?)', [institucion, nombre, app, apm, correo, hash],
                (err, result) => {
                    if (err) {
                        res.status(500).json({ success: false, message: "Error al crear la cuenta" });
                    } else {
                        res.status(200).json({ success: true, message: "La cuenta ha sido creada con éxito" });
                    }
                }
            );
        });
    });
});

export default Register; // Exporta el objeto router como módulo
