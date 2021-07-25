import styled from 'styled-components/native';

export const ContainerDeBotoes = styled.View`
  padding: 0 15px;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 20px auto;
  align-items: center;
  justify-content: center;
`;

export const Botao = styled.TouchableOpacity`
  padding: 10px 25px;
  margin-right: 12px;
  border-radius: 6px;
  background-color: ${({ corDoBotao = 'grey' }) => corDoBotao};
`;

export const TextoDoBotao = styled.Text`
  font-size: 16px;
  text-align: center;
  color: #FFF;
`;

export const Conteudo = styled.ScrollView`
  background-color: #FFF;
  border-radius: 5px;
  height: 100%;
  padding: 10px 15px;
`;

export const CaixaDeInformacao = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 14px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ededed;
`;

export const TextoLabel = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-right: 8px;
  color: #b2b2b2;
`;

export const TextoConteudo = styled.Text`
  font-size: 18px;
  color: black;
`;
