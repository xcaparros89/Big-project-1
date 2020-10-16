'use strict';

class Login {
  constructor() {
    this.emailInput = document.querySelector("#email-log");
    this.passwordInput = document.querySelector("#password-log");

    this.loginButton = document.querySelector("#login-button");
    this.messageContainer = document.querySelector(".message-container-l");
    this.user = '';
    this.myPage = document.querySelector('#login-signup');
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
    window.location.reload()
  }
  showAndHide(element) {
    if(screen.width<826){
    var x = document.querySelector(element);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
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
      this.user = user;
      this.goToMyPage(user);
    };
  }
  oneBookSearch = async bookId => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${bookId}"`);
    const data = await response.json();
    console.log('fetch2', data);
}
  printTitlesLike = ()=>{
    let recomendations = document.querySelector('#recomendations3');
    recomendations.innerHTML = `
    <section class='wannaread-s'>
      <h2 id='wannaread-t'>Wanna read:</h2>
      <div class='like-list wannaread'></div>
    </section>
    <section class='reading-s'>
      <h2 id='reading-t'>Reading:</h2>
      <div class='like-list reading'></div>
    </section>
    <section class='readed-s'>
      <h2 id='readed-t'>Readed:</h2>
      <div class='like-list readed'></div>
    </section>`
    document.getElementById('wannaread-t').addEventListener('click',()=> this.showAndHide('.wannaread'))
    document.getElementById('reading-t').addEventListener('click',()=> this.showAndHide('.reading'))
    document.getElementById('readed-t').addEventListener('click',()=> this.showAndHide('.readed'))
  }
  printReadLists = (listName, user) =>{
      let sectionList = document.querySelector(`.${listName}`);
      console.log(sectionList, listName)
      user[listName].forEach(async bookId => {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q="${bookId}"`);
        const book = await response.json();
        if(book.items){
          const result = book.items[0];
          sectionList.innerHTML +=`
          <h3>${result.volumeInfo.title}</h3>
          `
          sectionList.innerHTML +=`            
            <select id='save-${result.id}'>
                <option value=wannaread>Wanna read</option>
                <option value=reading>Reading</option>
                <option value=readed>Readed</option>
            </select>
            <button class='save-btn' onClick='db.addBook(document.getElementById("save-${result.id}").value, "${result.id}")'><i class="fas fa-bookmark"></i></button>`;        
        }
      })
  }

  goToMyPage = (user) =>{
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.myPage.innerHTML =`
    <h1>My page</h1>
    <p>Hello ${user.username}, how are you doing today?</p>
    <h2>Profile:</h2>
    <p>Username: ${user.username}</p>
    <p>Name: ${user.name}</p>
    <p>Email: ${user.email}</p>
    <p>Age: 42 years</p>
    <p>Hobbies: Add some hobbies</p>
    <button class='more-btn'>Change profile</button>
    ` 
    this.printTitlesLike();
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