import CustomRouter from "../CustomRouter.js";
//import cartsManager from "../../data/fs/CartsManager.fs.js";
import { read, readOne, create, update, destroy, destroyAll } from "./../../controllers/carts.controller.js"

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER"], create);
    this.read("/", ["USER"], read);
    this.read("/:pid", ["USER"], readOne);
    this.update("/:pid", ["USER"], update);
    this.destroy("/all", ["USER"], destroyAll);
    this.destroy("/:pid", ["USER"], destroy);
  }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();

/*
cartsRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await cartsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

cartsRouter.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.query;
    if (user_id) {
      const all = await cartsManager.read({ user_id });
      if (all.lenght > 0) {
        return res.json({
          statusCode: 200,
          message: "READ",
          response: all,
        });
      }
    } 
      const error = new Error("NOT FOUND");
      error.statusCode = 404;
      throw error;
    
  } catch (error) {
    return next(error);
  }
});*/


