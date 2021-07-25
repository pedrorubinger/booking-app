import React from 'react';
import { View } from 'react-native';

import Detalhes from '../../components/Detalhes';

const DetalhesAmbiente = ({ route, navigation }) => {
  const { item, role } = route.params;
  const botoes = role === 'admin'
    ? [
        {
          id: 1,
          cor: 'orange',
          texto: 'Editar Ambiente',
          aoPressionar: () => console.log('clicou para editar ambiente.'),
        },
        {
          id: 2,
          cor: 'red',
          texto: 'Excluir Ambiente',
          aoPressionar: () => console.log('clicou para excluir ambiente.'),
        }
      ]
    : [
        {
          id: 1,
          cor: 'green',
          texto: 'Reservar Ambiente',
          aoPressionar: () => console.log('Clicou para reservar.'),
        }
      ]

  return (
    <View>
      <Detalhes item={item} navigation={navigation} botoes={botoes} />
    </View>
  );
};

export default DetalhesAmbiente;
