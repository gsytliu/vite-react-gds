import axios from 'axios';
import { sessionStorage, KEY_TL } from '@/utils/storage';

export let TEMPLATE: TlLvlItem[] =
  sessionStorage.get<TlLvlItem[]>(KEY_TL) || [];

const tlKeys = ['status', 'acct'];

// 获取 template
export const loadTemplate = async () => {
  try {
    const data = await Promise.all(
      tlKeys.map(async (k) => {
        const res = await axios.get(`/template/tl.${k}.json?${_STAMP_}`);
        return res.data;
      }),
    );
    TEMPLATE = data;
    sessionStorage.set(KEY_TL, data);
  } catch (e) {
    throw e;
  }
};
