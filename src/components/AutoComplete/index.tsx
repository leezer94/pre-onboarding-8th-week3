import SearchIcon from 'components/@commons/Icons/SearchIcon';
import LoadingSpinner from 'components/@commons/Spinner';
import { useAxiosGet, useSearchBar, useKeyboardNavigation } from 'hooks';
import { useState, useEffect } from 'react';
import { replaceStringToBoldedString } from 'utils';

import * as S from './index.style';

const AutoComplete = () => {
  const [currentHoverItem, setCurrentHoverItem] = useState<string>('');
  const { keywordValue, debouncedSearchValue } = useSearchBar();
  const { data: searchResults, isLoading } = useAxiosGet(debouncedSearchValue);

  const [cursor, setCursor] = useState<number>(0);

  const downPress = useKeyboardNavigation('ArrowDown');
  const upPress = useKeyboardNavigation('ArrowUp');

  useEffect(() => {
    if (searchResults?.length && downPress) {
      setCursor((prevState) =>
        prevState < searchResults?.length - 1 ? prevState + 1 : prevState,
      );
    }
  }, [downPress]);

  useEffect(() => {
    if (searchResults?.length && upPress) {
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress]);

  useEffect(() => {
    if (searchResults?.length && currentHoverItem) {
      const matchIndex = searchResults?.findIndex(
        ({ sickCd }) => sickCd === currentHoverItem,
      );

      setCursor(matchIndex);
    }
  }, [currentHoverItem]);

  if (isLoading)
    return (
      <S.Wrapper>
        <S.SearchKeywordContainer>
          <LoadingSpinner size='25px' />
          <span>정보를 가져오고 있습니다....</span>
        </S.SearchKeywordContainer>
      </S.Wrapper>
    );

  // 컴포넌트의 분리가 필요

  return (
    <S.Wrapper id='autoComplete'>
      {keywordValue && (
        <S.SearchKeywordContainer>
          <SearchIcon
            fill={'gray'}
            css={{
              backgroundColor: 'transparent',
              margin: '0 10px 0 20px',
            }}
          />
          <S.SearchKeyword>{keywordValue}</S.SearchKeyword>
        </S.SearchKeywordContainer>
      )}
      {!keywordValue && searchResults?.length === 0 ? (
        <S.RecommendedKeyword>최근 검색어</S.RecommendedKeyword>
      ) : keywordValue && searchResults?.length !== 0 ? (
        <S.RecommendedKeyword>추천 검색어</S.RecommendedKeyword>
      ) : (
        <S.RecommendedKeyword>검색어 없음</S.RecommendedKeyword>
      )}
      {/*  TODO: 검색어 없는 경우 케이스 다시 검증되어야 함 , 작은 컴폰넌트로 분리*/}
      <div style={{ overflow: 'auto', width: '100%' }}>
        {searchResults?.map(
          ({ sickCd, sickNm }: { sickCd: string; sickNm: string }, idx) => (
            <S.ListContainer
              key={sickCd}
              id={sickCd}
              currentHoverItem={currentHoverItem}
              active={idx === cursor}
            >
              <SearchIcon
                fill={'gray'}
                css={{
                  backgroundColor: 'transparent',
                  position: 'relative',
                }}
                size={'18px'}
              />
              <S.SearchResult
                dangerouslySetInnerHTML={{
                  __html: replaceStringToBoldedString(sickNm, keywordValue),
                }}
                onMouseOver={() => {
                  setCurrentHoverItem(sickCd);
                  setCursor(idx);
                }}
              ></S.SearchResult>
            </S.ListContainer>
          ),
        )}
      </div>
    </S.Wrapper>
  );
};

export default AutoComplete;
