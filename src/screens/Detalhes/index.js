import React from 'react';
import { View } from 'react-native';

import {
  CaixaDeInformacao,
  Conteudo,
  TextoConteudo,
  TextoLabel,
} from './styles';
import Cabecalho from '../../components/Cabecalho';

const Detalhes = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <View>
      <Cabecalho
        nomeDoIcone="arrow-left"
        texto="Detalhes"
        aoPressionarIcone={() => navigation.goBack()}
      />
      <Conteudo>
        {Object.entries(item).map((item, i) => (
          <CaixaDeInformacao key={item.id || i}>
            <TextoLabel>{item[0]}:</TextoLabel>
            <TextoConteudo>{item[1]}</TextoConteudo>
          </CaixaDeInformacao>
        ))}
      </Conteudo>
    </View>
  );
};

export default Detalhes;
