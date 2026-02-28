import { useSyncExternalStore } from 'react';

import { isLogged as isLoggedAuth } from '@/utils/auth';

const emitAuthChange = (() => {
  const listeners = new Set<() => void>();

  if (typeof window !== 'undefined') {
    window.addEventListener('focus', () => listeners.forEach((l) => l()));
    document.addEventListener('visibilitychange', () => listeners.forEach((l) => l()));
  }

  return (cb: () => void) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  };
})();

const useIsLogged = () =>
  useSyncExternalStore(
    emitAuthChange,
    () => isLoggedAuth(),  // client snapshot
    () => false,           // server snapshot — always false to match SSR HTML
  );

export default useIsLogged;
