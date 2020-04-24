// import UserService from '../services/UserService';
// import Config from '../services/Config';

export const state = () => ({
  // user: UserService.getUserFromLocalStorage(),
  // token_details: UserService.getTokenFromLocalStorage(),
  allfiles: [],
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
  //   LOAD_FILES(state, files) {
  //     state.allfiles = files;
  //   }
};
