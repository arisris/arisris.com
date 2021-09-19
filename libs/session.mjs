import { withIronSession, ironSession } from 'next-iron-session';

export const config = () => ({
  password: process.env.APP_SECRET_KEY,
  cookieName: 'arisris_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
});
export const sessionMiddleware = ironSession(config());
export const withSession = (handler) => withIronSession(handler, config());
