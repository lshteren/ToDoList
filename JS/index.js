let users = [];

//create default admin user
let adminUser = {
    username: "admin",
    email: "admin@admin.co.il",
    password: "admin"
}

users.push(adminUser);
//signOutHnadler();

function signOutHnadler() {
    const container = document.getElementById("container");
    const mainPage = document.getElementById("main-content");
    container.innerHTML = document.getElementById("main-content");
    mainPage.display="block";
}