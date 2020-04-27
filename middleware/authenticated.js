export default function ({ app, store, redirect }) {
  if (!store.getters.isLoggedIn(app)) {
    redirect('/login');
  }
}
