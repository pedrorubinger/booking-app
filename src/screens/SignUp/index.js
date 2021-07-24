import React from 'react';
import firebase from 'firebase/app';
import { TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { Container, LogoTitle, SignInLabel } from './styles';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Label from '../../components/Label';
import MensagemDeErro from '../../components/MensagemDeErro';

const esquemaDeRegistro = Yup.object().shape({
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(esquemaDeRegistro),
    mode: 'onBlur',
  });

  const registrarUsuario = async (dados) => {
    try {
      const db = firebase.firestore();

      await db.runTransaction(async (transaction) => {
        const userRef = db.collection('user').doc(dados.email);

        await firebase
          .auth()
          .createUserWithEmailAndPassword(dados.email, dados.password);
        transaction.set(userRef, {
          email: dados.email,
          role: 'resident',
          apartment: dados.apartment,
          name: dados.name,
          phone: dados.phone,
        });
      });

      await navigation.navigate('SignIn');
    } catch (error) {
      console.log('>>>> erro ao registrar usuário:', error);
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
              secureTextEntry
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

      <Button
        margin="20px 0"
        onPress={handleSubmit(registrarUsuario)}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
      </Button>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <SignInLabel>Voltar para Login</SignInLabel>
      </TouchableOpacity>
    </Container>
  );
};

export default SignUp;
