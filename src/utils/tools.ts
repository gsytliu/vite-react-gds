export { deepClone } from './deepClone';
/**
 * 判断类型
 */
export const isType = (
  target: any,
  type:
    | 'String'
    | 'Boolean'
    | 'Array'
    | 'Object'
    | 'Function'
    | 'Number'
    | 'Null'
    | 'Undefined'
    | 'Set'
    | 'Map',
) => {
  if (!type) return false;
  return Object.prototype.toString.call(target) === `[object ${type}]`;
};

export const noop = () => void 0;

// 等待点时间
export const wait = (n = 0): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, n) as any;
  });
};
