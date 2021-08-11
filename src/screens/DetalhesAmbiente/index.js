import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';

import { atualizarAmbientes } from '../../store/reducers/ambientes';
import { atualizarReservas } from '../../store/reducers/reservas';
import Detalhes from '../../components/Detalhes';

const DetalhesAmbiente = ({ route, navigation }) => {
  const { item, role } = route.params;
  const { user } = useSelector((state) => state.Auth);
  const { listaDeAmbientes } = useSelector((state) => state.Ambientes);
  const { listaDeReservas } = useSelector((state) => state.Reservas);
  const [carregando, setCarregando] = useState(false);
  const dispatch = useDispatch();

  console.log('item:', item);
  console.log('user:', user);

  const aoExcluirAmbiente = () => {
    const id = item.ID;

    if (!id) {
      return null;
    }

    Alert.alert(
      'Você tem certeza?',
      'Este ambiente e todas as reservas associadas a ele serão permanentemente excluídas.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            setCarregando(true);

            const db = firebase.firestore();

            db.collection('place').doc(id).delete().then(async () => {
              await db
                .collection('reservation')
                .where('place_id', '==', id)
                .get()
                  .then((querySnapshot) => {
                    querySnapshot.forEach(async (doc) => {
                      await db.collection('reservation').doc(doc.id).delete();
                    });
                  })

              const listaDeAmbientesAtualizada = [...listaDeAmbientes]
                .filter((item) => item.id !== id);
              const listaDeReservasAtualizada = [...listaDeReservas]
                .filter((item) => item.place_id !== id);

              dispatch(atualizarAmbientes(listaDeAmbientesAtualizada));
              dispatch(atualizarReservas(listaDeReservasAtualizada));
              navigation.navigate('DrawerNav', { screen: 'Home' });
            }).catch((err) => {
              console.error('Erro ao excluir ambiente:', err);
            });

            setCarregando(false);
          },
        },
      ]
    );
  };

  const botoes = role === 'admin'
    ? [
        {
          id: 1,
          cor: 'orange',
          texto: 'Editar Ambiente',
          aoPressionar: () =>
            navigation.navigate('FormularioAmbientes', {
              editMode: true,
              dados: item,
            }),
        },
        {
          id: 2,
          cor: 'red',
          texto: carregando ? 'Excluindo...' : 'Excluir Ambiente',
          desativado: carregando,
          aoPressionar: () => aoExcluirAmbiente(),
        }
      ]
    : [
        {
          id: 1,
          cor: 'green',
          texto: carregando ? 'Reservando...' : 'Reservar Ambiente',
          desativado: carregando,
          aoPressionar: () => navigation.navigate('FormularioReserva', {
            dados: item,
          }),
        }
      ]

  return (
    <View>
      <Detalhes
        item={item}
        navigation={navigation} botoes={botoes}
      />
    </View>
  );
};

export default DetalhesAmbiente;
