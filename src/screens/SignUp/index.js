import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Content, LogoTitle, SignInLabel } from './styles';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Label from '../../components/Label';

const SignUp = ({ navigation }) => {
  return (
    <Container
      contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <Content>
        <LogoTitle>BookingApp</LogoTitle>

        <FormGroup>
          <Label htmlFor="email" color="#FFF">Email</Label>
          <Input id="email" name="email" type="text" placeholder="Email" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="name" color="#FFF">Nome</Label>
          <Input id="name" name="name" type="text" placeholder="Nome" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone" color="#FFF">Telefone</Label>
          <Input id="phone" name="phone" type="text" placeholder="Telefone" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="apartment" color="#FFF">Apartamento</Label>
          <Input
            id="apartment"
            name="apartment"
            type="text"
            placeholder="Apartmento"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password" color="#FFF">Senha</Label>
          <Input placeholder="Senha" name="password" id="password" type="password" />
        </FormGroup>

        <Button margin="20px 0">Cadastrar</Button>
      </Content>

      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <SignInLabel>Voltar para Login</SignInLabel>
      </TouchableOpacity>
    </Container>
  );
};

export default SignUp;
