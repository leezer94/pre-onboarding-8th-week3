import Wrapper from 'components/@commons/PageWrapper';
import AutoComplete from 'components/AutoComplete';
import SearchBar from 'components/SearchBar';
import { TITLE } from 'constant';
import { useState } from 'react';

const Home = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Wrapper>
      <h1
        dangerouslySetInnerHTML={{
          __html: TITLE,
        }}
        style={{ marginBottom: '20px' }}
      ></h1>
      <SearchBar isFocused={isFocused} setIsFocused={setIsFocused} />
      {isFocused && <AutoComplete />}
    </Wrapper>
  );
};

export default Home;
