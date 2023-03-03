// app/javascript/controllers/form_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "firstNameInput",
    "firstNameInputError",
    "lastNameInput",
    "lastNameInputError",
    "nickNameInput",
    "nickNameInputError",
    "emailInput",
    "emailInputError",
    "phoneInput",
    "phoneInputError",
    "userForm",
    "userFormSubmitBtn",
    "successMessage",
    "errorMessage",
  ]

  connect() {
    this.disableFields(this.lastNameInputTarget)
    this.disableFields(this.nickNameInputTarget)
    this.disableFields(this.emailInputTarget)
    this.disableFields(this.phoneInputTarget)
    this.disableFields(this.userFormSubmitBtnTarget)

    this.successMessageTarget.style.display = 'none';
    this.errorMessageTarget.style.display = 'none';

    // add event listeners for input fields
    this.firstNameInputTarget.addEventListener("input", this.validateInput.bind(this));

    this.lastNameInputTarget.addEventListener("input", this.validateInput.bind(this));

    this.nickNameInputTarget.addEventListener("input", this.validateInput.bind(this));

    this.emailInputTarget.addEventListener("input", this.validateInput.bind(this));

    this.phoneInputTarget.addEventListener("input", this.validateInput.bind(this));
    this.phoneInputTarget.addEventListener("input", () => {
      const formattedPhone = this.phoneInputTarget.value.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
      this.phoneInputTarget.value = formattedPhone;
    });

    this.userFormTarget.addEventListener("submit", this.submitForm.bind(this));
  }

  validateInput(event) {
    const target = event.target

    if (target.value.length === 0) {
      return false
    }

    switch(target) {
      case this.firstNameInputTarget:
        if (this.isValidName(target.value)) {
          this.enableFields(this.lastNameInputTarget)
          this.removeErrorForInput(this.firstNameInputErrorTarget);
        } else {
          this.setErrorForInput(this.firstNameInputErrorTarget, 'Invalid First Name');
        }
        break
      case this.lastNameInputTarget:
        if (this.isValidName(target.value)) {
          this.enableFields(this.nickNameInputTarget)
          this.removeErrorForInput(this.lastNameInputErrorTarget);
        } else {
          this.setErrorForInput(this.lastNameInputErrorTarget, 'Invalid Last Name');
        }
        break
      case this.nickNameInputTarget:
        if (this.isValidName(target.value)) {
          this.enableFields(this.emailInputTarget)
          this.removeErrorForInput(this.nickNameInputErrorTarget);
        } else {
          this.setErrorForInput(this.nickNameInputErrorTarget, 'Invalid Nick Name');
        }
        break
      case this.emailInputTarget:
        if (this.isValidEmail(target.value)) {
          this.enableFields(this.phoneInputTarget)
          this.removeErrorForInput(this.emailInputErrorTarget);
        } else {
          this.setErrorForInput(this.emailInputErrorTarget, 'Invalid Email');
        }
        break
      case this.phoneInputTarget:
        if (this.isValidPhoneNumber(target.value)) {
          this.enableFields(this.userFormSubmitBtnTarget)
          this.removeErrorForInput(this.phoneInputErrorTarget);
        } else {
          this.setErrorForInput(this.phoneInputErrorTarget, 'Invalid phone number');
        }
        break
      default:
        break
    }
  }

  isValidName(name) {
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/

    if (name === '' || !regex.test(name)) {
      // name is invalid
      this.disableAllFields();
      return false;
    } else {
      // name is valid
      return true;
    }
  }

  isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (email === '' || !regex.test(email)) {
      // Email is invalid
      this.disableAllFields();
      return false;
    } else {
      // Email is valid
      return true;
    }
  }

  isValidPhoneNumber(phoneNumber) {
    const regex = /^(\d{3}-\d{3}-\d{4}|\d{10})$/;
    if (phoneNumber === '' || !regex.test(phoneNumber)) {
      // phone number is invalid
      this.disableAllFields();
      return false;
    } else {
      // phone number is valid
      return true;
    }
  }

  formatPhoneNumber(event) {
    const target = event.target
    const cleaned = target.value.replace(/\D/g, '')
    const regex = /^(\d{3})(\d{3})(\d{4})$/
    target.value = cleaned.replace(regex, '$1-$2-$3')
  }

  enableFields(target) {
    target.disabled = false
    target.classList.remove("bg-gray-300")
  }

  disableFields(target) {
    target.disabled = true
    target.classList.add("bg-gray-300")
  }

  disableAllFields() {
    this.userFormSubmitBtnTarget.disabled = true;
    this.userFormSubmitBtnTarget.classList.add("bg-gray-300")
  }

  setErrorForInput(input, message) {
    input.innerText = message;
    input.classList.add('error-message');
  }

  removeErrorForInput(input) {
    input.innerText = '';
    input.classList.remove('error-message');
  }

  submitForm(event) {
    event.preventDefault()

    const form = event.target
    const url = this.userFormTarget.action
    const method = this.userFormTarget.method
    const formData = new FormData(this.userFormTarget)

    if (this.isValidName(this.firstNameInputTarget.value) &&
        this.isValidName(this.lastNameInputTarget.value) &&
        this.isValidName(this.nickNameInputTarget.value) &&
        this.isValidEmail(this.emailInputTarget.value) &&
        this.isValidPhoneNumber(this.phoneInputTarget.value))
    {
      fetch(url, {
        method: method,
        body: formData,
        headers: {
          'X-CSRF-Token': form.querySelector('input[name="authenticity_token"]').value
        }
      }).then(response => {
        return response.text(); // Convert response to text format first
      }).then(text => {
        const json = JSON.parse(text); // Parse the JSON data

        if (json.status == "created") {
          this.afterSuccess(json.message)

          const employmentModal = document.querySelector('#employmentModal');
          const employmentModalOverlay = document.querySelector('#employmentModal');
          employmentModal.classList.remove('hidden');
          employmentModalOverlay.classList.remove('hidden');

          const personalDataModal = document.querySelector('#personalDataModal');
          const personalDataModalOverlay = document.querySelector('#personalDataModalOverlay');
          personalDataModal.classList.add('hidden');
          personalDataModalOverlay.classList.add('hidden');
        } else {
          this.afterFailure(json.errors)
        }
      })
    }
  }

  afterSuccess(message) {
    this.successMessageTarget.textContent = message;
    this.successMessageTarget.style.display = 'block';

    setTimeout(() => {
      this.successMessageTarget.style.display = 'none';
    }, 5000);
  }

  afterFailure(errors) {
    this.errorMessageTarget.textContent = errors.join(', ');
    this.errorMessageTarget.style.display = 'block';

    setTimeout(() => {
      this.errorMessageTarget.style.display = 'none';
    }, 5000);
  }
}
