//handeling the sign-in page from all places
// import { FXMLHttpRequest } from './network';

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
    //event.preventDefault();
    //const user =login();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    let xhr = new FXMLHttpRequest(network);
    xhr.open("POST", "user"); // שולח בקשה לשרת המשתמשים
    xhr.send({ action: "login", username, password }, function(response) {
        if (!response.success) {
            alert(response.message);
            return;
        }
        alert(`Welcome ${response.user.username}!`);
        loadMainPage(); // טעינת הדף הראשי עם המשימות
    });
}

function loadMainPage(){
    const mainContent = document.getElementById("main-content");
        const container = document.getElementById("container");
        const mainPageTamplate = document.getElementById("main-page-template");
        const clone = mainPageTamplate.content.cloneNode(true);
        mainContent.style.display = "none";

        container.innerHTML = '';
        container.appendChild(clone);
        container.display="block";

       // renderTasks();
        
}

