export class Validate {
  regexPassword =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+,\-.\/:;<=>?@[\\\]^_`{|}~])/;
  regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  regexUsername = /^[a-zA-Z0-9_-]{6,30}$/;

  constructor(password, email, username = '') {
    this.password = password;
    this.email = email;
    this.username = username;
  }

  validateUsername() {
    if (this.username.length < 6 || this.username.length > 30) {
      return "Invalid username length. It should be > 6 and < 30 symbols";
    } else if (!this.regexUsername.test(this.username)) {
      return "Username contains invalid characters";
    } else return true;
  }

  passwordLength() {
    return this.password.length;
  }

  validatePassword() {
    if (this.passwordLength() < 6 || this.passwordLength() > 30) {
      return "Invalid password length. It should be > 6 and < 30 simbols";
    } else if (!this.regexPassword.test(this.password)) {
      return "Password does not match to criterias";
    } else return true;
  }

  validateEmail() {
    if (!this.regexEmail.test(this.email)) {
      return "Invalid email. Correct form xxxx@xxxx.ru or xxxx@xxxx.com";
    } else return true;
  }

  validateEmailAndPassword() {
    const emailValidation = this.validateEmail();
    const passwordValidation = this.validatePassword();

    if (emailValidation !== true) {
        return emailValidation;
    } else if (passwordValidation !== true) {
        return passwordValidation;
    } else {
        return true;
    }
  }
  
  fullFormValidation() {
    const passwordValidation = this.validatePassword();
    const emailValidation = this.validateEmail();
    const usernameValidation = this.validateUsername();

    if (passwordValidation !== true) {
      return passwordValidation;
    } else if (emailValidation !== true) {
      return emailValidation;
    } else if (usernameValidation !== true) {
      return usernameValidation;
    } else return true;
  }
}
