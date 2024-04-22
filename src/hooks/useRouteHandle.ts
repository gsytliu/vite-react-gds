import { useMatches } from 'react-router-dom';

type HandleType = {
  tab?: string;
  menu: string[];
};

export const useRouteHandle = (): HandleType => {
  const matches = useMatches();
  const { handle } = matches.reduce(
    (prev, cur) => {
      return {
        handle: { ...prev.handle, ...(cur.handle || {}) },
      };
    },
    { handle: { menu: ['STATUS'] } },
  );

  return handle;
};
