'use strict';

class Login {
  constructor() {
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");

    this.loginButton = document.querySelector("#login-button");
    this.messageContainer = document.querySelector(".message-container");
  }

  // gestionar el envio de los datos (evento "submit")
  submit = (event) => {
    event.preventDefault();

    const usersDB = db.getAllUsers();

    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    // Intentar encontrar el usuario
    const user = usersDB.find( (userObj) => {
      if (userObj.email === email && userObj.password === password) {
        return true;
      }
    })


    this.showMessage(user);
  }

  // mostrar el mensaje de error o mensaje de exito
  showMessage = (user) => {
    // eliminar el mensaje previo
    this.messageContainer.innerHTML = "";

    const message = document.createElement('p');

    if (user) {
      // si el usuario inicia la sesion con exito
      // agrega la clase para cambiar el color y sobrescribir el estilo anterior
      console.log(user)
      console.log(window.localStorage)
      message.innerHTML = `hello, ${user.email}`;
      message.classList.add("correct-message");
    }
    else {
      // si el inicio de sesión no se ha realizado correctamente
      message.innerHTML = 'the email and/or password are incorrect';
    }

    this.messageContainer.appendChild(message);

    if (user) this.goToMyPage(user);
  }

  goToMyPage = (user) => {
    let myPage = document.querySelector('.login')
    myPage.innerHTML =`
    <h1>My page</h1>
    <p>Hello ${user.username}, how are you doing tody?</p>
    <h2>Profile:</h2>
    <p>Name:${user.name}</p>
    <p>Email:${user.email}</p>
    `
    myPage.innerHTML = `
    <h2>Want to read</h2>`
    myPage.innerHTML = `
    <h2>Readed</h2>`
    myPage.innerHTML = `
    <h2>Trash</h2>`
  }

}


const login = new Login();

login.loginButton.addEventListener("click", login.submit);