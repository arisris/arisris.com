import Router from 'next/router';
import axios from 'axios';

export const events = {
  LOGIN: 'session/login',
  LOGOUT: 'session/logout',
  STATE: 'session/state'
};

export default function session(store) {
  store.on('@init', () => {
    // preload session data on initialize
    store.dispatch(events.LOGIN);
  });
  store.on(
    events.STATE,
    ({ session = { isLoggedIn: false, currentUser: null } }, merged) => ({
      session: { ...session, ...merged }
    })
  );

  store.on(events.LOGIN, async ({ session }, val) => {
    const params = {};
    const redirectTo = val?.redirectTo;
    const redirectIfAuth = val?.redirectIfAuth;
    if (val?.code) {
      params.code = val.code;
    }
    try {
      const { data: currentUser } = await axios.get(`/api/session`, { params });
      if (currentUser?.success) {
        store.dispatch(events.STATE, {
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
  store.on(events.LOGOUT, async (_, val) => {
    const redirectTo = val?.redirectTo;
    try {
      const { data } = await axios.delete(`/api/session`);
      if (data?.success) {
        console.log(data);
        store.dispatch(events.STATE, { isLoggedIn: false });
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
