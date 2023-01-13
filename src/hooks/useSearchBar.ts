import { SEARCH_DELAY_IN_MS } from 'constant';
import { useRecoilState } from 'recoil';
import { keywordState } from 'store';

import useDebounce from './useDebounce';

const useSearchBar = () => {
  const [keywordValue, setKeywordValue] = useRecoilState(keywordState);
  const debouncedSearchValue = useDebounce(keywordValue, SEARCH_DELAY_IN_MS);

  return { keywordValue, setKeywordValue, debouncedSearchValue };
};

export default useSearchBar;
