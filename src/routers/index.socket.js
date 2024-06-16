import productsManager from "../data/mongo/ProductsManager.mongo.js";
import usersManager from "../data/mongo/UsersManager.mongo.js";
import cartsManager from "../data/mongo/CartsManager.mongo.js";

export default async (socket) => {
  console.log("client socket " + socket.id);
  socket.emit("users", await usersManager.read());
  socket.emit("products", await productsManager.paginate({filter:{}, opts:{page: 1, limit: 10}}));
  // socket.emit("carts", await cartsManager.read());
  socket.on("newProduct", async data=>{
    await productsManager.create(data)
    socket.emit("products", await productsManager.paginate({filter:{}, opts:{page: 1, limit: 10}}));
  })
  socket.on("newUser", async data=>{
    await usersManager.create(data)
    socket.emit("users", await usersManager.read());
  })
};