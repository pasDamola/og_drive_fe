// import UserService from '../services/UserService';
// import Config from '../services/Config';
export const state = () => ({
  // user: UserService.getUserFromLocalStorage(),
  // token_details: UserService.getTokenFromLocalStorage(),
  allFiles: [],
  allFolders: [],
  allUsers: [],
  totalFiles: [],
  totalDirectories: [],
  hello: 'hello',
  breadCrumbs: [
    {
      text: 'mdi-home',
      href: '/',
      disabled: false,
      icon: true,
    },
  ],
});

export const getters = {
  getBreadCrumbs: (state) => state.breadCrumbs,
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
  getUsers: (state) => state.allUsers,
  getTotalFiles: (state) => state.totalFiles,
  getTotalDirectories: (state) => state.totalDirectories,
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
  async fetchUsers({ commit }) {
    try {
      const response = await this.$axios.get('admin/allUsers');
      if (response) {
        console.log(response);
        commit('LOAD_ALL_USERS', response.data);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  async fetchTotalFiles({ commit }) {
    try {
      const response = await this.$axios.get('admin/statistics');
      if (response) {
        console.log(response);
        commit('LOAD_ALL_FILES', response.data.files);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  async fetchTotalDirectories({ commit }) {
    try {
      const response = await this.$axios.get('admin/statistics');
      if (response) {
        console.log(response);
        commit('LOAD_ALL_DIRECTORIES', response.data.directories);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
  async editUser({ commit }, id) {
    try {
      const response = await this.$axios.patch(`admin/updateUser/${id}`);
      if (response) {
        console.log(response);
        commit('LOAD_ALL_USERS', response.data);
        return Promise.resolve(response.data);
      }
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  },
};

export const mutations = {
  ADD_BREADCRUMB(state, payload) {
    const breadCrumbs = [...state.breadCrumbs];
    // Enable breadcrumbs
    breadCrumbs.forEach((breadCrumb) => {
      breadCrumb.disabled = false;
    });
    breadCrumbs.push(payload);
    // Remove duplicate breadcrumbs
    const filtered = breadCrumbs.filter((el, index, self) => {
      const elIndex = self.findIndex((element) => element.href === el.href);
      return index === elIndex;
    });

    state.breadCrumbs = [...filtered];
  },
  REMOVE_BREADCRUMB(state, payload) {
    const breadCrumbs = [...state.breadCrumbs];
    console.log(payload);
    // Remove current page from breadcrumb
    state.breadCrumbs = [
      ...breadCrumbs.filter((breadCrumb) => breadCrumb.href !== payload),
    ];
    console.log(state.breadCrumbs);
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
    state.allFolders = payload.directories;
  },
  LOAD_ALL_USERS(state, allUsers) {
    state.allUsers = allUsers;
    console.log(state.allUsers);
  },
  LOAD_ALL_FILES(state, files) {
    state.totalFiles = files;
  },
  LOAD_ALL_DIRECTORIES(state, directories) {
    state.totalDirectories = directories;
  },
  //   LOAD_FILES(state, files) {
  //     state.allfiles = files;
  //   }
};
