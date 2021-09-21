import { createStoreon } from 'storeon';
import guestbook from './guestbook';
import session from './session';

export default createStoreon([guestbook, session]);
