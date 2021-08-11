import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import firebase from 'firebase/app';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { View } from 'react-native';

import { atualizarReservas } from '../../store/reducers/reservas';
import { Conteudo } from './styles';
import Botao from '../Button';
import Cabecalho from '../Cabecalho';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Label from '../Label';
import MensagemDeErro from '../MensagemDeErro';

const validacaoReserva = Yup.object().shape({
  initial_date: Yup.string().required('Insira a data inicial!'),
  end_date: Yup.string().required('Insira a data final!'),
});

const FormularioReserva = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.Auth);
  const { listaDeReservas } = useSelector((state) => state.Reservas);
  const { dados } = route.params;
  const dispatch = useDispatch();

  console.log('dados:', dados);
  console.log('user:', user.email);

  const aoEnviar = (valores) => {
    console.log('valores:', valores);

    const db = firebase.firestore();
    const dadosFormatados = {
      place_id: dados.ID,
      resident_email: user.email,
      place_name: dados.Nome,
      initial_date: valores.initial_date,
      end_date: valores.end_date,
    };

    db.collection('reservation').add(dadosFormatados)
      .then(() => {
        // IMPLEMENTAR OBJETO CRIADO...
        dispatch(atualizarReservas([...listaDeReservas]));
        navigation.navigate('DrawerNav', { screen: 'Home' });
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
              <DateTimePicker
                testID="dateTimePicker"
                value={field.value || new Date()}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={(value) => field.onChange(value)}
              />
            )}}
          />
          {!!errors?.initial_date && (
            <MensagemDeErro message={errors?.initial_date?.message} />
          )}
        </FormGroup>

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
                placeholder="Data Final"
                hasError={!!errors?.end_date}
              />
            )}
          />
          {!!errors?.end_date && (
            <MensagemDeErro message={errors?.end_date?.message} />
          )}
        </FormGroup>

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
