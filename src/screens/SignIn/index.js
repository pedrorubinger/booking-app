import React from 'react';
import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import 'firebase/firestore';

import { Container, Content, LogoTitle, SignUpLabel } from './styles';
import { setUser } from '../../store/reducers/auth';
import Botao from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Label from '../../components/Label';
import MensagemDeErro from '../../components/MensagemDeErro';

const esquemaDeLogin = Yup.object().shape({
  email: Yup.string()
    .email('Você precisa informar um email válido!')
    .required('Insira um email!'),
  password: Yup.string().required('Informe uma senha!'),
});

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(esquemaDeLogin),
    mode: 'onBlur',
  });

  const entrar = async (dados) => {
    try {
      const db = firebase.firestore();
      const docRef = db.collection("user").doc(dados.email);
      const doc = await docRef.get();

      if (doc.exists) {
        const credenciais = await firebase
          .auth()
          .signInWithEmailAndPassword(dados.email, dados.password);
        const user = { ...doc.data(), token: credenciais.user };

        dispatch(setUser(user));
        await AsyncStorage.setItem(
          '@storage_key',
          JSON.stringify(credenciais.user)
        );
      } else throw new Error();
    } catch (error) {
      /** TO DO: Implementar error handling... */
      console.log('Erro ao autenticar:', error);
    }
  };

  return (
    <Container>
      <Content>
        <LogoTitle>BookingApp</LogoTitle>

        <FormGroup>
          <Label htmlFor="email" color="#FFF">Email</Label>
          <Controller
            control={control}
            defaultValue=""
            name="email"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                onChangeText={(value) => field.onChange(value)}
                id="email"
                name="email"
                placeholder="Email"
                hasError={!!errors?.email}
              />
            )}
          />
          {!!errors?.email && <MensagemDeErro message={errors?.email?.message} />}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password" color="#FFF">Senha</Label>
          <Controller
            control={control}
            defaultValue=""
            name="password"
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                secureTextEntry
                onChangeText={(value) => field.onChange(value)}
                id="password"
                name="password"
                placeholder="Senha"
                hasError={!!errors?.password}
              />
            )}
          />
          {!!errors?.password && (
            <MensagemDeErro message={errors?.password?.message} />
          )}
        </FormGroup>

        <Botao
          disabled={isSubmitting}
          margin="20px 0"
          onPress={handleSubmit(entrar)}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Botao>
      </Content>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <SignUpLabel>Registrar-se</SignUpLabel>
      </TouchableOpacity>
    </Container>
  );
};

export default SignIn;
