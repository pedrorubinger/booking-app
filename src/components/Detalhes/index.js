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
              disabled={botao.desativado}
              onPress={botao.aoPressionar}
              hasMarginRight={i === 0 && botoes.length > 1}
            >
              <TextoDoBotao desativado={botao.desativado}>
                {botao.texto}
              </TextoDoBotao>
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
