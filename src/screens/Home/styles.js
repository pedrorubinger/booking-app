import styled from 'styled-components/native';

export const Container = styled.View`
  background-color: #F4F2F2;
  height: 100%;
`;

export const ListaDeItens = styled.FlatList`
  background-color: #FFF;
  margin-top: 20px;
  padding: 15px;
`;

export const ContainerDaMensagem = styled.View`
  background-color: #FFF;
  margin-top: 20px;
  padding: 15px;
  flex: 1;
`;

export const TextoDeListaVazia = styled.Text`
  text-align: center;
  color: grey;
`;

export const Item = styled.TouchableOpacity`
  background-color: ${({ cor = '#90be6d' }) => cor};
  margin: 7px 5px;
  padding: 10px;
  display: flex;
  width: 170px;
  align-self: flex-start;
  border-radius: 8px;
`;

export const TituloDoItem = styled.Text`
  color: #FFF;
  font-weight: bold;
  font-size: 17px;
  margin-bottom: ${({ margemInferior = '0px'}) => margemInferior};
`;

export const Info = styled.View`
  margin-top: 5px;
  margin-bottom: ${({ margemInferior = '0px'}) => margemInferior};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Subtitulo = styled.Text`
  color: #FFF;
  margin-left: ${({ margemEsquerda = '0px' }) => margemEsquerda};
`;
