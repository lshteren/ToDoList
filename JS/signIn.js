//handeling the sign-in page from all places

const mainPage = document.getElementById("main-content");


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
    const user =login();
    if (user) {
        alert(`Welcome ${user.username} !`);
        //load the main page
        const mainContent = document.getElementById("main-content");
        const container = document.getElementById("container");
        const mainPageTamplate = document.getElementById("main-page-template");
        const clone = mainPageTamplate.content.cloneNode(true);
        mainContent.style.display = "none";

        container.innerHTML = '';
        container.appendChild(clone);
        container.display="block";

        // const manuBar = document.getElementById("manu-bar");
        // manuBar.style.visibility = "hidden";
    }
    else {
            alert("Wrong, try again!");
    }

}