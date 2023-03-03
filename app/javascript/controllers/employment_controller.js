// app/javascript/controllers/employment_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = [
    "employerName",
    "startDate",
    "endDate",
    "submitAllBtn",
    "employmentModal",
    "employmentModalOverlay",
    "modalBodysDiv",
    "successMessage",
    "errorMessage"
  ]

  connect() {
    this.disableSubmitAllBtn();

    this.successMessageTarget.style.display = 'none';
    this.errorMessageTarget.style.display = 'none';
  }

  validateName() {
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/

    // Check if all employerName fields are valid
    let isValid = this.employerNameTargets.every((nameTarget) => {
      if (nameTarget.value.length === 0 || nameTarget.value === '' || !regex.test(nameTarget.value)) {
        this.setErrorForInput(nameTarget.nextElementSibling, 'Invalid First Name');

        return false;
      } else {
        this.removeErrorForInput(nameTarget.nextElementSibling);

        return true;
      }
    });

    if (!isValid) {
      // Some employerName field is invalid
      this.disableSubmitAllBtn();

      return false;
    } else {
      // All employerName fields are valid
      this.enableSubmitAllBtn();

      return true;
    }
  }

  validateStartDate() {
    const dateRegex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

    const isValid = this.startDateTargets.every((dateTarget) => {
      if (dateTarget.value.length === 0 || dateTarget.value === '' || !dateRegex.test(dateTarget.value)) {
        this.setErrorForInput(dateTarget.nextElementSibling, 'Invalid Start Date');

        return false;
      } else {
        this.removeErrorForInput(dateTarget.nextElementSibling);

        return true;
      }
    });

    if (!isValid) {
      // Some employerName field is invalid
      this.disableSubmitAllBtn();

      return false;
    } else {
      // All employerName fields are valid
      this.enableSubmitAllBtn();

      return true;
    }
  }

  validateEndDate() {
    const dateRegex = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

    const isValid = this.endDateTargets.every((dateTarget) => {
      if (dateTarget.value.length === 0 || dateTarget.value === '' || !dateRegex.test(dateTarget.value)) {
        this.setErrorForInput(dateTarget.nextElementSibling, 'Invalid Start Date');

        return false;
      } else {
        this.removeErrorForInput(dateTarget.nextElementSibling);

        return true;
      }
    });

    if (!isValid) {
      // Some employerName field is invalid
      this.disableSubmitAllBtn();

      return false;
    } else {
      // All employerName fields are valid
      this.enableSubmitAllBtn();

      return true;
    }
  }

  submitAllForms() {
    if ( this.validateName() && this.validateStartDate() && this.validateEndDate() ) {
      // Get all forms inside the #employmentModal div
      const forms = this.element.querySelectorAll('#employmentModal form');

      // Loop through each form and send an AJAX request
      forms.forEach(form => {
        const url = form.action; // Get the form action URL
        const method = form.method; // Get the form method
        const data = new FormData(form); // Create a FormData object from the form data

        fetch(url, {
          method: method,
          body: data,
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content // Include the CSRF token in the request header
          }
        }).then(response => {
          return response.text(); // Convert response to text format first
        }).then(text => {
          const json = JSON.parse(text); // Parse the JSON data

          if (json.status == "created") {
            this.afterSuccess(json.message)
          } else {
            this.afterFailure(json.errors)
          }

          const employmentModal = document.querySelector('#employmentModal');
          const employmentModalOverlay = document.querySelector('#employmentModal');
          employmentModal.classList.add('hidden');
          employmentModalOverlay.classList.add('hidden');
        })
      });
    }
  }

  addNewEmploymentForm() {
    fetch('/employment_form')
    .then(response => response.text())
    .then(html => {
      this.modalBodysDivTarget.insertAdjacentHTML("beforeend", html);
      this.modalBodysDivTarget.scrollTop = 0;

      // Reinitialize the stimulus controller
      this.connect();
    })
  }

  disableSubmitAllBtn() {
    this.submitAllBtnTarget.disabled = true;
    this.submitAllBtnTarget.classList.add("bg-gray-300")
  }

  enableSubmitAllBtn() {
    this.submitAllBtnTarget.disabled = false;
    this.submitAllBtnTarget.classList.remove("bg-gray-300")
  }

  setErrorForInput(input, message) {
    input.innerText = message;
    input.classList.add('error-message');
  }

  removeErrorForInput(input) {
    input.innerText = '';
    input.classList.remove('error-message');
  }

  close_employment_modal() {
    this.employmentModalTarget.classList.add('hidden');
    this.employmentModalOverlayTarget.classList.add('hidden');

    this.loadEmploymentForm();
  }

  loadEmploymentForm() {
    fetch('/employment_form')
    .then(response => response.text())
    .then(html => {
      this.modalBodysDivTarget.innerHTML =  html;

      // Reinitialize the stimulus controller
      this.connect();
    })
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
