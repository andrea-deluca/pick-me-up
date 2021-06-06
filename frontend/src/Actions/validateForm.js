// Validate Email Format Action
export default function validateEmailFormat() {
    let emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    let emailField = document.querySelector("#email");
    let textMuted = document.querySelector("#emailErr");
    emailField.classList.remove("border-danger", "text-danger");
    textMuted.classList.add("d-none");
    let match = emailRegex.test(emailField.value);
    if (!match) {
        emailField.classList.add("border-danger", "text-danger");
        textMuted.classList.remove("d-none");
    } else {
        emailField.classList.remove("border-danger", "text-danger");
        emailField.classList.add("border-success", "text-success");
        textMuted.classList.add("d-none");
    }
}