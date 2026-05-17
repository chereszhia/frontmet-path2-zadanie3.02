document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('successToast');

  // Funkcja pomocnicza do sprawdzania błędów
  const showError = (inputId, errorId) => {
    const inputGroup = document.getElementById(inputId).closest('.input-group');
    inputGroup.classList.add('error');
  };

  const clearError = (inputId) => {
    const inputGroup = document.getElementById(inputId).closest('.input-group');
    inputGroup.classList.remove('error');
  };

  const clearAllErrors = () => {
    document.querySelectorAll('.input-group').forEach(group => group.classList.remove('error'));
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAllErrors();
    
    let isValid = true;

    // 1. Imię
    const firstName = document.getElementById('firstName');
    if (!firstName.value.trim()) {
      showError('firstName', 'firstNameError');
      isValid = false;
    }

    // 2. Nazwisko
    const lastName = document.getElementById('lastName');
    if (!lastName.value.trim()) {
      showError('lastName', 'lastNameError');
      isValid = false;
    }

    // 3. Email
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value.trim())) {
      showError('email', 'emailError');
      isValid = false;
    }

    // 4. Query Type (Radio)
    const querySelected = document.querySelector('input[name="queryType"]:checked');
    if (!querySelected) {
      document.querySelector('fieldset').classList.add('error');
      isValid = false;
    } else {
      document.querySelector('fieldset').classList.remove('error');
    }

    // 5. Message
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      showError('message', 'messageError');
      isValid = false;
    }

    // 6. Consent (Checkbox)
    const consent = document.getElementById('consent');
    if (!consent.checked) {
      document.querySelector('.checkbox-group').classList.add('error');
      isValid = false;
    } else {
      document.querySelector('.checkbox-group').classList.remove('error');
    }

    // Jeśli wszystko jest OK -> Toast + Reset
    if (isValid) {
      toast.classList.add('show');
      
      // Opcjonalnie: zresetuj formularz po 3 sekundach (jeśli chcesz)
      // setTimeout(() => {
      //   form.reset();
      //   toast.classList.remove('show');
      // }, 3000);
      
      // Użytkownik może też zamknąć toast klikając poza nim
      setTimeout(() => {
         toast.classList.remove('show');
      }, 5000);
    }
  });

  // Usuwanie błędów podczas pisania
  document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.input-group');
      if (group) group.classList.remove('error');
    });
  });
});