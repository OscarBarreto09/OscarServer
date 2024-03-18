const crypto = requiere ("crypto")


class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      photo: data.photo || "https://raysensenbach.com/wp-content/uploads/2013/04/default.jpg",
      email: data.email,
      password: data.password,
      role: 0,
    };
    UserManager.#users.push(user);
    console.log("nuevousuario");
  }
  read(){
    return UserManager.#users
  }
}

const usuarios = new UserManager()
usuarios.create({
    photo: "",
    email: "usuario1@gmail.com",
    password: 1234
})

usuarios.create({
    photo: "",
    email: "usuario2@gmail.com",
    password: 5678
})

usuarios.create({
    photo: "",
    email: "usuario3@gmail.com",
    password: 9874
})

usuarios.create({
  photo: "",
  email: "usuario4@gmail.com",
  password: 56123
})

console.log(usuarios.read())

