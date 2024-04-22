import { useRef } from 'react';
import { useMount } from 'ahooks';

export const useEl = <T extends Element = Element>(selector: string) => {
  const elRef = useRef<T | null>(document.querySelector<T>(selector));

  useMount(() => {
    !elRef.current && (elRef.current = document.querySelector<T>(selector));
  });

  return elRef.current;
};
