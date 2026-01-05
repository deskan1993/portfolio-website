//DOM elements
const form = document.getElementById("contactForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

const resetBtn = document.getElementById("resetBtn");
const submitBtn = document.getElementById("submitBtn");

const firstNameError = document.getElementById("fnError");
const lastNameError = document.getElementById("lnError");
const emailError = document.getElementById("emailError");
const messageError =document.getElementById("msgError");

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


//submit
submitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    validateName(firstName, firstNameError);
    validateName(lastName, lastNameError);
    validateEmail(email, emailError);
    validateMessage(message, messageError);

});
