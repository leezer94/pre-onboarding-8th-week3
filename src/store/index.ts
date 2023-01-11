import { atom } from 'recoil';

const keywordState = atom({
  key: 'keywordState',
  default: '',
});

export { keywordState };
