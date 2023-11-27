import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Importa el módulo jsonwebtoken
import connection from "../config/db.js";

const Login = express.Router();
const saltRounds = 10;

// Secret key para firmar el token JWT (cámbialo en un entorno de producción)
const secretKey = "tuSecretKeySuperSegura";

Login.post("/", (req, res) => {
    const { email, password } = req.body;
    connection.query("SELECT * FROM docentes WHERE correo_electronico = ?", [email], (err, rows) => {
        if (err) {
            res.status(500).json({ success: false, message: "Error interno del servidor" });
            return;
        } else if (rows.length === 0) {
            res.status(401).json({ success: false, message: "Correo o contraseña incorrectos" });
            return;
        } else {
            const user = rows[0];
            bcrypt.compare(password, user.password, (bcryptErr, match) => {
                if (bcryptErr) {
                    console.error("Error al comparar contraseñas", bcryptErr);
                    res.status(500).json({ success: false, message: "Error interno en el servidor" });
                    return;
                }
                if (!match) {
                    res.status(401).json({ success: false, message: "Usuario o contraseña incorrectos" });
                    return;
                } else {
                    // Crea y firma el token JWT
                    const token = jwt.sign({ userId: user.id, email: user.correo_electronico }, secretKey, { expiresIn: "1h" });

                    res.status(200).json({ success: true, message: "Inicio de sesión exitoso" });
                }
            });
        }
    });
});

export default Login;
