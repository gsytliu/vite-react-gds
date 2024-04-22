/* eslint-disable eqeqeq */
import { useCallback } from 'react';
import { useDefineStore } from '@/store';

const matchReg = /^(.*)(==|>=|<=|!=|>)(.*)$/;

export const calAccess = (payload: AccessType, curStatus: any) => {
  if (typeof payload === 'boolean') {
    return payload;
  }
  if (typeof payload === 'string') {
    // 正式计算
    let [, key, symbol, value] = payload.match(matchReg)!;
    key = key.trim();
    value = value.trim();
    switch (symbol) {
      case '==':
        return curStatus[key] == value;
      case '!=':
        return curStatus[key] != value;
      case '>':
        return +curStatus[key] > +value;
      case '>=':
        return +curStatus[key] >= +value;
      case '<=':
        return +curStatus[key] <= +value;
      default:
        return true;
    }
  } else if (Array.isArray(payload)) {
    // 数组则继续递归
    let _payload = payload.slice();
    let logic = _payload.shift();

    switch (logic) {
      case '$and':
        return _payload.reduce((result: any, current: any) => {
          return result && calAccess(current, curStatus);
        }, true);
      case '$or':
        return _payload.reduce((result: any, current: any) => {
          return result || calAccess(current, curStatus);
        }, false);
      default:
        return true;
    }
  }

  return true;
};

// 不响应 react组件外使用
export const isAccess = ({
  access,
}: {
  access: AccessType;
  [i: string]: any;
}) => {
  const { define } = useDefineStore.getState();
  return calAccess(access, define) as boolean;
};

// 响应 react组件内使用
export const useGetAccess = () => {
  const define = useDefineStore((state) => state.define);
  const getAccess = useCallback(
    (access: AccessType) => calAccess(access, define) as boolean,
    [define],
  );
  return { getAccess };
};
