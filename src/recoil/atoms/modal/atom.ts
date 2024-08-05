import { atom } from 'recoil';

export const modalAtom = atom({
  key: 'modalState',
  default: {
    isOpen: false,
    content: null||'',
  },
});