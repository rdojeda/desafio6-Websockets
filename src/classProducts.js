 
const fs = require("fs");

//Start class Contenedor
class Contenedor {
  constructor() {}

 saveProducto(producto, dataJson) {
    let newId = this.getNewId(dataJson);
    producto.id = newId;
    const arrayProductos = this.readFunction(dataJson);
    arrayProductos.push(producto);
    this.writeFunction(arrayProductos, dataJson);
  }

  getNewId(dataJson) {
    let lastId = 0;
    let arrayProductos = this.readFunction(dataJson);
    if (arrayProductos.length > 0) {
      lastId = arrayProductos[arrayProductos.length - 1].id;
    }
    return lastId + 1;
  }

  readFunction(dataJson) {
    
    let arrayProductos = [];
    try {
      arrayProductos = fs.readFileSync(dataJson, "utf-8");
      arrayProductos.length > 0
        ? (arrayProductos = JSON.parse(arrayProductos))
        : (arrayProductos = []);
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
    return arrayProductos;
  }

  writeFunction(arrayProductos, dataJson) {
    
    let fileJson = JSON.stringify(arrayProductos);
    try {
      fs.writeFileSync(dataJson, fileJson);
    } catch (error) {
      console.log("Error en la escritura del archivo", error);
    }
  }

  getById(id, dataJson) {
    let arrayProductos = this.readFunction(dataJson);
    let productoId = arrayProductos.find((e) => e.id === id);
    return productoId ? productoId : null;
  }

    getAll(dataJson) {
    
    let arrayProductos = this.readFunction(dataJson);
    return arrayProductos;
  }

  deleteById(id, dataJson) {
    let arrayProductos = this.readFunction(dataJson);
    let index = arrayProductos.findIndex((producto) => producto.id == id);

    if (index >= 0) {
      arrayProductos.splice(index, 1);
      let fileJson = JSON.stringify(arrayProductos);
      try {
        fs.writeFileSync(dataJson, fileJson);
        return id;
      } catch (error) {
        console.log("Error al escribir el archivo", error);
      }
    }
  }

  //End class Contenedor
}

module.exports = Contenedor;









   

    
  