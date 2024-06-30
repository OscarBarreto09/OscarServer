//import { Router } from "express";
// import productsManager from "../../data/fs/ProductsManager.fs.js";
//import cartsManager from "../../dao/mongo/CartsManager.mongo.js";

import dao from "../../dao/dao.factory.js"
import passportCb from "../../middlewares/passportCB.js";
import CustomRouter from "../CustomRouter.js";
import cartsRepository from "../../repositories/carts.rep.js";
import { read, readOne, create, update, destroy, destroyAll } from "./../../controllers/carts.controller.js"


////const { carts } = dao

class CartsRouter extends CustomRouter{
  init(){
    this.read("/", ["USER"], cart_read)
    this.create("/", ["USER"], cart_create);
    this.destroy("/all", ["USER"], destroyAll);
    this.destroy("/:pid", ["PUBLIC"], destroy);
  }
}
const cartsRouter = new CartsRouter
export default cartsRouter.getRouter();

async function cart_read(req, res, next) {
  try {

    const _id = req.user._id;
    const all = await cartsRepository.readRepository({user_id: _id});
    const products = all
    let productsFinal = []
    const productMap = products.reduce((acc, product) => {
      const productId = product.product_id._id;
      if (acc[productId]) {
        acc[productId].quantity += product.quantity;
      } else {
        acc[productId] = { ...product };
      }
      return acc;
    }, {});

    productsFinal = Object.values(productMap);

    //if (req.cookies.token) {
      return res.render("cart", { cart: productsFinal, user_id: _id });
    //} else {
     // return res.render("cart", { cart: productsFinal, user_id: _id });
    //}
  } catch (error) {
    return next(error);
  }
};

async function cart_create(req, res, next){
  try {
    
      const user_id = req.user._id
      const userEmail = req.user.email
      const { product } = req.body;

      const result = await fetch("http:/localhost:8080/api/carts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product_id: product, user_id: user_id, token: req.cookies.token }),
      });
    
    const carrito = await cartsRepository.readRepository({user_id: user_id});
    const products = carrito
    let productsFinal = []
    const productMap = products.reduce((acc, product) => {
      const productId = product.product_id._id;
      if (acc[productId]) {
        acc[productId].quantity += product.quantity;
      } else {
        acc[productId] = { ...product };
      }
      return acc;
    }, {});
    
    productsFinal = Object.values(productMap);
    if (req.cookies.token) {
      return res.render("cart", { cart: productsFinal, user_id: user_id});
    } else {
      return res.render("login", { cart: productsFinal, user_id: user_id});
    }
  } catch (error) {
    return next(error);
  }
}