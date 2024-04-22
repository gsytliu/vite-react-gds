import { create } from 'zustand';
import { sessionStorage as sess, KEY_ROLE, KEY_SID } from '@/utils/storage';

export const useAuthStore = create<{
  sid: string;
  role: string;
  setSid: (sid: string) => void;
  setRole: (role: string) => void;
}>((set) => ({
  sid: sess.get(KEY_SID) || '',
  setSid: (sid) => {
    set({ sid });
    sess.set(KEY_SID, sid);
  },
  role: sess.get(KEY_ROLE) || '',
  setRole: (role) => {
    set({ role });
    sess.set(KEY_ROLE, role);
  },
}));
