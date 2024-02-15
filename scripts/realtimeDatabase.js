import { createTask } from "./tasks-scripts/createTask.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  push,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const database = getDatabase();
const dbRef = ref(database);
let userUid;

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

function getUserFromDB(uid) {
  get(child(dbRef, `users/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      userUid = uid;
      addTasksOnSite(snapshot.val().tasks);
    } else {
      setUserInDB(uid);
    }
  });
}

function addUserTasksInDB(task, title, taskType) {
  if (task.dataset.key !== undefined) return;
  const DBTask = {
    title: title,
    taskType: taskType,
  };
  const newPostKey = push(child(dbRef, "tasks")).key;
  task.dataset.key = newPostKey;
  const updates = {};
  updates[`users/${userUid}/tasks/${newPostKey}`] = DBTask;
  return update(dbRef, updates);
}

function updateUserTasksInDB(title, taskType, key) {
  const newTask = {};
  const updates = {};
  get(child(dbRef, `users/${userUid}/tasks/${key}`)).then((snapshot) => {
    if (snapshot.exists()) {
      newTask.title = title;
      newTask.taskType = taskType;
      updates[`users/${userUid}/tasks/${key}`] = newTask;
      return update(dbRef, updates);
    }
  });
}

function removeTaskFromDB(key) {
  remove(child(dbRef, `users/${userUid}/tasks/${key}`));
}

export {
  setUserInDB,
  getUserFromDB,
  addUserTasksInDB,
  updateUserTasksInDB,
  removeTaskFromDB,
};
