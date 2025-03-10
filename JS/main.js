// document.addEventListener("DOMContentLoaded", function () {
//     const taskInput = document.getElementById("task-input");
//     const addTaskButton = document.getElementById("add-task-button");
//     const taskList = document.getElementById("task-list");

//     // הוספת משימה חדשה
//     addTaskButton.addEventListener("click", function () {
//         const taskText = taskInput.value.trim();
//         if (taskText === "") return;

//         const listItem = document.createElement("li");

//         // יצירת checkbox
//         const checkbox = document.createElement("input");
//         checkbox.type = "checkbox";
//         checkbox.addEventListener("change", function () {
//             if (checkbox.checked) {
//                 listItem.classList.add("completed");
//             } else {
//                 listItem.classList.remove("completed");
//             }
//         });

//         // יצירת טקסט המשימה
//         const taskSpan = document.createElement("span");
//         taskSpan.textContent = taskText;

//         // יצירת כפתור מחיקה
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "Delete";
//         deleteButton.classList.add("delete-btn");
//         deleteButton.addEventListener("click", function () {
//             taskList.removeChild(listItem);
//         });

//         // הוספת האלמנטיaaaaם לרשימה
//         listItem.appendChild(checkbox);
//         listItem.appendChild(taskSpan);
//         listItem.appendChild(deleteButton);
//         taskList.appendChild(listItem);

//         // ניקוי שדה הקלט
//         taskInput.value = "";
//     });
// });


window.onload = function() {
    loadLists();
};