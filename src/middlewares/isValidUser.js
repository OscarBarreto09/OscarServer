//import usersManager from "../data/mongo/UsersManager.mongo.js"

import dao from "../dao/dao.factory.js"

const { users } = dao

async function isValidUser(req, res, next) {
  try {
    const { email } = req.body;
    const one = await users.readByEmail(email);
    if (!one) {
      const error = new Error("Bad auth from login!");
      error.statusCode = 401;
      throw error;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}
export default isValidUser;