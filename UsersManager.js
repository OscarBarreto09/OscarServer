class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      photo: data.photo,
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
    photo: "photo1.png",
    email: "usuario1@gmail.com",
    password: 1234
})

usuarios.create({
    photo: "photo2.png",
    email: "usuario2@gmail.com",
    password: 5678
})

usuarios.create({
    photo: "photo3.png",
    email: "usuario3@gmail.com",
    password: 9874
})

console.log(usuarios.read())

