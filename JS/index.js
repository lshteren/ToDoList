// import { FXMLHttpRequest } from './network';

//
// function checkUserLogin() {
//     let xhr = new FXMLHttpRequest(network);
//     xhr.open("GET", "user"); // שולח בקשת GET לשרת המשתמשים
//     xhr.send({ action: "getCurrentUser" }, function(response) {
//         if (!response.user) {
//             console.log(" אין משתמש מחובר, מפנים למסך ההתחברות.");
//             signInManuHandler();
//             return;
//         }

//         console.log(" משתמש מחובר:", response.user.username);
//         loadMainPage(); // אם מחובר, טוענים את העמוד הראשי
//     });
// }
function signOutHandler() {
    let xhr = new FXMLHttpRequest(network);
    xhr.open("POST", "user"); // שולחים בקשה לשרת המשתמשים
    xhr.send({ action: "logout" }, function(response) {
        if (!response.success) {
            console.error(" שגיאה בהתנתקות:", response.message);
            return;
        }

        console.log(" התנתקות בוצעה בהצלחה!");
        const container = document.getElementById("container");
        container.innerHTML = '';
        const mainPage = document.getElementById("main-content");
        mainPage.style.display = "block";
    });
}