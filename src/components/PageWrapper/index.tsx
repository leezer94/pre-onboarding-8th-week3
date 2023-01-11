import { ReactNode } from 'react';

import PageWrapper from './index.style';

const Wrapper = ({ children }: { children: ReactNode }) => {
  return <PageWrapper>{children}</PageWrapper>;
};

export default Wrapper;
