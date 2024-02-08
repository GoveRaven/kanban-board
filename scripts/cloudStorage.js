// import { getApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-storage.js";
import { firebaseConfig, auth } from "./firebaseConfig.js";

// const firebaseApp = getApp();
const storage = getStorage();
const storageRef = ref(storage, "tasks");

// console.log(auth);

function rememberTasks(task, title, type) {
  // console.log(task)
  const tasktitle = title
  const tasktype = type
  console.log(tasktitle)
  console.log(type)
}

export {rememberTasks}

const tasks = [
  // {
  //   id: 1,
  //   taskTitle: "Разобраться с хранением данных в firebase",
  //   taskType: "backlog",
  // },
  // {
  //   id: 2,
  //   taskTitle: "Вспомнить материал по БД",
  //   taskType: "backlog",
  // },
  // {
  //   id: 3,
  //   taskTitle: "Закодить финальную часть проекта",
  //   taskType: "inProgress",
  // },
];

// let file = JSON.stringify(tasks)

// console.log(file);

// let revFile = JSON.parse(file)

// console.log(revFile)

// const login = await fetch("../login.html");
// const text = await login.text();

// console.log(text)

// uploadBytes(storageRef, file).then((snapshot) => {
//   console.log('Uploaded a blob or file!');
// });

// console.log(storageRef);
