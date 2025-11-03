const express = require("express");
const router = express.Router();
const categorias = require("../models/categoriasModel");

// Obtener todas las categorías
router.get("/api/categorias", async (req, res) => {
  try {
    const categoriass = await categorias.findAll();
    res.json(categoriass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

// Obtener una categoría por su ID 
router.get("/api/categorias/:id", async (req, res) => {
  try {
    const categoria = await categorias.findByPk(req.params.id);

    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ message: "categoría no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener categoría:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

//POST CREADO PARA EL TEST
// Crear una nueva categoría
router.post("/api/categorias", async (req, res) => {
  try {
    const nuevaCategoria = await categorias.create({
      Nombre: req.body.Nombre,
    });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ message: "Error al crear la categoría" });
  }
});

//PUT CREADO PARA EL TEST
// Modificar una categoría existente
router.put("/api/categorias/:id", async (req, res) => {
  try {
    const categoria = await categorias.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ message: "categoría no encontrada" });
    }

    categoria.Nombre = req.body.Nombre;
    await categoria.save();

    res.status(200).json(categoria);
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ message: "Error al actualizar la categoría" });
  }
});

//DELETE CREADO PARA EL TEST
// Eliminar una categoría existente
router.delete("/api/categorias/:id", async (req, res) => {
  try {
    const categoria = await categorias.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ message: "categoria no encontrado" });
    }

    await categoria.destroy();
    res.status(200).json({ message: "categoria eliminado" });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({ message: "Error al eliminar la categoría" });
  }
});


module.exports = router;
