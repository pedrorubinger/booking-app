import React from 'react';
import { View } from 'react-native';

import {
  Botao,
  CaixaDeInformacao,
  ContainerDeBotoes,
  Conteudo,
  TextoConteudo,
  TextoDoBotao,
  TextoLabel,
} from './styles';
import Cabecalho from '../Cabecalho';

const Detalhes = ({ item, navigation, botoes }) => {
  return (
    <View>
      <Cabecalho
        nomeDoIcone="arrow-left"
        texto="Detalhes"
        aoPressionarIcone={() => navigation.goBack()}
      />

      {!!botoes?.length && (
        <ContainerDeBotoes>
          {botoes.map((botao, i) => (
            <Botao
              key={botao.id || i}
              corDoBotao={botao.cor}
              onPress={botao.aoPressionar}
            >
              <TextoDoBotao>{botao.texto}</TextoDoBotao>
            </Botao>
          ))}
        </ContainerDeBotoes>
      )}

      <Conteudo>
        {Object.entries(item)
          .map((element, i) => (
            <CaixaDeInformacao key={element.id || i}>
              <TextoLabel>{element[0]}:</TextoLabel>
              <TextoConteudo>{element[1]}</TextoConteudo>
            </CaixaDeInformacao>
          ))
        }
      </Conteudo>
    </View>
  );
};

export default Detalhes;
