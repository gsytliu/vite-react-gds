import { useFormCore, type Fields } from './useFormCore';
import { useSearchHighlight } from './useSearchHighlight';
import { useTemplate } from './useTemplate';

export const useFormCommon = <F extends Fields, T extends AnyKey = keyof F>(
  tlPath: string,
  initLoading?: boolean,
) => {
  const _tl = useTemplate<T>(tlPath);
  const formCores = useFormCore<F>({} as F, initLoading); // todo 默认值, 此处需优化{}

  const tl = useSearchHighlight<T>(_tl);

  return {
    tl,
    ...formCores,
  };
};
