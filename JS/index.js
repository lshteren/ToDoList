// let users = [];

// //create default admin user
// let adminUser = {
//     username: "admin",
//     email: "admin@admin.co.il",
//     password: "admin"
// }

//users.push(adminUser);
// signOutHandler();
//const mainPage = document.getElementById("main-content");

function signOutHandler() {
    const container = document.getElementById("container");
    container.innerHTML = '';
    const mainPage = document.getElementById("main-content");
    mainPage.style.display = "block";
    //console.log(mainPage.innerHTML)
    //container.innerHTML = '';
    //container.style.visibility= "hidden";
    logout();
}