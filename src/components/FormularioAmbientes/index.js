import React from 'react';
import { Alert, View } from 'react-native';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { atualizarAmbientes } from '../../store/reducers/ambientes';
import { atualizarReservas } from '../../store/reducers/reservas';
import Botao from '../Button';
import Cabecalho from '../Cabecalho';
import { Conteudo } from './styles';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import MensagemDeErro from '../MensagemDeErro';

const validacaoAmbiente = Yup.object().shape({
  nome: Yup.string().required('Insira o nome do ambiente!'),
  capacidade: Yup.string()
    .required('Insira a capacidade do ambiente!')
    .matches(/^\d+$/, 'Deve ser um número!')
});

const FormularioAmbientes = ({ navigation, route }) => {
  const { dados, editMode } = route.params;
  const { listaDeAmbientes } = useSelector((state) => state.Ambientes);
  const { listaDeReservas } = useSelector((state) => state.Reservas);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validacaoAmbiente),
    mode: 'onBlur',
  });

  const obterTextoDoBotao = () => {
    if (editMode) {
      return isSubmitting ? 'Salvando...' : 'Salvar';
    }

    return isSubmitting ? 'Cadastrando...' : 'Cadastrar';
  };

  const gerenciarEnvio = async (valores) => {
    const db = firebase.firestore();

    if (editMode && dados) {
      const valoresFormatados = {
        disponivel: !![true, 'sim', 'Sim'].includes(dados['Está disponível']),
        nome: valores.nome,
        capacidade: valores.capacidade,
      };

      await db.collection('place').doc(dados.ID).set(valoresFormatados)
        .then(() => {
          const listaDeAmbientesAtt = [...listaDeAmbientes].map((item) => {
            if (item.id === dados.ID) {
              return { id: dados.ID, ...valoresFormatados };
            }

            return item;
          });

          dispatch(atualizarAmbientes(listaDeAmbientesAtt));
          navigation.navigate('DrawerNav', { screen: 'Home' });
        })
        .catch(() => {
          Alert.alert(
            'Erro!',
            'Não foi possível atualizar este ambiente!',
            [
              { text: 'OK' }
            ]
          );
        });

      await db.collection('reservation').where('place_id', '==', dados.ID).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            db.collection('reservation').doc(doc.id).update({
              place_name: valores.nome,
            })
            .then(() => {})
            .catch(() => {
              throw new Error();
            });
          });
        })
        .catch(() => {
          Alert.alert(
            'Erro!',
            'Não foi possível atualizar este ambiente!',
            [
              { text: 'OK' }
            ]
          );
        });

      const listaDeReservasAtt = [...listaDeReservas].map((item) => {
        if (item.place_id === dados.ID) {
          return { ...item, place_name: valores.nome };
        }

        return item;
      });

      dispatch(atualizarReservas(listaDeReservasAtt));
    } else {
      const valoresFormatados = {
        disponivel: true,
        nome: valores.nome,
        capacidade: valores.capacidade,
      };

      db.collection('place').add(valoresFormatados)
        .then((ambienteCriado) => {
          dispatch(
            atualizarAmbientes(
              [...listaDeAmbientes,
                {
                  id: ambienteCriado.id,
                  ...valoresFormatados,
                }
            ])
          );
          navigation.navigate('DrawerNav', { screen: 'Home' });
        })
        .catch(() => {
          Alert.alert(
            'Erro!',
            'Não foi possível cadastrar este ambiente!',
            [
              { text: 'OK' }
            ]
          );
        });
    }
  };

  return (
    <View>
      <Cabecalho
        nomeDoIcone="arrow-left"
        texto={editMode ? 'Editar Ambiente' : 'Novo Ambiente'}
        aoPressionarIcone={() => navigation.goBack()}
      />

      <Conteudo>
        <FormGroup>
          <Label htmlFor="nome" color="#545252" required>Nome</Label>
          <Controller
            control={control}
            defaultValue={editMode && dados ? dados.Nome : ''}
            name="nome"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                onChangeText={(value) => field.onChange(value)}
                id="nome"
                name="nome"
                placeholder="Nome do Ambiente"
                hasError={!!errors?.nome}
              />
            )}
          />
          {!!errors?.nome && <MensagemDeErro message={errors?.nome?.message} />}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="capacidade" color="#545252" required>
            Capacidade Máxima (pessoas)
          </Label>
          <Controller
            control={control}
            defaultValue={editMode && dados
              ? dados.Capacidade.split(' ')[0]
              : ''
            }
            name="capacidade"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                onChangeText={(value) => field.onChange(value)}
                id="capacidade"
                name="capacidade"
                placeholder="Capacidade"
                hasError={!!errors?.capacidade}
              />
            )}
          />
          {!!errors?.capacidade && (
            <MensagemDeErro message={errors?.capacidade?.message} />
          )}
        </FormGroup>

        <Botao
          disabled={isSubmitting}
          margin="20px 0"
          onPress={handleSubmit(gerenciarEnvio)}
        >
          {obterTextoDoBotao()}
        </Botao>
      </Conteudo>
    </View>
  );
};

export default FormularioAmbientes;
