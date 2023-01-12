import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div<{ size: string; speed: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};

  border: 5px solid ${({ theme }) => theme.lightgrey};
  border-top: 5px solid ${({ theme }) => theme.blue};
  border-radius: 50%;

  animation: ${rotate} ${({ speed }) => speed} linear infinite;

  background-color: 'transparent';
  margin: 0 10px 0 20px;
`;

export default Spinner;
