const fs = require("fs");

// modulo de express
const express = require("express");
const app = express();
// definicion de puerto
const PORT = 8080;

//definicion de clase y metodos
class Contenedor {
  // obtener todos los productos del archivo
  async getAll() {
    try {
      const contenido = await fs.promises.readFile("./productos.txt", "utf-8");
      console.log(contenido);
      return JSON.parse(contenido);
    } catch (error) {
      console.log(error);
    }
  }

  // obtener producto segun el id
  async getById(id) {
    const contenido = await this.getAll();
    const productoBuscado = contenido.filter((producto) => producto.id === id);
    console.log(productoBuscado)
    return productoBuscado;
  }
}

const contenedor = new Contenedor();

// montaje de servidores
const server = app.listen(PORT, () => {
  console.log("servidor iniciado");
});

// ruta para obtener todos los productos
app.get("/productos", (req, resp) => {
  contenedor.getAll().then(respuesta => resp.send(respuesta));
});

// ruta para obtener producto con ID random
app.get("/productoRandom", async (req, resp) => {
  const allProducts = await contenedor.getAll()
  const listaID = allProducts.map(({id})=>id)
  const randomId = Math.floor(Math.random()*listaID.length)
  const randomProd = await contenedor.getById(listaID[randomId])
  resp.send(randomProd)
});