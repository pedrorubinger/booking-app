import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

import { alternarNavegacao } from '../../store/reducers/home-nav';
import {
  Capacidade,
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
import fotoAcademia from '../../../assets/academia.jpg';

const ambientesTemporarios = [
  { id: 1, nome: 'Academia 01', capacidade: 25, imagem: fotoAcademia },
  { id: 2, nome: 'Piscina 02', capacidade: 20, imagem: fotoAcademia },
  { id: 3, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 4, nome: 'Sauna 02', capacidade: 10, imagem: fotoAcademia },
  { id: 5, nome: 'Sauna 03', capacidade: 10, imagem: fotoAcademia },
  { id: 6, nome: 'Churrasqueira 01', capacidade: 10, imagem: fotoAcademia },
  { id: 7, nome: 'Churrasqueira 02', capacidade: 10, imagem: fotoAcademia },
  { id: 8, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 9, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 10, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 11, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 12, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 13, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 14, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 15, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 16, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 17, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
  { id: 18, nome: 'Sauna 01', capacidade: 10, imagem: fotoAcademia },
];
const reservasTemporarias = [];

const Home = () => {
  const { user } = useSelector((state) => state.Auth);
  const { itemAtivo } = useSelector((state) => state.HomeNav);
  const dispatch = useDispatch();
  const listaDeMenus = user.role === 'resident'
    ? [
        { id: 1, nome: 'Ambientes' },
        { id: 2, nome: 'Minhas Reservas'  }
      ]
    : [
        { id: 1, nome: 'Ambientes' },
        { id: 2, nome: 'Moradores'  }
      ];

  useEffect(() => {
    return () => {
      dispatch(alternarNavegacao(1));
    };
  }, []);

  const listagem = itemAtivo === 1 ? ambientesTemporarios : reservasTemporarias;

  return (
    <Container>
      <Cabecalho
        nomeDoIcone="menu"
        texto="Home"
        aoPressionarIcone={() => console.log('pressionou o ícone do header!')}
      />
      <NavegacaoHome listaDeMenus={listaDeMenus} />
      {!listagem.length ? (
        <ContainerDaMensagem>
          <TextoDeListaVazia>Não há dados cadastrados ainda.</TextoDeListaVazia>
        </ContainerDaMensagem>
      ) : (
        <ListaDeItens
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          data={listagem}
          contentContainerStyle={{ paddingBottom: 30 }}
          renderItem={({ item }) => (
            <Item url={item.imagem}>
              {/* <ImageBackground
                source={item.imagem}
                style={{ width: 100, height: 100, borderRadius: 5 }}
              >
              </ImageBackground> */}
              <TituloDoItem>{item.nome}</TituloDoItem>
              <Info>
                <Feather name="user" color="#FFF" size={16} />
                <Capacidade>{item.capacidade}</Capacidade>
              </Info>
            </Item>
          )}
        />
      )}
    </Container>
  );
};

export default Home;
