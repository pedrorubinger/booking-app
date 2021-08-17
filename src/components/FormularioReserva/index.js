import React from 'react';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { atualizarAmbientes } from '../../store/reducers/ambientes';
import { atualizarReservas } from '../../store/reducers/reservas';
import { Conteudo } from './styles';
import Botao from '../Button';
import Cabecalho from '../Cabecalho';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import MensagemDeErro from '../MensagemDeErro';

const FormularioReserva = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.Auth);
  const { listaDeReservas } = useSelector((state) => state.Reservas);
  const { listaDeAmbientes } = useSelector((state) => state.Ambientes);
  const { dados } = route.params;
  const dispatch = useDispatch();
  const validacaoReserva = Yup.object().shape({
    initial_date: Yup.string().required('Insira a data inicial!'),
    // initial_time: Yup.string().required('Insira o horário de início!'),
    end_date: Yup.string().required('Insira a data final!'),
    // end_time: Yup.string().required('Insira o horário de término!'),
  });

  // console.log('listaDeReservas:', listaDeReservas);
  // console.log('dados:', dados);
  // console.log('user:', user.email);

  const aoEnviar = (valores) => {
    console.log('valores:', valores);

    const db = firebase.firestore();
    const dadosFormatados = {
      place_id: dados.ID,
      resident_email: user.email,
      place_name: dados.Nome,
      initial_date: valores.initial_date,
      end_date: valores.end_date,
      // initial_time: valores.initial_time,
      // end_time: valores.end_time,
    };

    db.collection('reservation').add(dadosFormatados)
      .then((ambienteCriado) => {
        db.collection('place')
          .doc(dados.ID)
          .set({ disponivel: false }, { merge: true })
            .then(() => {
              dispatch(atualizarReservas([
                ...listaDeReservas,
                { ...dadosFormatados, id: ambienteCriado.id }
              ]));
              dispatch(atualizarAmbientes([...listaDeAmbientes].filter((item) => item.id !== dados.ID)));
              navigation.navigate('DrawerNav', { screen: 'Home' })
            }).catch((err) => {
              console.log('err:', err);
            });
      })
      .catch((err) => {
        console.log('Erro ao reservar ambiente:', err);
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validacaoReserva),
    mode: 'onBlur',
  });

  return (
    <View>
      <Cabecalho
        nomeDoIcone="arrow-left"
        texto="Reservar Ambiente"
        aoPressionarIcone={() => navigation.goBack()}
      />

      <Conteudo>
        <FormGroup>
          <Label htmlFor="initial_date" color="#545252" required>
            Data Inicial:
          </Label>
          <Controller
            control={control}
            defaultValue=""
            name="initial_date"
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  type="text"
                  onChangeText={(value) => field.onChange(value)}
                  id="initial_date"
                  name="initial_date"
                  mask="99/99/9999"
                  placeholder="DD/MM/AAAA"
                  maxLength={10}
                  keyboardType="numeric"
                  hasError={!!errors?.initial_date}
                  hasMask
                />
            )}}
          />
          {!!errors?.initial_date && (
            <MensagemDeErro message={errors?.initial_date?.message} />
          )}
        </FormGroup>

        {/* <FormGroup>
          <Label htmlFor="initial_time" color="#545252" required>
            Horário Inicial:
          </Label>
          <Controller
            control={control}
            defaultValue=""
            name="initial_time"
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  type="text"
                  onChangeText={(value) => field.onChange(value)}
                  id="initial_time"
                  name="initial_time"
                  mask="99:99"
                  placeholder="HH:MM"
                  maxLength={5}
                  keyboardType="numeric"
                  hasError={!!errors?.initial_time}
                  hasMask
                />
            )}}
          />
          {!!errors?.initial_time && (
            <MensagemDeErro message={errors?.initial_time?.message} />
          )}
        </FormGroup> */}

        <FormGroup>
          <Label htmlFor="end_date" color="#545252" required>
            Data Final
          </Label>
          <Controller
            control={control}
            defaultValue=""
            name="end_date"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                onChangeText={(value) => field.onChange(value)}
                id="end_date"
                name="end_date"
                placeholder="DD/MM/AAAA"
                hasError={!!errors?.end_date}
                mask="99/99/9999"
                maxLength={10}
                keyboardType="numeric"
                hasMask
              />
            )}
          />
          {!!errors?.end_date && (
            <MensagemDeErro message={errors?.end_date?.message} />
          )}
        </FormGroup>

        {/* <FormGroup>
          <Label htmlFor="end_time" color="#545252" required>
            Horário Final:
          </Label>
          <Controller
            control={control}
            defaultValue=""
            name="end_time"
            render={({ field }) => {
              return (
                <Input
                  {...field}
                  type="text"
                  onChangeText={(value) => field.onChange(value)}
                  id="end_time"
                  name="end_time"
                  mask="99:99"
                  placeholder="HH:MM"
                  maxLength={5}
                  keyboardType="numeric"
                  hasError={!!errors?.end_time}
                  hasMask
                />
            )}}
          />
          {!!errors?.end_time && (
            <MensagemDeErro message={errors?.end_time?.message} />
          )}
        </FormGroup> */}

        <Botao
          disabled={isSubmitting}
          margin="20px 0"
          onPress={handleSubmit(aoEnviar)}
        >
          {isSubmitting ? 'Reservando...' : 'Reservar'}
        </Botao>
      </Conteudo>
    </View>
  );
};

export default FormularioReserva;
