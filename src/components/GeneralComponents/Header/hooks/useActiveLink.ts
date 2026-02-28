import { useEffect, useRef } from 'react';

const useActiveLink = (pathname: string) => {
  const navRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const activeLink = navRef.current?.querySelector<HTMLAnchorElement>(`a[href="${pathname}"]`);
    if (!activeLink || !navRef.current || !dividerRef.current || !activeRef.current) { return; }

    const linkRect = activeLink.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    const dividerRect = dividerRef.current.getBoundingClientRect();
    const left = navRect.left - dividerRect.left + (linkRect.left - navRect.left);

    activeRef.current.style.width = `${linkRect.width}px`;
    activeRef.current.style.left = `${left}px`;
  }, [pathname]);

  return { navRef, dividerRef, activeRef };
};

export default useActiveLink;
