// app/javascript/controllers/modal_form_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  // This would get all the Elements that were specified using "data-modal-form-target"
  static targets = [ "personalDataModal", "personalDataModalOverlay", "employmentModal", "employmentModalOverlay", "modalBodysDiv"]

  open_personal_data_modal() {
    this.personalDataModalTarget.classList.remove('hidden');
    this.personalDataModalOverlayTarget.classList.remove('hidden');
  }

  close_personal_data_modal() {
    this.personalDataModalTarget.classList.add('hidden');
    this.personalDataModalOverlayTarget.classList.add('hidden');
  }

  open_employment_modal() {
    this.employmentModalTarget.classList.remove('hidden');
    this.employmentModalOverlayTarget.classList.remove('hidden');
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
}
