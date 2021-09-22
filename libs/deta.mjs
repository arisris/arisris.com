import { Deta } from 'deta';

const spaces = ['guestbook', 'posts'].reduce(
  (a, i) => ((a[i] = `${i}_${process.env.NODE_ENV}`), a),
  {}
);
export const deta = Deta(process.env.DETA_PROJECT_KEY);
export const guestbookBase = deta.Base(spaces.guestbook);
export const postsBase = deta.Base(spaces.posts);
