const crypto = requiere("crypto")

class ProductManager {
    static #products = [];
    create(data) {
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };
      ProductManager.#products.push(product);
      console.log("nuevoproducto");
    }
    read(){
      return ProductManager.#products
    }
  }
  
  const productos = new ProductManager()
  productos.create({
    title: "camiseta",
    photo: "camiseta.jpg",
    category: "ropa",
    price: 120,
    stock: 500,
  });

  productos.create({
    title: "balon",
    photo: "balon.jpg",
    category: "balones",
    price: 280,
    stock: 120,
  });

  productos.create({
    title: "abrigo",
    photo: "abrigo.jpg",
    category: "ropa",
    price: 500,
    stock: 80,
  });

  productos.create({
    title: "botas",
    photo: "botas.jpg",
    category: "calzado",
    price: 250,
    stock: 100,
  });

  productos.create({
    title: "gorra",
    photo: "gorra.jpg",
    category: "accesorios",
    price: 50,
    stock: 50,
  });

  productos.create({
    title: "guantes",
    photo: "guantes.jpg",
    category: "accesorios",
    price: 50,
    stock: 100,
  });

  productos.create({
    title: "abrigoCafe",
    photo: "abrigoCafe.jpg",
    category: "abrigos",
    price: 350,
    stock: 50,
  });

  productos.create({
    title: "saco",
    photo: "saco.jpg",
    category: "ropa",
    price: 150,
    stock: 60,
  });

  productos.create({
    title: "tennisnike",
    photo: "tennisnike.jpg",
    category: "calzado",
    price: 480,
    stock: 20,
  });

  productos.create({
    title: "tennisadidas",
    photo: "tennisadidas.jpg",
    category: "calzado",
    price: 50,
    stock: 50,
  });
  
  
  
  console.log(productos.read())