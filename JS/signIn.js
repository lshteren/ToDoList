//handeling the sign-in page from all places: 


function signInManuHandler(){
    const mainContent = document.getElementById("main-content");
    const container = document.getElementById("container");
    const login_page = document.getElementById("sign-in-template");
    const clone = login_page.content.cloneNode(true);
    mainContent.style.display = "none";
    //reset page content
    container.innerHTML = ''; 
    container.appendChild(clone);
    container.display="block";
}

function signInButtonHandler() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user=users.find(x => x.username === username);
    if (user) {
        if (password === user.password) {
            alert(`Welcome ${username.innerText} !`);
            const mainContent = document.getElementById("main-content");
            const container = document.getElementById("container");
            const mainPageTamplate = document.getElementById("main-page-template");
            const clone = mainPageTamplate.content.cloneNode(true);
            mainContent.style.display = "none";

            container.innerHTML = '';
            container.appendChild(clone);
            container.display="block";

            const manuBar = document.getElementById("manu-bar");
            manuBar.style.visibility = "hidden";
        }
        else {
            alert("Wrong, try again!");
        }
    }
    else {
        alert("Wrong, try again!");
    }

}