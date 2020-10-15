'use strict';

class Login {
  constructor() {
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");

    this.loginButton = document.querySelector("#login-button");
    this.messageContainer = document.querySelector(".message-container");
    this.user = '';
    this.myPage = document.querySelector('.login');
  }

  // gestionar el envio de los datos (evento "submit")
  submit = (event)=>{
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
  showMessage = (user) =>{
    // eliminar el mensaje previo
    this.messageContainer.innerHTML = "";

    const message = document.createElement('p');

    if (user) {
      // si el usuario inicia la sesion con exito
      // agrega la clase para cambiar el color y sobrescribir el estilo anterior
      message.innerHTML = `hello, ${user.email}`;
      message.classList.add("correct-message");
    }
    else {
      // si el inicio de sesión no se ha realizado correctamente
      message.innerHTML = 'the email and/or password are incorrect';
    }

    this.messageContainer.appendChild(message);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      this.user = user;
      this.goToMyPage(user);
    };
  }
  oneBookSearch = async bookId => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${bookId}"&key=AIzaSyC5VX2_2TBk3EJV6dx8EKl3Q634tLoMQKU`);
    const data = await response.json();
    console.log('fetch2', data);
}
  printReadLists = (listName, user) =>{
      const titleText = listName === 'wannaread' ? 'Wanna Read' : listName === 'readed' ? 'Readed' : 'Reading'
      this.myPage.innerHTML += `<h2>${titleText}</h2>`
      user[listName].forEach(async bookId => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${bookId}"&key=AIzaSyC5VX2_2TBk3EJV6dx8EKl3Q634tLoMQKU`);
        const book = await response.json();
        const result = book.items[0];
        this.myPage.innerHTML +=`
        <h3>${result.volumeInfo.title}</h3>
        `
        this.myPage.innerHTML +=`            
          <select id='save-${result.id}'>
              <option value=wannaread>Wanna read</option>
              <option value=reading>Reading</option>
              <option value=readed>Readed</option>
          </select>
          <button onClick='db.addBook(document.getElementById("save-${result.id}").value, "${result.id}")'>save</button>`;
        if(result.volumeInfo.authors){
          let authors = result.volumeInfo.authors.join(', ');
  
          this.myPage.innerHTML +=`<p>Authors: ${authors}</p>`;
      };
      if(result.volumeInfo.categories){
          let categories = result.volumeInfo.categories.join(', ');
          this.myPage.innerHTML +=`<p>Categories: ${categories}</p>`;
      };
      let averageRating = result.volumeInfo.averageRating? result.volumeInfo.averageRating : 'Not found';
      this.myPage.innerHTML +=`<p>Rating: ${averageRating}</p>`;
        
      })
  }

  goToMyPage = (user) =>{
    this.myPage.innerHTML =`
    <h1>My page</h1>
    <p>Hello ${user.username}, how are you doing today?</p>
    <h2>Profile:</h2>
    <p>Name:${user.name}</p>
    <p>Email:${user.email}</p>
    `
    console.log(user)
    user.wannaread.length ? this.printReadLists('wannaread', user) : null;
    user.readed.length ? this.printReadLists('readed', user) : null;
    user.reading.length ? this.printReadLists('reading', user) : null;
}
}
const login = new Login();

login.loginButton.addEventListener("click", login.submit);

window.addEventListener("load", ()=>{
  if(localStorage.getItem('currentUser')){
    let user = JSON.parse(localStorage.getItem('currentUser'));
    login.goToMyPage(user);
  }
} ); 