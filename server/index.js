import express from "express";
import corse from "cors";
import Register from "./routes/RegisterRoute.js";
import Login from "./routes/LoginRoute.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(corse());
app.use(express.json());
app.use("/register", Register);
app.use("/login", Login);

// Ruta para cerrar sesión
app.post("/logout", (req, res) => {
    // Aquí deberías realizar acciones para cerrar la sesión del usuario
    // por ejemplo, eliminar cualquier token o información de sesión en el servidor.

    // Devuelve una respuesta indicando éxito o error
    res.status(200).json({ success: true, message: "Sesión cerrada exitosamente" });
});


app.listen(PORT, () => {
    console.log('Connnected to the server in', PORT);
});