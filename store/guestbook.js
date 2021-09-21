import axios from 'axios';
export default function guestbook(store) {
  store.on('@init', () => ({
    guestbook: {
      data: null,
      currentPage: 1,
      nextPage: 2,
      pageIndex: 1,
      loading: true,
      error: false
    }
  }));
  store.on('guestbook/state', ({ guestbook }, merged) => ({
    guestbook: { ...guestbook, ...merged }
  }));
  store.on('guestbook/refresh', () => {
    store.dispatch('guestbook/fetch');
  });
  store.on('guestbook/fetch', async ({ guestbook }) => {
    store.dispatch('guestbook/state', {
      loading: true,
      error: false
    });
    try {
      const { currentPage } = guestbook;
      const { data } = await axios.get(`/api/guestbook?page${currentPage}`, {
        timeout: 10000
      });
      if (!data?.success) throw new Error('Failed to load data');
      store.dispatch('guestbook/state', { data: data.data });
    } catch (error) {
      store.dispatch('guestbook/state', { error });
    } finally {
      store.dispatch('guestbook/state', { loading: false });
    }
  });
  store.on('guestbook/insert', async (_, payload) => {
    try {
      const { data } = await axios.post(`/api/guestbook`, payload);
      if (data?.success) {
        store.dispatch('guestbook/fetch');
      } else {
        console.log(data)
        alert('Message Not Submited. Try Again.')
      }
    } catch (e) {
      console.error(e);
    }
  })
}
