export class Validate {
  regexPassword =
    /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+,\-.\/:;<=>?@[\\\]^_`{|}~])/;
  regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  constructor(password, email) {
    this.password = password;
    this.email = email;
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
  fullFormValidation() {
    if (this.validatePassword() != true) {
      return this.validatePassword();
    } else if (this.validateEmail() != true) {
      return this.validateEmail();
    } else return true;
  }
}
