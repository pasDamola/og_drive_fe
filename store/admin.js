// import UserService from '../services/UserService';
// import Config from '../services/Config';
export const state = () => ({
  allUsers: [],
});

export const getters = {};

export const actions = {};

export const mutations = {
  LOAD_USERS(state, allUsers) {
    state.allUsers = allUsers;
  },
};
