import { atom } from 'recoil';

const searchTermState = atom({
  key: 'searchTermState',
  default: '',
});

const genreFilterState = atom({
  key: 'genreFilterState',
  default: '',
});

const loginState = atom({
  key: 'loginState',
  default: '',
});

const borrowState = atom({
  key: 'borrowState',
  default: '',
});

export { searchTermState, genreFilterState, loginState, borrowState };
