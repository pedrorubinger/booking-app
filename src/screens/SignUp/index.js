import React from 'react';
import { View } from 'react-native';

import { Container, Content, LogoTitle, SignInLabel } from './styles';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Label from '../../components/Label';

const SignUp = () => {
  return (
    <Container>
      <Content>
        <LogoTitle>BookingApp</LogoTitle>

        <FormGroup>
          <Label htmlFor="email" color="#FFF" required>Email</Label>
          <Input id="email" name="email" type="text" placeholder="Email" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="name" color="#FFF" required>Nome</Label>
          <Input id="name" name="name" type="text" placeholder="name" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="phone" color="#FFF" required>Telefone</Label>
          <Input id="phone" name="phone" type="text" placeholder="phone" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="apartment" color="#FFF" required>Apartamento</Label>
          <Input
            id="apartment"
            name="apartment"
            type="text"
            placeholder="apartment"
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password" color="#FFF" required>Senha</Label>
          <Input placeholder="Senha" name="password" id="password" type="password" />
        </FormGroup>

        <Button margin="20px 0">Cadastrar</Button>
      </Content>
      <View>
        <SignInLabel>Voltar para Login</SignInLabel>
      </View>
    </Container>
  );
};

export default SignUp;
