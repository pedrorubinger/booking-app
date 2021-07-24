import React from 'react';
import { Feather } from '@expo/vector-icons';

import { Container, Texto } from './styles';
import { View } from 'react-native';

const Cabecalho = ({
  nomeDoIcone,
  cor = '#FFF',
  tamanho = 25,
  texto,
  aoPressionarIcone,
}) => {
  return (
    <Container>
      <Feather
        name={nomeDoIcone}
        color={cor}
        size={tamanho}
        onPress={aoPressionarIcone}
      />
      <View style={{ flex: 1 }}>
        <Texto cor={cor}>{texto}</Texto>
      </View>
    </Container>
  );
};

export default Cabecalho;
