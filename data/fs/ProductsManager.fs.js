const fs = require("fs");
const crypto = require("crypto");

class ProductsManager {
  constructor() {
    this.path = "./data/fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("archivo creado!");
    } else {
      console.log("archivo ya existe!");
    }
  }

  async create(data) {
    try {
      if (!data.title) {
        const error = new Error("ingrese un producto");
        throw error;
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
          category: data.category,
          price: data.price,
          stock: data.stock,
        };
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        console.log("producto creado");
        return product;
      }
    } catch (error) {
      throw error;
    }
  }
  async read() {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);

      if (products.length === 0) {
        throw new Error("No hay productos");
      } else {
        console.log(products);
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      if (!one) {
        throw new Error("no encontrado");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let product = all.find((each) => each.id !== id);
      if (!product) {
        throw new Error("no encontrado");
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log({ deleted: product.id });
        return product;
      }
    } catch (error) {
      throw error;
    }
  }
}

async function test() {
  try {
    const productos = new ProductsManager();
    await productos.create({
      title: "camiseta",
      photo: "camiseta.jpg",
      category: "ropa",
      price: 120,
      stock: 500,
    });

    await productos.create({
      title: "balon",
      photo: "balon.jpg",
      category: "balones",
      price: 280,
      stock: 120,
    });

    await productos.create({
      title: "abrigo",
      photo: "abrigo.jpg",
      category: "ropa",
      price: 500,
      stock: 80,
    });

    await productos.create({
      title: "botas",
      photo: "botas.jpg",
      category: "calzado",
      price: 250,
      stock: 100,
    });

    await productos.create({
      title: "gorra",
      photo: "gorra.jpg",
      category: "accesorios",
      price: 50,
      stock: 50,
    });

    await productos.create({
      title: "guantes",
      photo: "guantes.jpg",
      category: "accesorios",
      price: 50,
      stock: 100,
    });

    await productos.create({
      title: "abrigoCafe",
      photo: "abrigoCafe.jpg",
      category: "abrigos",
      price: 350,
      stock: 50,
    });

    await productos.create({
      title: "saco",
      photo: "saco.jpg",
      category: "ropa",
      price: 150,
      stock: 60,
    });

    await productos.create({
      title: "tennisnike",
      photo: "tennisnike.jpg",
      category: "calzado",
      price: 480,
      stock: 20,
    });

    await productos.create({
      title: "tennisadidas",
      photo: "tennisadidas.jpg",
      category: "calzado",
      price: 50,
      stock: 50,
    });

    console.log(await productos.read());
    console.log(await productos.readOne("dee5210aa42dfe9db195c606"));
    console.log(await productos.destroy("dee5210aa42dfe9db195c606"));
  } catch (error) {
    console.log(error);
  }
}

test();
