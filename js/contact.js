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
const messageError =document.getElementById("msgError");
const phoneError = document.getElementById("phoneError");

const RTCtxt = document.getElementById("RTCtxt");

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
    const validReg = /^[A-Za-z]+$/;
    if (!validReg.test(input.value)) {
        showError(input, errorElm, "Only letters allowed");
        return false;
    } else {
        clearError(input, errorElm);
        return true;
    }
}

//Validate email
function validateEmail(input, errorElm) {
    const validReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validReg.test(input.value)) {
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
        subject.classList.add("errorBorder");
        subject.classList.remove("validBorder");
        return false;
    } else {
        subject.classList.remove("errorBorder");
        subject.classList.add("validBorder");
        return true;
    }
}

//Validate message
function validateMessage(input, errorElm) {
    if (input.value.length < 20) {
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
    form.reset();

    firstNameError.textContent = "";
    lastNameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    messageError.textContent = "";

    const inputs = [firstName, lastName, email, message,phone];
    inputs.forEach(input => {
        input.classList.remove("validBorder", "errorBorder");
    });
});

//submit
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    validateName(firstName, firstNameError);
    validateName(lastName, lastNameError);
    validateEmail(email, emailError);
    validatePhone(phone,phoneError);
    validateSubject();
    validateMessage(message, messageError);

});

// Update counter as user types
message.addEventListener("input", updateCharCounter);

// Initialize counter when page loads
updateCharCounter();
