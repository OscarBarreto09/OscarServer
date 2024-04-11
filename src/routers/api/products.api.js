import { Router } from "express";
import productsManager from "../../data/fs/ProductsManager.fs.js";

const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/:nid", readOne);
productsRouter.post("/", create);
productsRouter.put("/:nid", update);
productsRouter.delete("/:nid", destroy);


async function create(req, res, next) {
    try {
      const data = req.body;
      const one = await productsManager.create(data);
      return res.json({
        statusCode: 201,
        message: "CREATED ID: " + one.id,
      });
    } catch (error) {
      return next(error);
    }
  }

  async function read (req, res, next){
    try {
        const { category } = req.query
        const products = await productsManager.read(category)
        if (products) {
            return res.status(200).json({
                response: products,
                category,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);

    }
}

async function readOne (req, res){
    try {
        const { pid } = req.params
        const one = await productsManager.readOne(pid)
        if (one) {
            return res.status(200).json({
                response: one,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error);
    }
}

async function update(req, res, next) {
    try {
      const { pid } = req.params;
      const data = req.body;
      const one = await productsManager.update(pid, data);
      return res.json({
        statusCode: 200,
        response: one,
      });
    } catch (error) {
      return next(error);
    }
  }

async function destroy(req, res, next) {
    try {
      const { pid } = req.params;
      const one = await productsManager.destroy(pid);
      return res.json({
        statusCode: 200,
        response: one,
      });
    } catch (error) {
      return next(error);
    }
  }


  export default productsRouter;