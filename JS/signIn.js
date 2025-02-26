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
}