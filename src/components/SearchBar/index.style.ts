import styled from 'styled-components';

const Container = styled.div<{ isFocused: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 490px;
  height: 73.69px;
  padding: 20px 5px 20px 20px;

  background-color: ${({ theme }) => theme.white};
  border-radius: 42px;
  border: ${({ isFocused, theme }) =>
    isFocused ? `2px solid ${theme.blue}` : 'none'};

  font-size: 16px;
`;

const Input = styled.input`
  width: 396px;
  height: 30px;

  font-size: 20px;
  padding: 10px;

  background-color: ${({ theme }) => theme.white};

  border: none;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: gray;
  }
`;

const Button = styled.button`
  width: 48px;
  height: 48px;

  background-color: ${({ theme }) => theme.blue};

  border-radius: 50px;
  border: none;
`;

export { Container, Input, Button };
