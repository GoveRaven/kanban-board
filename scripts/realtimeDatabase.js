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
import { createTask } from "./tasks-scripts/createTask.js";

const database = getDatabase();
const dbRef = ref(database);
let userUid;
let path;

function addTasksOnSite(tasks) {
  if (tasks === undefined) return;
  for (const [key, value] of Object.entries(tasks)) {
    createTask(value.title, value.taskType, key);
  }
}

function setUserInDB(uid) {
  set(ref(database, `users/${uid}`), {
    uid,
  });
}

function getUserFromDB(uid) {
  get(child(dbRef, `users/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      userUid = uid;
      path = `users/${userUid}/tasks/`;
      addTasksOnSite(snapshot.val().tasks);
    } else {
      setUserInDB(uid);
    }
  });
}

function addUserTaskInDB(task, title, taskType) {
  if (!task.dataset.key) return;
  const DBTask = {
    title,
    taskType,
  };
  const key = push(child(dbRef, "tasks")).key;
  task.dataset.key = key;
  const updates = {};
  updates[`${path}/${key}`] = DBTask;
  return update(dbRef, updates);
}

function updateUserTasksInDB(title, taskType, key) {
  const newTask = {};
  const updates = {};
  get(child(dbRef, `${path}/${key}`)).then((snapshot) => {
    if (snapshot.exists()) {
      newTask.title = title;
      newTask.taskType = taskType;
      updates[`${path}/${key}`] = newTask;
      return update(dbRef, updates);
    }
  });
}

function removeTaskFromDB(key) {
  remove(child(dbRef, `${path}/${key}`));
}

export {
  setUserInDB,
  getUserFromDB,
  addUserTaskInDB,
  updateUserTasksInDB,
  removeTaskFromDB,
};
