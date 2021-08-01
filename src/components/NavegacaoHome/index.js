import React from 'react';
import { Feather } from '@expo/vector-icons';

import { Container, Lista, Item, TextoDeItem } from './styles';
import { alternarNavegacao } from '../../store/reducers/home-nav';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native';

const NavegacaoHome = ({
  aoClicarEmAdicionar,
  listaDeMenus,
  mostrarIconeDeAdicionar,
}) => {
  const { itemAtivo } = useSelector((state) => state.HomeNav);
  const dispatch = useDispatch();

  if (!listaDeMenus?.length) {
    return null;
  }

  return (
    <Container>
      <Lista
        numColumns={listaDeMenus.length}
        data={listaDeMenus}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Item
            key={item.id || index}
            onPress={() => {
              if (item.id !== itemAtivo) {
                dispatch(alternarNavegacao(item.id));
              }
            }}
          >
            <TextoDeItem estaAtivo={item.id === itemAtivo}>
              {item.nome}
            </TextoDeItem>
          </Item>
        )}
      /> 
      {mostrarIconeDeAdicionar && (
        <TouchableOpacity onPress={aoClicarEmAdicionar}>
          <Feather name="plus-circle" color="green" size={25} />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default NavegacaoHome;
