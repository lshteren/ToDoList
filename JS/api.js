
import { getUser, getUserLists, addList } from './tasks.js';

let user = getUser("hadas", "1234");
if (user) {
    console.log("המשתמש מחובר:", user);
    let lists = getUserLists(user.id);
    console.log("רשימות המשתמש:", lists);
}

// הוספת רשימה חדשה
addList(1, "משימות יומיות");
console.log("רשימות לאחר הוספה:", getUserLists(1));
