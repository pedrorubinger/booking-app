import React from 'react';
import { View } from 'react-native';

import Detalhes from '../../components/Detalhes';

const DetalhesMorador = ({ route, navigation }) => {
  const { item } = route.params;
  const botoes = [
    {
      id: 1,
      cor: 'red',
      texto: 'Excluir Morador',
      aoPressionar: () => console.log('clicou para excluir morador.'),
    },
  ];

  return (
    <View>
      <Detalhes item={item} navigation={navigation} botoes={botoes} />
    </View>
  );
};

export default DetalhesMorador;
