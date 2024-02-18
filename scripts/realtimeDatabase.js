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
import { removeLoader } from "./removeLoader.js";

const database = getDatabase();
const dbRef = ref(database);
const userKey = "users";
const tasksKey = "tasks";
let userUid;
let path;

function addTasksOnSite(tasks) {
  if (tasks === undefined) return;
  for (const [key, value] of Object.entries(tasks)) {
    createTask(value.title, value.taskType, key);
  }
}

function setUserInDB(uid) {
  set(ref(database, `${userKey}/${uid}`), {
    uid,
  });
}

function getUserFromDB(uid) {
  get(child(dbRef, `${userKey}/${uid}`)).then((snapshot) => {
    if (snapshot.exists()) {
      userUid = uid;
      path = `${userKey}/${userUid}/${tasksKey}/`;
      addTasksOnSite(snapshot.val().tasks);
    } else {
      setUserInDB(uid);
    }
    removeLoader();
  });
}

function addUserTaskInDB(task, title, taskType) {
  if (!!task.dataset.key) return;
  const DBTask = {
    title,
    taskType,
  };
  const { key } = push(child(dbRef, tasksKey));
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
