import { withSession } from '@/libs/session';

async function handler(req, res) {
  const currentUser = req.session.get('user');
  if (!currentUser) return res.json({ success: false, msg: 'You are not loggedIn' });
  return res.json(currentUser);
}
export default withSession(handler);
