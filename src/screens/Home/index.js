import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { alternarNavegacao } from '../../store/reducers/home-nav';
import { atualizarAmbientes } from '../../store/reducers/ambientes'; 
import { atualizarReservas } from '../../store/reducers/reservas';
import {
  Subtitulo,
  Container,
  ContainerDaMensagem,
  Info,
  Item,
  ListaDeItens,
  TituloDoItem,
  TextoDeListaVazia,
} from './styles';
import Cabecalho from '../../components/Cabecalho';
import NavegacaoHome from '../../components/NavegacaoHome';

const Home = ({ navigation }) => {
  const { user } = useSelector((state) => state.Auth);
  const { listaDeAmbientes } = useSelector((state) => state.Ambientes);
  const { listaDeReservas } = useSelector((state) => state.Reservas);
  const { itemAtivo } = useSelector((state) => state.HomeNav);
  const dispatch = useDispatch();
  const [listaDeMoradores, setListaDeMoradores] = useState(null);
  // const [listaDeMinhasReservas, setListaDeMinhasReservas] = useState(null);
  const listaDeMenus = user?.role === 'resident'
    ? [
        { id: 1, nome: 'Locais Disponíveis' },
        { id: 2, nome: 'Minhas Reservas'  }
      ]
    : [
        { id: 1, nome: 'Ambientes' },
        { id: 2, nome: 'Moradores' },
        { id: 3, nome: 'Reservas' }
      ];

  const buscarAmbientes = () => {
    const db = firebase.firestore();

    db.collection('place')
      .get()
      .then((querySnapshot) => {
        const ambientes = [];

        querySnapshot.forEach((doc) => {
          const ambiente = doc.data();

          if (user?.role === 'resident' && !ambiente.disponivel) {
            return;
          } else {
            ambientes.push({
              id: doc.id,
              ...ambiente,
            });
          }
        });

        dispatch(atualizarAmbientes([...ambientes]));
    }).catch((err) => console.log('Erro ao buscar ambientes:', err));
  };

  const buscarMoradores = () => {
    const db = firebase.firestore();
    const moradores = [];

    db.collection('user').where('role', '==', 'resident')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const morador = doc.data();

          moradores.push({
            id: doc.id,
            ...morador,
          });
        });

        setListaDeMoradores(moradores);
      }).catch((err) => console.log('Erro ao buscar moradores:', err));
  };

  const buscarMinhasReservas = () => {
    const db = firebase.firestore();
    const minhasReservas = [];

    db.collection('reservation')
      .where('resident_email', '==', user.email)
      // .where('')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const reserva = doc.data();

            minhasReservas.push({
              id: doc.id,
              ...reserva
            });
          });

          // setListaDeMinhasReservas(minhasReservas);
          dispatch(atualizarReservas([...minhasReservas]));
        }).catch((err) => console.log('Erro ao buscar minhas reservas:', err));
  };

  const buscarReservas = () => {
    const db = firebase.firestore();
    const reservas = [];

    db.collection('reservation')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const reserva = doc.data();

          reservas.push({
            id: doc.id,
            ...reserva
          });
        });

        dispatch(atualizarReservas([...reservas]));
      }).catch((err) => console.log('Erro ao buscar reservas:', err));
  };

  useEffect(() => {
    buscarAmbientes();

    if (user?.role === 'admin') {
      buscarMoradores();
      buscarReservas();
    }

    if (user?.role === 'resident') {
      buscarMinhasReservas();
    }

    return () => {
      dispatch(alternarNavegacao(1));
    };
  }, []);

  if (!listaDeAmbientes ||
    (user?.role === 'admin' && !listaDeMoradores && !listaDeReservas) ||
    (user?.role === 'resident' && !listaDeReservas)
    // (user?.role === 'resident' && !listaDeMinhasReservas)
  ) {
    return <Text>Carregando dados...</Text>;
  }

  // console.log('listaDeAmbientes:', listaDeAmbientes);
  // console.log('listaDeReservas:', listaDeReservas);
  // console.log('listaDeMoradores:', listaDeMoradores);
  // console.log('listaDeMinhasReservas:', listaDeMinhasReservas);

  const getListagem = () => {
    if (user?.role === 'admin') {
      switch (itemAtivo) {
        case 1:
          return listaDeAmbientes;
        case 2:
          return listaDeMoradores;
        case 3:
          return listaDeReservas;
        default:
          return [];
      }
    }

    switch (itemAtivo) {
      case 1:
        return listaDeAmbientes; // TO DO: Filtrar locais que não estão reservados pelo morador.
      case 2:
        return listaDeReservas;
        // return listaDeMinhasReservas;
      default:
        return [];
    }
  };

  const listagem = getListagem();

  const obterItem = (item) => {
    if (itemAtivo === 1) {
      return (
        <Item
          onPress={() => navigation.navigate('DetalhesAmbiente', {
            item: {
              ID: item.id,
              Nome: item.nome,
              'Está disponível': item.disponivel ? 'Sim' : 'Não',
              Capacidade: `${item.capacidade} pessoas`,
            },
            role: user.role,
          })}
        >
          <TituloDoItem>{item.nome}</TituloDoItem>
          <Info>
            <Feather name="user" color="#FFF" size={16} />
            <Subtitulo margemEsquerda="5px">
              Máx. {item.capacidade} pessoas
            </Subtitulo>
          </Info>
        </Item>
      );
    }

    if (user?.role === 'admin') {
      switch (itemAtivo) {  
        case 2:
          return (
            <Item
              cor="#93827F"
              onPress={() => navigation.navigate('DetalhesMorador', {
                item: {
                  Email: item.email,
                  Nome: item.name,
                  Telefone: item.phone,
                  Apartamento: item.apartment,
                },
              })}
            >
              <TituloDoItem>{item.name}</TituloDoItem>
              <Info>
                <Feather name="home" color="#FFF" size={14} />
                <Subtitulo margemEsquerda="5px">
                  Apartamento {item.apartment}
                </Subtitulo>
              </Info>
            </Item>
          );
        case 3:
          return (
            <Item
              cor="#C94277"
              onPress={() => navigation.navigate('DetalhesReserva', {
                item: {
                  ID: item.id,
                  Morador: item.resident_email,
                  Ambiente: item.place_name,
                  'Data Inicial': item.initial_date,
                  'Data Final': item.end_date,
                },
              })}  
            >
              <TituloDoItem>{item.place_name}</TituloDoItem>
              <Info margemInferior="8px">
                <Feather name="user" color="#FFF" size={16} />
                <Subtitulo margemEsquerda="5px">{item.resident_email}</Subtitulo>
              </Info>
              <Subtitulo>
                <Text style={{ fontWeight: 'bold' }}>De: </Text>
                {item.initial_date}
              </Subtitulo>
              <Subtitulo>
                <Text style={{ fontWeight: 'bold' }}>Até: </Text>
                {item.end_date}
              </Subtitulo>
            </Item>
          );
        default:
          return <Text>Nenhum item.</Text>;
      }
    }

    return (
      <Item
        cor="#F6511D"
        onPress={() => navigation.navigate('DetalhesMinhaReserva', {
          item: {
            ID: item.id,
            Ambiente: item.place_name,
            'Data Inicial': item.initial_date,
            'Data Final': item.end_date,
          },
        })}  
      >
        <TituloDoItem margemInferior="8px">{item.place_name}</TituloDoItem>
        <Subtitulo>
          <Text style={{ fontWeight: 'bold' }}>De: </Text>
          {item.initial_date}
        </Subtitulo>
        <Subtitulo>
          <Text style={{ fontWeight: 'bold' }}>Até: </Text>
          {item.end_date}
        </Subtitulo>
      </Item>
    );
  };

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Cabecalho
        nomeDoIcone="menu"
        texto="Home"
        aoPressionarIcone={() => {
          navigation.toggleDrawer();
        }}
      />
      <NavegacaoHome
        listaDeMenus={listaDeMenus}
        mostrarIconeDeAdicionar={
          !(user?.role === 'admin' && itemAtivo !== 1) &&
          user?.role !== 'resident'
        }
        aoClicarEmAdicionar={() => {
          switch (itemAtivo) {
            case 1:
              return navigation.navigate('FormularioAmbientes', {
                editMode: false,
                dados: null,
              });
            case 3:
              return navigation.navigate('FormularioAmbientes', { // TO DO: Mudar para formulário de reservas
                editMode: false,
                dados: null,
              });
            default:
              return null;
          }
        }}
      />
      {!listagem.length ? (
        <ContainerDaMensagem>
          <TextoDeListaVazia>Não há dados cadastrados ainda.</TextoDeListaVazia>
        </ContainerDaMensagem>
      ) : (
        <ListaDeItens
          numColumns={2}
          data={listagem}
          contentContainerStyle={{ paddingBottom: 30 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => obterItem(item)}
        />
      )}
    </Container>
  );
};

export default Home;
