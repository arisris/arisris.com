import axios from 'axios';

export const events = {
  REFRESH: 'guestbook/refresh',
  STATE: 'guestbook/state',
  FETCH: 'guestbook/refresh',
  INSERT: 'guestbook/insert',
  DELETE: 'guestbook/delete'
};

export default function guestbook(store) {
  store.on('@init', () => ({
    guestbook: {
      data: null,
      currentPage: 1,
      nextPage: 2,
      pageIndex: 1,
      loading: true,
      error: false,
      events
    }
  }));
  store.on(events.STATE, ({ guestbook }, merged) => ({
    guestbook: { ...guestbook, ...merged }
  }));
  store.on(events.REFRESH, () => {
    store.dispatch(events.FETCH);
  });
  store.on('guestbook/fetch', async ({ guestbook }) => {
    store.dispatch(events.STATE, {
      loading: true,
      error: false
    });
    try {
      const { currentPage } = guestbook;
      const { data } = await axios.get(`/api/guestbook?page=${currentPage}`, {
        timeout: 10000
      });
      if (!data?.success) throw new Error('Failed to load data');
      let out = data.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      store.dispatch(events.STATE, { data: out });
    } catch (error) {
      store.dispatch(events.STATE, { error });
    } finally {
      store.dispatch(events.STATE, { loading: false });
    }
  });
  store.on(events.INSERT, async (_, payload) => {
    try {
      const { data } = await axios.post(`/api/guestbook`, payload);
      if (data?.success) {
        store.dispatch(events.FETCH);
      } else {
        alert('Message Not Submited. Try Again.');
      }
    } catch (e) {
      console.error(e);
    }
  });
  store.on(events.DELETE, async ({ guestbook, session }, key) => {
    try {
      const { data } = await axios.delete(`/api/guestbook`, { key });
      if (data?.success) {
        store.dispatch(events.FETCH);
      } else {
        alert('Message not deleted.');
      }
    } catch (e) {
      console.error(e);
    }
  });
}
