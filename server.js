import express from "express"
import usersManager from "./data/fs/UsersManager.fs.js";
import productsManager from "./data/fs/ProductsManager.fs.js";

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

server.get("/api/usuarios", async (req, res) => {
    try {
        const { rol } = req.query
        const users = await users.read(rol)
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

server.get("/api/products/:uid", async (req, res) => {
    try {
        const { uid } = req.params
        const one = await productsManager.readOne(uid)
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