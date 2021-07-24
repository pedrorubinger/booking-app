import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #457B9D;
  padding: 0 10px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Texto = styled.Text`
  text-align: center;
  color: ${({ cor }) => cor || '#000'};
  font-size: 20px;
`;
