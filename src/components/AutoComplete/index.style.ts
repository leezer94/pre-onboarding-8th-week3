import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 490px;
  max-height: 420px;

  margin-top: 10px;
  padding: 10px 20px;

  border-radius: 20px;
  border: none;

  background: ${({ theme }) => theme.white};
`;

const SearchKeywordContainer = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  background-color: transparent;
`;

const SearchKeyword = styled.span`
  font-size: 20px;
  font-weight: bold;

  padding: 10px;
  margin-bottom: 5px;

  background-color: transparent;
`;

const ListContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  height: 30px;

  background-color: transparent;
`;

const SearchResult = styled.span`
  background-color: transparent;

  padding-left: 10px;
  font-size: 20px;
`;

const RecommendedKeyword = styled.span`
  margin-left: 20px;
  background: transparent;

  color: ${({ theme }) => theme.gray};
`;

export {
  Wrapper,
  SearchKeywordContainer,
  SearchKeyword,
  SearchResult,
  ListContainer,
  RecommendedKeyword,
};
