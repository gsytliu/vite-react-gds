import { create } from 'zustand';
import { localStorage, KEY_DEFINE } from '@/utils/storage';

export interface DefineParams {
  role: string;
  product: string;
  oem: string;
}

interface DefineStoreAttrs {
  define: DefineParams;
  setDefine: (payload: Partial<DefineParams>) => void;
}

const needUpdate = (prev: DefineParams, payload: Partial<DefineParams>) => {
  for (let i in payload) {
    if (payload[i] !== prev[i]) {
      return true;
    }
  }
  return false;
};

export const useDefineStore = create<DefineStoreAttrs>((set, get) => ({
  define: localStorage.get(KEY_DEFINE) || {
    role: '',
    product: '',
    oem: '',
  },
  setDefine: (payload) => {
    // 做个优化，payload如果值完全和旧值一致则无需更新
    const prev = get().define;
    if (!needUpdate(prev, payload)) {
      return false;
    }

    const next = Object.assign({}, prev, payload);
    set({
      define: next,
    });
    localStorage.set(KEY_DEFINE, next);
  },
}));
