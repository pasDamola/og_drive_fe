// import UserService from '../services/UserService';
// import Config from '../services/Config';
export const state = () => ({
  // user: UserService.getUserFromLocalStorage(),
  // token_details: UserService.getTokenFromLocalStorage(),
  verifyToken: '',
  resetToken: '',
  user: {},
  bin: [],
  allFiles: [],
  allFolders: [],
  userFolders: [],
  allUsers: [],
  allCampaigns: [],
  totalFiles: [],
  totalDirectories: [],
  userDirectories: [],
  hello: 'hello',
  breadCrumbs: [
    {
      text: 'mdi-home',
      href: '/',
      disabled: false,
      icon: true,
    },
  ],
  level: 0,
});

export const getters = {
  getBreadCrumbs: (state) => {
    return state.breadCrumbs.filter((el, index, self) => {
      const elIndex = self.findIndex((element) => element.href === el.href);
      return index === elIndex;
    });
  },
  isLoggedIn: () => {
    return function (that) {
      return that.$cookies.get('token');
    };
  },
  getUser: () => {
    return function (that) {
      return JSON.parse(JSON.stringify(that.$cookies.get('user')));
    };
  },
  getFiles: (state) => state.allFiles,
  getFolders: (state) => state.allFolders,
  getLevel: (state) => state.level,
  getUsers: (state) => state.allUsers,
  getCampaigns: (state) => state.allCampaigns,
  getTotalFiles: (state) => state.totalFiles,
  getTotalDirectories: (state) => state.totalDirectories,
  getUserDetails: (state) => state.user,
  getUserDirectories: (state) => state.userDirectories,
  getUserToken: (state) => state.verifyToken,
  getResetToken: (state) => state.resetToken,
  getBinFiles: (state) => state.bin,
  getUserFolders: (state) => state.userFolders,
};

