// Contains settings including endpoints, mutations, localstorage settings ...

let base_url = 'https://whenbackendteam.is.done/';
let users_endpoint = `${base_url}User/`;
let files_enpoint = `${base_url}Files/`;

const Config = {
  local_storage: {
    user: 'og-user',
    token: 'og-token-details',
  },

  end_points: {
    signup: `${users_endpoint}signup`,
    login: `${users_endpoint}login`,
    getFiles: `${files_enpoint}files`,
  },
};

export default Config;
