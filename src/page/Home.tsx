import SearchBar from 'components/SearchBar';
import Title from 'components/Title';
import { TITLE } from 'constant';

import Wrapper from '../components/PageWrapper';

const Home = () => {
  return (
    <Wrapper>
      <Title title={TITLE} />
      <SearchBar />
    </Wrapper>
  );
};

export default Home;
