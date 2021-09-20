import axios from 'axios';

export const postCommand = (...cmd) =>
  axios.post(
    `${process.env.UPSTASH_REST_URL}${cmd.length > 1 ? '/pipeline' : ''}`,
    cmd.length > 1 ? cmd : cmd[0],
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.UPSTASH_REST_TOKEN}`
      }
    }
  );
