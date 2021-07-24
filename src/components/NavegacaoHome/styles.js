import styled from 'styled-components/native';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto 15px;
  margin-top: 20px;
`;

export const Lista = styled.FlatList``;

export const Item = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  margin-right: ${({ margemDireita }) => margemDireita ? '20px' : '0px'};
`;

export const TextoDeItem = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ estaAtivo }) => estaAtivo ? '#1D3557' : '#A3A1A1'};
`;
