
// import { FXMLHttpRequest } from './network';
// import { signInManuHandler } from './signIn';

function signUpManuHandler() {

    const container = document.getElementById("container");
    const signUpTemplate = document.getElementById("sign-up-template");
    const signUpClone = signUpTemplate.content.cloneNode(true); // true for copy decendences too.
    const mainContent = document.getElementById("main-content");
    mainContent.style.display = "none";
    container.innerHTML = '';
    container.appendChild(signUpClone);
}

// sign-up logic
function signUpSubmitHandler() {
    const username = document.getElementById("uname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("psw").value;
    const rePassword = document.getElementById("re-password").value;
    if (password !== rePassword) {
        alert("Passwords do not match!");
        return;
    }

    let xhr = new FXMLHttpRequest(network);
    xhr.open("POST", "user"); // שולח בקשה לשרת המשתמשים
    xhr.send({ action: "register", username, email, password }, function(response) {
        if (!response.success) {
            alert(response.message);
            return;
        }
        alert("Registration successful! Redirecting to sign-in...");
        signInManuHandler(); // מעבר למסך ההתחברות
    });



}