
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
    fakeRegister(() => {
        alert("Registration successful! Redirecting to sign-in...");
        signInManuHandler();
    });
    
}