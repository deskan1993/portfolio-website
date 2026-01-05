//DOM elements
const form = document.getElementById("contactForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");

const firstNameError = document.getElementById("fnError");
const lastNameError = document.getElementById("lnError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("msgError");
const phoneError = document.getElementById("phoneError");
const subjectError = document.getElementById("subjectError");

const RTCtxt = document.getElementById("RTCtxt");

const successMsg = document.getElementById("successMsg");


//is empty check
function isEmpty(input, errorElm) {
    const value = input.value.trim();

    if (value === "") {
        showError(input, errorElm, "This field is required");
        return true; // Returns true if empty
    }
    return false; // Returns false if not empty
}

//Show error
function showError(input, errorElm, msg) {
    errorElm.textContent = msg;
    input.classList.add("errorBorder");
    input.classList.remove("validBorder");
}

//Clear error
function clearError(input, errorElm) {
    errorElm.textContent = "";
    input.classList.remove("errorBorder");
    input.classList.add("validBorder");
}

//Validate name
function validateName(input, errorElm) {
    if (isEmpty(input, errorElm)) {
        return false;
    }

    const validReg = /^[A-Za-z]+$/;
    if (!validReg.test(input.value.trim())) {
        showError(input, errorElm, "Only letters allowed");
        return false;
    } else {
        clearError(input, errorElm);
        return true;
    }
}

//Validate email
function validateEmail(input, errorElm) {
    if (isEmpty(input, errorElm)) {
        return false;
    }

    const validReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validReg.test(input.value.trim())) {
        showError(input, errorElm, "Enter a valid email adress");
        return false;
    } else {
        clearError(input, errorElm);
        return true;
    }
}

//Validate phone
function validatePhone(input, errorElm) {
    const validReg = /^\d+$/; //only allows digits 0-9
    const value = input.value;

    // empty check, empty is ok as this field is optional
    if (value === "") {
        input.classList.remove("errorBorder", "validBorder");
        errorElm.textContent = "";
        return true;
    }

    if (!validReg.test(input.value)) {
        showError(input, errorElm, "Enter a valid phone number");
        return false;
    } else {
        clearError(input, errorElm);
        return true;
    }
}

//Validate subject
function validateSubject() {
    if (subject.value === "") {
        showError(subject, subjectError, "Please choose a subject");
        return false;
    } else {
        clearError(subject, subjectError);
        return true;
    }
}

//Validate message
function validateMessage(input, errorElm) {
    if (isEmpty(input, errorElm)) {
        return false;
    }

    const value = input.value.trim();
    if (value.length < 20) {
        showError(input, errorElm, "Message must be at least 20 characters");
        return false;
    } else {
        clearError(input, errorElm);
        return true;
    }
}

//Real-time-counter for message
function updateCharCounter() {
    const length = message.value.length;
    RTCtxt.textContent = length + " / 20 characters";

    if (length < 20) {
        RTCtxt.style.color = "#dc3545";
    } else {
        RTCtxt.style.color = "green";
    }
}

//Reset
resetBtn.addEventListener("click", function () {
    clearForm();
});

//Clear form function
function clearForm(){
    form.reset();

    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    messageError.textContent = "";
    subjectError.textContent ="";

    const inputs = [firstName, lastName, email, message, phone, subject];
    inputs.forEach(input => {
        input.classList.remove("validBorder", "errorBorder");
    });
}

//submit
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const isFirstNameValid = validateName(firstName, firstNameError);
    const isLastNameValid = validateName(lastName, lastNameError);
    const isEmailValid = validateEmail(email, emailError);
    const isPhoneValid = validatePhone(phone, phoneError);
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage(message, messageError);

    if (
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isSubjectValid &&
        isMessageValid
    ) {
        successMsg.textContent =
            `Thank you ${firstName.value.trim()}!, I will get back to you soon.`;
        successMsg.style.display = "block";

        setTimeout(() => {
            successMsg.style.display = "none";
        }, 3000);

        clearForm();
    }
});

// Update counter as user types
message.addEventListener("input", updateCharCounter);

// Initialize counter when page loads
updateCharCounter();
