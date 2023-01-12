import SearchIcon from 'components/@commons/Icons/SearchIcon';
import { useSearchBar } from 'hooks';

import * as S from './index.style';

type SearchBarProps = {
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
};

const SearchBar = ({ isFocused, setIsFocused }: SearchBarProps) => {
  const { keywordValue, setKeywordValue } = useSearchBar();

  return (
    <S.Container isFocused={isFocused}>
      {!isFocused && !keywordValue && (
        <SearchIcon
          fill={'gray'}
          css={{
            backgroundColor: 'transparent',
            position: 'relative',
          }}
        />
      )}
      <div>
        <S.Input
          type='text'
          placeholder={isFocused ? '' : '질환명을 입력해 주세요.'}
          value={keywordValue}
          onChange={(e) => setKeywordValue(e.target.value)}
          onFocus={() => setIsFocused(!isFocused)}
          onBlur={() => setIsFocused(!isFocused)}
          autoComplete={'off'}
        />
      </div>
      <S.Button type='button' disabled>
        <SearchIcon fill={'#fff'} css={{ backgroundColor: 'transparent' }} />
      </S.Button>
    </S.Container>
  );
};

export default SearchBar;
