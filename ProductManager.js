class ProductManager {
  static #products = [];
  create(data) {
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
      title: data.title,
      photo: data.photo,
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
  stock: 500
})

productos.create({
  title: "balon",
  photo: "balon.jpg",
  category: "balones",
  price: 280,
  stock: 120
})

productos.create({
  title: "abrigo",
  photo: "abrigo.jpg",
  category: "ropa",
  price: 500,
  stock: 80
})

productos.create({
  title: "botas",
  photo: "botas.jpg",
  category: "calzado",
  price: 250,
  stock: 100
})

productos.create({
  title: "gorra",
  photo: "gorra.jpg",
  category: "accesorios",
  price: 50,
  stock: 50
})



console.log(productos.read())

