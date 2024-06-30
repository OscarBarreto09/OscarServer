//import usersManager from "../data/mongo/UsersManager.mongo.js";
import { verifyHash } from "../utils/hash.util.js";

import { verifyHash } from "../utils/hash.util.js";
import dao from "../dao/dao.factory.js"

const { users } = dao

async function isValidPass(req, res, next) {
  try {
    const { email, password } = req.body;
    const one = await users.readByEmail(email);
    const verify = verifyHash(password, one.password);
    if (verify) {
      return next();
    }
    const error = new Error("Invalid Credentials");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
}
export default isValidPass;