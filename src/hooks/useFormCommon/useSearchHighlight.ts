import { useUnmount } from 'ahooks';
import { useSearchStore } from '@/store';
import { useTemplate } from './useTemplate';
import { deepClone } from '@/utils/tools';

type TL<T extends AnyKey> = ReturnType<typeof useTemplate<T>>;

type TLwithShl<T extends AnyKey> = {
  [i in keyof TL<T>]: TL<T>[i] & { shl?: boolean };
};

export const useSearchHighlight = <T extends AnyKey>(
  tl: TL<T>,
): TLwithShl<T> => {
  const { target, setTarget } = useSearchStore();

  useUnmount(() => {
    target && setTarget(null);
  });

  if (!target) {
    return tl;
  }
  for (const key in tl) {
    if (tl[key]?.name === target.name) {
      const _tl = deepClone(tl);
      _tl[key] = { ..._tl[key], shl: true };
      return _tl;
    }
  }
  return tl;
};
