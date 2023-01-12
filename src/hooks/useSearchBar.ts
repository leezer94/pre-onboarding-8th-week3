import { useRecoilState } from 'recoil';
import { keywordState } from 'store';

import useDebounce from './useDebounce';

const useSearchBar = () => {
  const [keywordValue, setKeywordValue] = useRecoilState(keywordState);
  const debouncedSearchValue = useDebounce(keywordValue, 150);

  return { keywordValue, setKeywordValue, debouncedSearchValue };
};

export default useSearchBar;
