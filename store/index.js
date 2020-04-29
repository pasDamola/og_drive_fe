// import UserService from '../services/UserService';
// import Config from '../services/Config';
export const state = () => ({
  // user: UserService.getUserFromLocalStorage(),
  // token_details: UserService.getTokenFromLocalStorage(),
  allFiles: [],
  allFolders: [],
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
  //   LOAD_FILES(state, files) {
  //     state.allfiles = files;
  //   }
};
