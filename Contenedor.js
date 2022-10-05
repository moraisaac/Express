const fs = require("fs");

class Contenedor {
  // metodo para escribir archivo productos.txt
  async save(producto) {
    try {
      await fs.promises.writeFile(
        "./productos.txt",
        JSON.stringify(producto, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log(error);
    }
  }

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

  // crear nuevo producto
  async saveNew(productoNuevo) {
    const contenido = await this.getAll();
    if (contenido.length > 0) {
      const indice = contenido.sort((a, b) => b.id - a.id)[0].id;
      productoNuevo.id = indice + 1;
    } else {
      productoNuevo.id = 1;
    }
    contenido.push(productoNuevo);
    this.save(contenido);
  }
  // obtener producto segun el id
  async getById(id) {
    const contenido = await this.getAll();
    const productoBuscado = contenido.filter((producto) => producto.id === id);
    console.log("el producto buscado es ", productoBuscado);
  }

  // borrar producto segun el id
  async deleteById(id) {
    const contenido = await this.getAll();
    const productosRestantes = contenido.filter(
      (producto) => producto.id !== id
    );
    this.save(productosRestantes);
  }
  // borrar todos los productos
  async deleteAll() {
    this.save([]);
  }
}

module.exports = Contenedor;