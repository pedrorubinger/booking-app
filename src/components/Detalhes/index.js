import React from 'react';
import { Text, View } from 'react-native';

import { Conteudo } from './styles';
import Cabecalho from '../../components/Cabecalho';

const VisualizarItem = () => {
  return (
    <View>
      <Cabecalho
        nomeDoIcone="arrow-left"
        texto="Detalhes"
        aoPressionarIcone={() => console.log('pressionou o ícone do header!')}
      />
      <Conteudo>
        <Text>Teste</Text>
      </Conteudo>
    </View>
  );
};

export default VisualizarItem;
