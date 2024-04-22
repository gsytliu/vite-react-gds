import { useMemo } from 'react';
import { useGetAccess } from '../useGetAccess';
import { TEMPLATE } from '@/template';

// 通过lvl级别字符串查找对应模块页面的配置项
const findLevel = (
  lvl: string[],
  target: TlLvlItem[],
): TlFieldItem[] | undefined => {
  if (lvl.length === 0) {
    return target as unknown as TlFieldItem[];
  }
  const L = lvl.shift();
  for (let i = 0; i < target.length; i++) {
    const tmp = target[i];
    if (tmp.lvl === L) {
      if (lvl.length > 0 && !tmp.sub) {
        throw new Error(
          'The level configuration item could not be found.[err1]',
        );
      }
      return findLevel(lvl, tmp.sub as TlLvlItem[]);
    }
    if (i === target.length - 1) {
      throw new Error('The level configuration item could not be found.[err2]');
    }
  }
};

export const useTemplate = <T extends AnyKey = string>(lvl: string) => {
  const { getAccess } = useGetAccess();
  const tl = useMemo(() => {
    const res = {} as Record<
      T,
      Omit<TlFieldItem, 'access'> & { isAccess: boolean }
    >;
    const tmp = findLevel(lvl.split('.'), TEMPLATE) || [];
    tmp.forEach((item) => {
      const { name, access, opts, ...rest } = item;

      res[name] = {
        name,
        isAccess: getAccess(access),
        ...rest,
      };
      if (opts) {
        res[name]['opts'] = opts.filter((item) => getAccess(item.access));
      }
    });

    return res;
  }, [getAccess, lvl]);

  return tl;
};
