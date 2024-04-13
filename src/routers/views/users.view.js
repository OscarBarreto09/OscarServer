import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.fs.js"

const usersRouter = Router()

usersRouter.get("/register", async (req, res, next) => {
    try {
      return res.render("register", { title: "REGISTER" });
    } catch (error) {
      return next(error);
    }
  });

usersRouter.get("/:uid", async (req, res, next) => {
    try {
      const { uid } = req.params;
      const profile = await usersManager.readOne(uid);
      return res.render("profile", { title: "REAL", profile });
    } catch (error) {
      return next(error);
    }
  });

export default usersRouter