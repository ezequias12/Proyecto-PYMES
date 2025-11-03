const express = require("express");
const router = express.Router();

const articulos = require('../models/articulosModel');
const { Op, ValidationError } = require("sequelize");

// GET: Obtener todos los artículos con filtros y paginación
router.get("/api/articulos", async function (req, res) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene todos los Articulos'

  let where = {};

  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }

  if (req.query.Activo != undefined && req.query.Activo !== "") {
    where.Activo = req.query.Activo === "true";
  }

  const Pagina = req.query.Pagina ?? 1;
  const TamañoPagina = 10;

  const { count, rows } = await articulos.findAndCountAll({
    attributes: ["IdArticulo", "Nombre", "Precio", "Stock", "FechaAlta", "Activo"],
    order: [["Nombre", "ASC"]],
    where,
    offset: (Pagina - 1) * TamañoPagina,
    limit: TamañoPagina,
  });

  return res.json({ Items: rows, RegistrosTotal: count });
});

// GET: Obtener un artículo por ID
router.get("/api/articulos/:id", async function (req, res) {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'obtiene un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo...' }

  let items = await articulos.findOne({
    attributes: [
      "IdArticulo", "Nombre", "Precio", "CodigoDeBarra",
      "IdCategoria", "Stock", "FechaAlta", "Activo"
    ],
    where: { IdArticulo: req.params.id },
  });

  res.json(items);
});

// POST: Crear un nuevo artículo
router.post("/api/articulos/", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'agrega un Articulo'
  /* #swagger.parameters['item'] = {
        in: 'body',
        description: 'nuevo Artículo',
        schema: { $ref: '#/definitions/Articulos' }
  } */

  try {
    let item = await articulos.create({
      Nombre: req.body.Nombre,
      Precio: req.body.Precio,
      CodigoDeBarra: req.body.CodigoDeBarra,
      IdCategoria: req.body.IdCategoria,
      Stock: req.body.Stock,
      FechaAlta: req.body.FechaAlta,
      Activo: req.body.Activo,
    });
    res.status(201).json(item.dataValues);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      throw err;
    }
  }
});

// PUT: Actualizar un artículo
router.put("/api/articulos/:id", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'actualiza un Artículo'
  // #swagger.parameters['id'] = { description: 'identificador del Artículo...' }
  /* #swagger.parameters['Articulo'] = {
        in: 'body',
        description: 'Articulo a actualizar',
        schema: { $ref: '#/definitions/Articulos' }
  } */

  try {
    let item = await articulos.findOne({
      attributes: [
        "IdArticulo", "Nombre", "Precio", "CodigoDeBarra",
        "IdCategoria", "Stock", "FechaAlta", "Activo"
      ],
      where: { IdArticulo: req.params.id },
    });

    if (!item) {
      res.status(404).json({ message: "Artículo no encontrado" });
      return;
    }

    item.Nombre = req.body.Nombre;
    item.Precio = req.body.Precio;
    item.CodigoDeBarra = req.body.CodigoDeBarra;
    item.IdCategoria = req.body.IdCategoria;
    item.Stock = req.body.Stock;
    item.FechaAlta = req.body.FechaAlta;
    item.Activo = req.body.Activo;

    await item.save();
    res.sendStatus(200);
  } catch (err) {
    if (err instanceof ValidationError) {
      let messages = '';
      err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
      res.status(400).json({ message: messages });
    } else {
      throw err;
    }
  }
});

// DELETE: Eliminar (física o lógicamente) un artículo
router.delete("/api/articulos/:id", async (req, res) => {
  // #swagger.tags = ['Articulos']
  // #swagger.summary = 'elimina un Articulo'
  // #swagger.parameters['id'] = { description: 'identificador del Articulo..' }

  let bajaFisica = false;

  if (bajaFisica) {
    let filasBorradas = await articulos.destroy({
      where: { IdArticulo: req.params.id },
    });
    if (filasBorradas == 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    try {
      await articulos.sequelize.query(
        "UPDATE articulos SET Activo = CASE WHEN Activo = 1 THEN 0 ELSE 1 END WHERE IdArticulo = :IdArticulo",
        {
          replacements: { IdArticulo: +req.params.id },
        }
      );
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        const messages = err.errors.map((x) => x.message);
        res.status(400).json(messages);
      } else {
        throw err;
      }
    }
  }
});

module.exports = router;
