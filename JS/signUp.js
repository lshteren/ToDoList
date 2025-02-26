
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
    

    if (password === rePassword) {

        // cretae new user
        let newUser = {
            username: username,
            email: email,
            password: password
        };

        // add the new user into users array
        users.push(newUser);

        alert("You are redirecting to sign-in page!");
        // display the sign-in page
        signInManuHandler();

    } else {
        alert("Password don't match! please try again.");
    }
}