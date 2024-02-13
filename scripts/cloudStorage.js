// import { getApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { firebaseConfig, auth, app } from "./firebaseConfig.js";
import { tasksLists } from "./tasks-scripts/consts.js";
import { createTask } from "./tasks-scripts/createTask.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  push,
  update,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const database = getDatabase();
const dbRef = ref(getDatabase());
let userUid;

function getUserFromDB(uid) {
  get(child(dbRef, `users/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      userUid = uid;
      addTasksOnSite(snapshot.val().tasks);
    } else {
      console.log("error");
      setUserInDB(uid);
      getUserFromDB(uid);
    }
  });
}

function addTasksOnSite(tasks) {
  if (tasks === undefined) return;
  const values = Object.values(tasks);
  const keys = Object.keys(tasks);
  for (let i = 0; i < Object.values(tasks).length; i++) {
    createTask(values[i].title, values[i].taskType, keys[i]);
  }
}

function setUserInDB(uid) {
  set(ref(database, `users/${uid}`), {
    uid: uid,
  });
}

function createUserTasksInDB(task, title, taskType) {
  if (task.dataset.key !== undefined) {
    console.log(task.dataset.key);
    return;
  }
  const DBTask = {
    title: title,
    taskType: taskType,
  };
  const newPostKey = push(child(ref(database), "tasks")).key;
  console.log(newPostKey)
  task.dataset.key = newPostKey;
  const updates = {};
  updates[`users/${userUid}/tasks/${newPostKey}`] = DBTask;
  return update(ref(database), updates);
}

function updateUserTasksInDB(title, taskType, key) {
  console.log(title);
  const newTask = {};
  const updates = {};
  get(child(dbRef, `users/${userUid}/tasks/${key}`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      newTask.title = title;
      newTask.taskType = taskType;
      updates[`users/${userUid}/tasks/${key}`] = newTask;
      console.log(updates);
      return update(ref(database), updates);
    }
  });
}

export { setUserInDB, getUserFromDB, createUserTasksInDB, updateUserTasksInDB };
