const express = require("express");
// crear servidor
const app = express();
const inicializarBase = require("./models/inicializarBase"); // inicializar base de datos

app.use(express.json()); // para poder leer json en el body

// controlar ruta principal
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// ruta requerida por el test
app.get("/_isalive", (req, res) => {
  res.send(`Ejecutandose desde: ${app.locals.fechaInicio}`);
});

// routers
const categoriasmockRouter = require("./routes/categoriasmock");
app.use(categoriasmockRouter);

const categoriasRouter = require("./routes/categorias");
app.use(categoriasRouter);

const articulosRouter = require("./routes/articulos");
app.use(articulosRouter);

const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);

const usuariosRouter = require("./routes/usuarios");
app.use(usuariosRouter);

// middleware 404 al final
app.use((req, res) => {
  res.status(404).send("No encontrada!");
});

// levantar servidor si es archivo principal
const port = 3000;
app.locals.fechaInicio = new Date();

if (require.main === module) {
  inicializarBase().then(() => {
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  });
}

module.exports = app; // para testing
