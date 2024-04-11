import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.fs.js";

const usersRouter = Router()


usersRouter.get("/", read);
usersRouter.get("/:nid", readOne);
usersRouter.post("/", create);
usersRouter.put("/:nid", update);
usersRouter.delete("/:nid", destroy);


async function create(req, res, next) {
    try {
      const data = req.body;
      const one = await usersManager.create(data);
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
       return next (error)
    }
}

async function readOne (req, res,next){
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
        return next (error)
    }
}

async function update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await usersManager.update(uid, data);
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
      const { uid } = req.params;
      const one = await usersManager.destroy(uid);
      return res.json({
        statusCode: 200,
        response: one,
      });
    } catch (error) {
      return next(error);
    }
  }

export default usersRouter