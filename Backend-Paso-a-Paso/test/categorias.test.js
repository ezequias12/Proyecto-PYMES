const request = require("supertest");
const app = require("../index");

describe("GET /api/categorias", function () {
  it("Devolveria todos los categorias", async function () {
    const res = await request(app)
      .get("/api/categorias")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdCategoria: expect.any(Number),
          Nombre: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /api/categorias/:id", function () {
  it("respond with json containing a single categorias", async function () {
    const res = await request(app).get("/api/categorias/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCategoria: 1,
        Nombre: expect.any(String),
      })
    );
  });
});

let categoriaCreadaId = 0;

describe("POST /api/categorias", () => {
  it("Debería crear una nueva categoría", async () => {
    const res = await request(app)
      .post("/api/categorias")
      .send({ Nombre: "Nueva categoría test" });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdCategoria: expect.any(Number),
        Nombre: "Nueva categoría test",
      })
    );

    categoriaCreadaId = res.body.IdCategoria;
  });
});

describe("PUT /api/categorias/:id", () => {
  it("Debería actualizar la categoría creada", async () => {
    const res = await request(app)
      .put(`/api/categorias/${categoriaCreadaId}`)
      .send({ Nombre: "Categoría modificada test" });

    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    expect(res.statusCode).toBeLessThan(300);
  });
});

describe("DELETE /api/categorias/:id", () => {
  it("Debería eliminar la categoría creada", async () => {
    const res = await request(app).delete(`/api/categorias/${categoriaCreadaId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("categoria eliminado");
  });
});