export const actions = {
  addBreadCrumbs({ commit }, payload) {
    commit('ADD_BREADCRUMB', payload);
  },
  resetBreadCrumbs({ commit }) {
    commit('RESET_BREADCRUMB');
  },
  removeBreadCrumb({ commit }, payload) {
    commit('REMOVE_BREADCRUMB', payload);
  },
  // eslint-disable-next-line
  saveAuth({ commit }, [user, token]) {
    this.$cookies.set('user', user, {
      path: '/',
      maxAge: 30 * 7 * 24 * 60 * 60,
    });
    this.$cookies.set('token', token, {
      path: '/',
      maxAge: 30 * 7 * 24 * 60 * 60,
    });
    this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  async fetchFiles({ commit }, [user_id, level]) {
    try {
      const response = await this.$axios.post('files/user', { user_id, level });
      if (response) {
        commit('SAVE_USER_FILES', response.data);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  saveCurrentLevel({ commit }, payload) {
    commit('SAVE_LEVEL', payload);
  },
  fetchFolders({ commit }, payload) {
    this.$axios.post('users/directories', { user_id: payload }).then((res) => {
      commit('SAVE_USER_FOLDERS', res.data);
    });
  },
  fetchUserFolders({ commit }, payload) {
    this.$axios.get('admin/files/user', { user_id: payload }).then((res) => {
      console.log('folders', res.data.directories);
      commit('SAVE_FOLDERS', res.data.directories);
    });
  },
  async fetchBinFiles({ commit }, user_id) {
    // let user = this.getUser(this);
    // let user_id = user.id;
    // this.$axios.get(`files/bin/${user_id}`).then((res) => {
    //   console.log(res);
    // });
    try {
      const response = await this.$axios.get(`files/bin/${user_id}`);
      if (response) {
        console.log(response.data);
        commit('LOAD_ALL_BIN', response.data.data);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async fetchUsers({ commit }) {
    try {
      const response = await this.$axios.get('admin/allUsers');
      if (response) {
        console.log(response.data);
        commit('LOAD_ALL_USERS', response.data);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async fetchCampaigns({ commit }) {
    try {
      const response = await this.$axios.get('campaigns');
      if (response) {
        commit('LOAD_ALL_CAMPAIGNS', response.data);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async fetchTotalFiles({ commit }) {
    try {
      const response = await this.$axios.get('admin/statistics');
      if (response) {
        commit('LOAD_ALL_FILES', response.data.files);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async fetchTotalDirectories({ commit }) {
    try {
      const response = await this.$axios.get('admin/statistics');
      if (response) {
        commit('LOAD_ALL_DIRECTORIES', response.data.directories);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async editUser({ commit }, id) {
    try {
      const response = await this.$axios.patch(`admin/updateUser/${id}`);
      if (response) {
        commit('LOAD_ALL_USERS', response.data);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async fetchUser({ commit }, id) {
    try {
      const response = await this.$axios.get(`admin/user/${id}`);
      if (response) {
        console.log('Response:', response.data);
        commit('LOAD_USER_DETAILS', response.data);
        commit('LOAD_USER_DIRECTORIES', response.data.directories);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
  // async verifyUser({ commit }, id) {
  //   try {
  //     const response = await this.$axios.post('users/verified', id);
  //     if (response) {
  //       commit('VERIFY_USER', response.data);
  //       return Promise.resolve(response.data);
  //     }
  //   } catch (error) {
  //     return Promise.reject(error);
  //   }
  // },
  async resetUser({ commit }, [id, email]) {
    try {
      const response = await this.$axios.post('reset-password', { id, email });
      if (response) {
        commit('RESET_USER', response.data);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  },
};

export const mutations = {
  SAVE_LEVEL(state, payload) {
    state.level = payload;
  },
  ADD_BREADCRUMB(state, payload) {
    const breadCrumbs = [...state.breadCrumbs];
    // Enable breadcrumbs
    breadCrumbs.forEach((breadCrumb) => {
      breadCrumb.disabled = false;
    });

    breadCrumbs.push(payload);

    breadCrumbs.forEach((el) => {
      if (el.href === payload.href) {
        el.disabled = true;
      }
    });
    // Remove duplicate breadcrumbs
    const filtered = breadCrumbs.filter((el, index, self) => {
      const elIndex = self.findIndex((element) => element.href === el.href);
      return index === elIndex;
    });

    state.breadCrumbs = [...filtered];
  },
  REMOVE_BREADCRUMB(state, payload) {
    const breadCrumbs = [...state.breadCrumbs];
    const index = breadCrumbs.findIndex((el) => el.href === payload);
    // Remove current page from breadcrumb
    if (index > -1) {
      state.breadCrumbs = [...breadCrumbs.slice(0, index + 1)];
    }
  },
  RESET_BREADCRUMB(state) {
    state.breadCrumbs = [
      {
        text: 'My drive',
        href: '/',
        disabled: false,
      },
    ];
  },
  SAVE_USER_FILES(state, payload) {
    state.allFiles = payload.files;
  },
  SAVE_USER_FOLDERS(state, payload) {
    state.allFolders = payload.directories;
  },
  LOAD_ALL_USERS(state, allUsers) {
    state.allUsers = allUsers;
  },
  LOAD_ALL_FILES(state, files) {
    state.totalFiles = files;
  },
  LOAD_ALL_DIRECTORIES(state, directories) {
    state.totalDirectories = directories;
  },
  LOAD_ALL_CAMPAIGNS(state, allCampaigns) {
    state.allCampaigns = allCampaigns;
  },
  LOAD_USER_DETAILS(state, user) {
    state.user = user;
  },
  LOAD_USER_DIRECTORIES(state, directories) {
    state.userDirectories = directories;
  },
  VERIFY_USER(state, verifyToken) {
    state.verifyToken = verifyToken;
  },
  RESET_USER(state, resetToken) {
    state.resetToken = resetToken;
  },
  LOAD_ALL_BIN(state, bin) {
    state.bin = bin;
  },
  SAVE_FOLDERS(state, folders) {
    state.userFolders = folders;
  },
};
