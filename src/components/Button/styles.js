import styled from 'styled-components/native';

export const BotaoEstilizado = styled.TouchableOpacity`
  background-color: ${({ backgroundColor }) => backgroundColor || '#1D3557'};
  padding: 10px;
  border-radius: 5px;
  opacity: ${({ disabled }) => disabled ? .5 : 1};
  margin: ${({ margin }) => margin || '15px 0px'};
`;

export const TextoEstilizado = styled.Text`
  color: ${({ color }) => color || '#FFF'};
  text-align: center;
  font-size: 20px;
`;
