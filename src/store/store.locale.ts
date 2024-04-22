import { create } from 'zustand';
import { localStorage, KEY_LOCALE } from '@/utils/storage';

type Locales = 'zh' | 'en';

export const useLocaleStore = create<{
  locale: Locales;
  setLocale: (l: Locales) => void;
}>((set) => ({
  locale: localStorage.get(KEY_LOCALE) || 'en',
  setLocale: (l) => {
    set({
      locale: l,
    });
    localStorage.set(KEY_LOCALE, l);
  },
}));
