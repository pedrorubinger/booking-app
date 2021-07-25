import React from 'react';
import { View } from 'react-native';

import Detalhes from '../../components/Detalhes';

const DetalhesReserva = ({ route, navigation }) => {
  const { item } = route.params;
  // const botoes = [
  //   {
  //     id: 1,
  //     cor: 'red',
  //     texto: 'Cancelar Reserva',
  //     aoPressionar: () => console.log('clicou para cancear reserva.'),
  //   },
  // ];

  return (
    <View>
      <Detalhes item={item} navigation={navigation} />
    </View>
  );
};

export default DetalhesReserva;
