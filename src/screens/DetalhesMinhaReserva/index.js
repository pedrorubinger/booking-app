import React from 'react';
import { Alert, View } from 'react-native';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';

import { atualizarAmbientes } from '../../store/reducers/ambientes';
import { atualizarReservas } from '../../store/reducers/reservas';
import Detalhes from '../../components/Detalhes';

const DetalhesMinhaReserva = ({ route, navigation }) => {
  const { item, place_id } = route.params;
  const { listaDeReservas } = useSelector((state) => state.Reservas);
  const { listaDeAmbientes } = useSelector((state) => state.Ambientes);
  const dispatch = useDispatch();

  const botoes = [
    {
      id: 1,
      cor: 'red',
      texto: 'Cancelar Reserva',
      aoPressionar: async () => {
        Alert.alert(
          'Você tem certeza?',
          'Tem certeza que deseja cancelar sua reserva?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'OK',
              onPress: () => {
                const db = firebase.firestore();

                db.collection('reservation')
                  .doc(item.ID)
                  .delete()
                  .then(() => {
                    db.collection('place').doc(place_id).set({
                      disponivel: true,
                    }, { merge: true })
                      .then(() => {
                        const reservasAtualizadas = [...listaDeReservas].filter(
                          (res) => res.id !== item.ID
                        );
                        db.collection('place').doc(place_id)
                          .get()
                          .then((doc) => {
                            const ambiente = doc.data();
                            const ambientesAtualizados = [
                              ...listaDeAmbientes,
                              { ...ambiente, id: place_id }
                            ];

                            dispatch(atualizarReservas(reservasAtualizadas));
                            dispatch(atualizarAmbientes(ambientesAtualizados));
                            navigation.navigate('DrawerNav', {
                              screen: 'Home',
                            });
                          });
                      });
                  });
              },
            },
          ]
        );
      },
    },
  ];

  return (
    <View>
      <Detalhes item={item} navigation={navigation} botoes={botoes} />
    </View>
  );
};

export default DetalhesMinhaReserva;
