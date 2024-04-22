import { create } from 'zustand';

type SearchTarget = null | {
  lang: string;
  name?: string;
};

export const useSearchStore = create<{
  target: SearchTarget;
  setTarget: (t: SearchTarget) => void;
}>((set) => ({
  target: null,
  setTarget: (t) => {
    set({ target: t });
  },
}));
