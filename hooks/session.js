import { useEffect } from 'react';
import Router from 'next/router';
import useSWR from 'swr';

export function useSession({ redirectTo = false, redirectIfFound = false }) {
  const { data: session, mutate: mutateSession } = useSWR('/api/session');
  useEffect(() => {
    if (!redirectTo || !session) return;
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !session?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && session?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [session, redirectIfFound, redirectTo]);
  return { session, mutateSession };
}
