'use strict'

class Database {
  constructor(){
    this.currentUser = '';
  }
  // recuperar los usuarios - el array
  getAllUsers(){
    // recuperar el string
    const usersStr = localStorage.getItem("users");
    // convertir el string a un array
    const usersArr = JSON.parse( usersStr );

    // si todavia no hay usuarios, devuelve un array vacio
    if (usersArr === null) {
      return [];
    } else {
      return usersArr;
    }

  }

  saveNewUser(newUser){

    // recuperar el array de los usuarios del localStorage
    const usersArr = this.getAllUsers();

    // actualizar el array de usuarios
    usersArr.push(newUser);

    // convertir el array a un string
    const usersStr = JSON.stringify(usersArr);

    // almacenar lo de nuevo
    localStorage.setItem("users", usersStr);
  }

  changeUser(changedUser){
      const usersArr = this.getAllUsers();
      const userIndex = usersArr.findIndex(obj=> obj.email === changedUser.email);
      const newUsersArr = usersArr.map((obj, i)=> i === userIndex ? changedUser : obj);
      localStorage.setItem("users", JSON.stringify(newUsersArr));
  }
  addBook(list, bookId){
    console.log(list, bookId)
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser)
    const likeArrays = ['wannaread', 'readed', 'reading'];
    likeArrays.forEach(arr=>{
      this.currentUser[arr] = this.currentUser[arr].filter(book=> book !== bookId);
    })
    this.currentUser[list].push(bookId)
    localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    console.log(this.currentUser)
    this.changeUser(this.currentUser)
  }

}

const db = new Database();
