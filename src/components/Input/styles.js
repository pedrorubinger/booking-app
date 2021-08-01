import styled from 'styled-components/native';

export const StyledInput = styled.TextInput`
  background-color: ${({ corDeFundo }) => corDeFundo || '#FFFFFF'};
  border-radius: 6px;
  height: 40px;
  padding: 10px 15px;
`;
