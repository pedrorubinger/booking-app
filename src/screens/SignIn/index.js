import React from 'react';
import firebase from 'firebase/app';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TouchableOpacity } from 'react-native';
import * as Yup from 'yup';

import { Container, Content, LogoTitle, SignUpLabel } from './styles';
import Button from '../../components/Button';
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(esquemaDeLogin),
    mode: 'onBlur',
  });

  const entrar = async (dados) => {
    console.log('submeteu:', dados);

    try {
      const credenciais = await firebase
        .auth().signInWithEmailAndPassword(dados.email, dados.password);
        // .createUserWithEmailAndPassword(dados.email, dados.password);

      console.log('credenciais:', credenciais);
    } catch (error) {
      console.log('Erro ao autenticar:', error);
      /** TO DO: Estruturar e armazenar no reducer... */
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
                withShadow
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
                placeholder="password"
                hasError={!!errors?.password}
                withShadow
              />
            )}
          />
          {!!errors?.password && (
            <MensagemDeErro message={errors?.password?.message} />
          )}
        </FormGroup>

        <Button margin="20px 0" onPress={handleSubmit(entrar)}>Entrar</Button>
      </Content>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <SignUpLabel>Registrar-se</SignUpLabel>
      </TouchableOpacity>
    </Container>
  );
};

export default SignIn;
