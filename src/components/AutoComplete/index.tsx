import SearchIcon from 'components/Icons/SearchIcon';
import useAxiosGet from 'hooks/useAxiosGet';
import useSearchBar from 'hooks/useSearchBar';
import { useState } from 'react';
import { replaceStringToBoldedString } from 'utils';

import * as S from './index.style';

const AutoComplete = () => {
  const [currentHoverItem, setCurrentHoverItem] = useState('');
  const { keywordValue, debouncedSearchValue } = useSearchBar();
  const { data: searchResults, isLoading } = useAxiosGet(debouncedSearchValue);

  if (isLoading)
    return (
      <S.Wrapper>
        <div>Spinner...</div>
      </S.Wrapper>
    );

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
      {!keywordValue && searchResults.length === 0 ? (
        <S.RecommendedKeyword>최근 검색어</S.RecommendedKeyword>
      ) : keywordValue && searchResults.length !== 0 ? (
        <S.RecommendedKeyword>추천 검색어</S.RecommendedKeyword>
      ) : (
        <S.RecommendedKeyword>검색어 없음</S.RecommendedKeyword>
      )}
      {/*  TODO: 검색어 없는 경우 케이스 다시 검증되어야 함 , 작은 컴폰넌트로 분리*/}
      <div style={{ overflow: 'auto', width: '100%' }}>
        {searchResults.map(
          ({ sickCd, sickNm }: { sickCd: string; sickNm: string }) => (
            <S.ListContainer
              key={sickCd}
              id={sickCd}
              currentHoverItem={currentHoverItem}
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
                onMouseOver={() => setCurrentHoverItem(sickCd)}
              ></S.SearchResult>
            </S.ListContainer>
          ),
        )}
      </div>
    </S.Wrapper>
  );
};

export default AutoComplete;
