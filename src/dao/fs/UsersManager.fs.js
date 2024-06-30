import fs from "fs";
import crypto from "crypto";

class UsersManager {
  constructor() {
    this.path = "./src/data/fs/files/users.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("archivo creado!");
    } else {
      console.log("archivo ya existe!");
    }
  }

  async create(data) {
    try {
      if (!data.email) {
        const error = new Error("ingrese un usuario");
        throw error;
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo:
            data.photo ||
            "https://raysensenbach.com/wp-content/uploads/2013/04/default.jpg",
          email: data.email,
          password: data.password,
          role: data.role,
        };
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
        console.log("usuario creado");
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
  async read(rol) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      users && (users = users.filter(each=>each.category===rol))
      if (users.length === 0) {
        throw new Error("No hay usuarios");
      } else {
        console.log(users);
        return users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each.id === id);
      if (!one) {
        throw new Error("no encontrado");
      } else {
        console.log(one);
        return one;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let user = all.find((each) => each.id !== id);
      if (!user) {
        throw new Error("no encontrado");
      } else {
        let filtered = all.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log({ deleted: user.id });
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
}

/*async function test() {
  try {
    const usuarios = new UsersManager();
    await usuarios.create({
      photo: "",
      email: "usuario1@gmail.com",
      password: 1234,
    });

    await usuarios.create({
      photo: "",
      email: "usuario2@gmail.com",
      password: 5678,
    });

    await usuarios.create({
      photo: "",
      email: "usuario3@gmail.com",
      password: 9874,
    });

    await usuarios.create({
      photo: "",
      email: "usuario4@gmail.com",
      password: 56123,
    });

    console.log("Usuarios Creados:", await usuarios.read());
    console.log("Usuario:", await usuarios.readOne("bedc688e7bd4460aa960cb3e"));
    console.log("Usuario Eliminado:", await usuarios.destroy("a62407390ff10ad579fa42af"));
  } catch (error) {
    console.log(error);
  }
}

test();*/


const usersManager = new UsersManager()
export default usersManager