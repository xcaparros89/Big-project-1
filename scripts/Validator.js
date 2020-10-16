'use strict';


class Validator {
  constructor() {
    // mensajes predeterminados
    this.noName ='Please, introduce your name';
    this.noUsername ='Put your username';
    this.noCheck ='You need to accept our policies';
    this.invalidEmailError = 'Introduce a valid email';
    this.emailExistsError = 'That email is already registered, did you forget your password?';
    this.passwordError = 'Password must have 6 or more characters';
    this.repeatPasswordError = 'The two passwords do not match';

    // objeto con los errores que vamos a mostrar al usuario
    this.errors = {
      noName: this.noName,
      noUsername: this.noUsername,
      noCheck: this.noCheck,
      invalidEmailError: this.invalidEmailError,
      passwordError: this.passwordError,
      repeatPasswordError: this.repeatPasswordError
    }
  }
    //validar que tenga nombre, username y check
    validateFill(value, field){
      if (value){
        delete this.errors[field]
      } else {
        this.errors[field] = this[field]
      }
    }
    // validar el nombre del email
    validateValidEmail(email){
      // si el email es valido, quita el mensaje de error
      if (this.emailIsValid(email)) {
        delete this.errors.invalidEmailError;
      }
      else {
        // si el email no es valido, poner el mensaje que se mostrara
        this.errors.invalidEmailError = this.invalidEmailError;
      }
    }

    // funcion auxiliar de `validateEmail`
    emailIsValid(email){
      // RegEx objeto special - contiene las reglas de la sintaxis
      const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
      
      // metodo `test` prueba si la cadena cumple las reglas
      // y devuelve `true` o `false`
      const isValid = emailRegEx.test(email);
      
      return isValid;      
    }
    
    // validar que el email no esta tomado (es unico)
    validateUniqueEmail(newEmail){
      const usersDB = db.getAllUsers();

      let emailUnique = true;

      if(usersDB.length > 0) {
        usersDB.forEach( (userObj) => {
          // si el email ya esta tomado, cambia el valior de la variable a `false`
          if (userObj.email === newEmail ) {
            emailUnique = false;
          }
        })

        if (emailUnique) {
          // quita el mensaje de error
          delete this.errors.emailExistsError;
        } else {
          // si el email no es unico, poner el mensaje de nuevo
          this.errors.emailExistsError = this.emailExistsError
        }

      }
    }

    // validar la longitud del password
    validatePassword(password){
      if (password.length > 5) {
        // quita el mensaje de error
        delete this.errors.passwordError;
      }
      else {
        // si el password tiene menos de 5 caracteres, poner el mensaje
        this.errors.passwordError = this.passwordError;
      }
    }

    // validar si el password y el repeat-password coinciden
    validatePasswordRepeat(password, passwordRepeat){
      if (password === passwordRepeat) {
        // si los 2 passwords coinciden, quita el error
        delete this.errors.repeatPasswordError;
      }
      else {
        // si no coinciden, poner el mensaje
        this.errors.repeatPasswordError = this.repeatPasswordError;
      }
    }

    // obtener el objeto con errors, para mostrarlos al usuario en la pagina Signup
    getErrors(){
      return this.errors;
    }

    // reiniciar los errores mostrados, para el proximo Signup
    resetValidator(){
      this.errors = {
        noName: this.noName,
        noUsername: this.noUsername,
        noCheck: this.noCheck,
        invalidEmailError: this.invalidEmailError,
        passwordError: this.passwordError,
        repeatPasswordError: this.repeatPasswordError
      }
    }
}

const validator = new Validator();