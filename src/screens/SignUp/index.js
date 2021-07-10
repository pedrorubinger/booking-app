import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Container, LogoTitle, SignInLabel } from './styles';
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
  apartment: Yup.string().required('Informe um apartamento!'),
  name: Yup.string().required('Informe o nome!'),
  phone: Yup.string().required('Informe o telefone!')
});

const SignUp = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(esquemaDeLogin),
    mode: 'onBlur',
  });
  const [submitting, setSubmitting] = useState(false);

  const registrarUsuario = async (dados) => {
    try {
      console.log('submitting:', submitting);
      setSubmitting(true);
      console.log('dados:', dados);

      const credencial = await firebase
        .auth()
        .createUserWithEmailAndPassword(dados.email, dados.password);

      console.log('credencial:', credencial);
      navigation.navigate('SignIn');
    } catch (error) {
      console.log('erro ao registrar usuário:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
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
        <Label htmlFor="name" color="#FFF">Nome</Label>
        <Controller
          control={control}
          defaultValue=""
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              onChangeText={(value) => field.onChange(value)}
              id="name"
              name="name"
              placeholder="Nome"
              hasError={!!errors?.name}
            />
          )}
        />
        {!!errors?.name && <MensagemDeErro message={errors?.name?.message} />}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="phone" color="#FFF">Telefone</Label>
        <Controller
          control={control}
          defaultValue=""
          name="phone"
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              onChangeText={(value) => field.onChange(value)}
              id="phone"
              name="phone"
              placeholder="Telefone"
              hasError={!!errors?.phone}
              withShadow
            />
          )}
        />
        {!!errors?.phone && <MensagemDeErro message={errors?.phone?.message} />}
      </FormGroup>

      <FormGroup>
        <Label htmlFor="apartment" color="#FFF">Apartamento</Label>
        <Controller
          control={control}
          defaultValue=""
          name="apartment"
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              onChangeText={(value) => field.onChange(value)}
              id="apartment"
              name="apartment"
              placeholder="Apartamento"
              hasError={!!errors?.apartment}
              withShadow
            />
          )}
        />
        {!!errors?.apartment && (
          <MensagemDeErro message={errors?.apartment?.message} />
        )}
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
              onChangeText={(value) => field.onChange(value)}
              id="password"
              name="password"
              placeholder="Senha"
              hasError={!!errors?.password}
              withShadow
            />
          )}
        />
        {!!errors?.password && (
          <MensagemDeErro message={errors?.password?.message} />
        )}
      </FormGroup>

      <Button margin="20px 0" onPress={handleSubmit(registrarUsuario)}>
        Cadastrar
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <SignInLabel>Voltar para Login</SignInLabel>
      </TouchableOpacity>
    </Container>
  );
};

export default SignUp;
