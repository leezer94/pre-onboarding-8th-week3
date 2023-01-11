import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyles } from 'styles';

import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ThemeProvider>,
);
