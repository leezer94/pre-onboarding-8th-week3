import { SearchIcon } from 'components/Icons';
import { useState } from 'react';

import * as S from './index.style';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <S.Container isFocused={isFocused}>
      {!isFocused && (
        <SearchIcon fill={'gray'} css={{ backgroundColor: 'transparent' }} />
      )}
      <div>
        <S.Input
          type='text'
          placeholder={isFocused ? '' : '질환명을 입력해 주세요.'}
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
