import Config from "./Config";

const UserService = {
  getUserFromLocalStorage: getUserFromLocalStorage,
  getTokenFromLocalStorage: getTokenFromLocalStorage,
};


function getUserFromLocalStorage() {
  return JSON.parse(localStorage.getItem(Config.local_storage.user));
} //getUserFromLocalStorage

function getTokenFromLocalStorage() {
  return JSON.parse(localStorage.getItem(Config.local_storage.token));
} //getTokenFromLocalStorage


export default UserService;
