import { Router } from "express";
import productsManager from "../../data/fs/ProductsManager.fs.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const productos = await productsManager.read();
    return res.render("products", { productos });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/real", async (req, res, next) => {
  try {
    //const products = await productsManager.read();
    return res.render("real");
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
