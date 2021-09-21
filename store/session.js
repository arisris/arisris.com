import Router from 'next/router';
import axios from 'axios';

export default function session(store) {
  store.on('@init', () => {
    // preload session data on initialize
    store.dispatch('session/login');
  });
  store.on(
    'session/state',
    ({ session = { isLoggedIn: false, currentUser: null } }, merged) => ({
      session: { ...session, ...merged }
    })
  );

  store.on('session/login', async ({ session }, val) => {
    const params = {};
    const redirectTo = val?.redirectTo;
    const redirectIfAuth = val?.redirectIfAuth;
    if (val?.code) {
      params.code = val.code;
    }
    try {
      const { data: currentUser } = await axios.get(`/api/session`, { params });
      if (currentUser?.success) {
        store.dispatch('session/state', {
          isLoggedIn: true,
          currentUser: currentUser.user
        });
        if (redirectIfAuth && redirectTo) {
          Router.push(redirectTo);
        }
      } else {
        if (redirectTo) {
          Router.push(redirectTo);
        }
      }
    } catch (e) {}
  });
  store.on('session/logout', async (_, val) => {
    const redirectTo = val?.redirectTo;
    try {
      const { data } = await axios.delete(`/api/session`);
      if (data?.success) {
        console.log(data);
        store.dispatch('session/state', { isLoggedIn: false });
      }
    } catch (e) {
    } finally {
      if (redirectTo) {
        Router.push(redirectTo);
      }
    }
  });
  //store.on('session/login', () => {});
}
