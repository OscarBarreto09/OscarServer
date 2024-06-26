import express  from "express";
import indexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import pathHandler from "./src/middlewares/pathHandler.js"
import morgan from "morgan";



const server = express();
const port = 8080;
const ready = () => console.log("server ready on port " + port);
server.listen(port, ready);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"))


server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);




/*
//FORMA SIN ROUTER


import express from "express"
import usersManager from "./src/data/fs/UsersManager.fs.js";
import productsManager from "./src/data/fs/ProductsManager.fs.js";

//SERVER

const server = express()
const port = 8080 
const ready = ()=> console.log("server ready on port" + port);
server.listen(port,ready)


//MIDDLEWARES

server.use(express.urlencoded({extended: true}))


//ROUTER
server.get("/",async(requierements,response)=> {
    try {
        return response.status(200).json({
            response: "API",
            success: true
        })
    } catch (error) {
        console.log(error);
        return response.status(404).json({
            response: "API ERROR",
            success: false
        })
    }
})

// PRODUCTOS 


server.get("/api/products", async (req, res) => {
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
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})

server.get("/api/products/:pid", async (req, res) => {
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
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})

// USUARIOS 

server.get("/api/users", async (req, res) => {
    try {
        const { rol } = req.query
        const users = await usersManager.read(rol)
        if (users) {
            return res.status(200).json({
                response: users,
                rol,
                success: true
            })
        } else {
            const error = new Error("NOT FOUND")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})

server.get("/api/users/:pid", async (req, res) => {
    try {
        const { uid } = req.params
        const one = await usersManager.readOne(uid)
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
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            success: false
        })
    }
})*/