import express from "express";
import bcrypt from "bcrypt";
import connection from "../config/db.js";

const Login = express.Router();
const saltRounds = 10;

Login.post("/", (req, res) => {
    const { email, password } = req.body;
    connection.query("SELECT * FROM docentes WHERE correo_electronico = ?", [email], (err, rows) => {
        if (err) {
            res.status(200).json({ success: false, message: "Error de interno del servidor" });
            return;
        } else if (rows.length === 0) {
            res.status(200).json({ success: false, message: "Correo o contraseña incorrectos" });
            return;
        } else {
            const user = rows[0];
            bcrypt.compare(password, user.password, (bcryptErr, match) => {
                if (bcryptErr) {
                    console.log("Erro al comparar contraseñas", bcryptErr);
                    res.status(500).json({ success: false, message: "Error interno en el servidor" });
                    return;
                }
                if (!match) {
                    res.status(200).json({ success: false, message: "Usuario o contraseña incorrectos" });
                    return;
                } else {
                    res.status(200).json({ success: true });
                }
            })
        }
    });

});

export default Login; // Exporta el objeto router como módulo
