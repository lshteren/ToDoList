//handeling the sign-in page from all places: 

function signInManuHandler(){
    const container = document.getElementById("container");
    const login_page = document.getElementById("sign-in-template");
    const clone = login_page.content.cloneNode(true);
    //reset page content
    container.innerHTML = ''; 
    container.appendChild(signInClone);
}