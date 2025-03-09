// class FAJAX {
//     static send(request, callback) {
//         console.log(" שולח FAJAX request:", request);

//         // מחזיר תשובה מיידית בלי השהיה ובלי כשלונות
//         callback({ success: true, data: request });

//         console.log(" FAJAX הצליח מיד!", request);
//     }
// }

// // אתחול המשתמשים ב-localStorage רק פעם אחת
// if (!localStorage.getItem("storage_users")) {
//     let defaultUsers = [
//         { username: "admin", email: "admin@admin.co.il", password: "admin" }
//     ];
//     localStorage.setItem("storage_users", JSON.stringify(defaultUsers));
// }

// // פונקציה לרישום משתמש חדש
// function fakeRegister(callback) {
//     const username = document.getElementById("uname").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("psw").value;
//     const rePassword = document.getElementById("re-password").value;

//     FAJAX.send({ action: "register" }, (response) => {
//         if (!response.success) {
//             alert(response.message);
//             return ;
//         }

//         let storage_users = JSON.parse(localStorage.getItem("storage_users")) || [];

//         if (storage_users.some(user => user.username === username)) {
//             alert("Username already exists!");
//             return ;
//         }

//         if (password !== rePassword) {
//             alert("Passwords do not match!");
//             return ;
//         }

//         storage_users.push({ email, username, password });
//         localStorage.setItem("storage_users", JSON.stringify(storage_users));

//         if (callback) callback();
//     });
// }

// // פונקציה להתחברות משתמש
// function fakeLogin(callback) {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     FAJAX.send({ action: "login", username, password }, (response) => {
//         if (!response.success) {
//             alert(response.message);
//             return;
//         }

//         let storage_users = JSON.parse(localStorage.getItem("storage_users")) || [];
//         const user = storage_users.find(user => user.username === username && user.password === password);

//         if (!user) {
//             alert("Wrong username or password.");
//             return;
//         }

//         localStorage.setItem("currentUser", JSON.stringify(user));

//         if (callback) callback(user);
//     });
// }

// // פונקציה לניתוק משתמש
// function logout() {
//     localStorage.removeItem("currentUser");
// }


