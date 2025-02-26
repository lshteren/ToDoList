function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    if (users.some(user => user.username === username)) {
        alert("שם משתמש כבר קיים!");
        return;
    }

    users.push({ id: users.length + 1, username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("נרשמת בהצלחה!");
}

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        alert("שם משתמש או סיסמה שגויים");
        return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    document.getElementById("auth").style.display = "none";
    document.getElementById("tasks").style.display = "block";
    loadTasks();
}

function logout() {
    localStorage.removeItem("currentUser");
    document.getElementById("auth").style.display = "block";
    document.getElementById("tasks").style.display = "none";
}
