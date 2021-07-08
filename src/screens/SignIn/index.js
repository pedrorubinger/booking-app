import React from 'react';
import { View } from 'react-native';

import { Container, Content, LogoTitle, SignUpLabel } from './styles';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Label from '../../components/Label';

const SignIn = () => {
  return (
    <Container>
      <Content>
        <LogoTitle>BookingApp</LogoTitle>

        <FormGroup>
          <Label htmlFor="email" color="#FFF">Email</Label>
          <Input id="email" name="email" type="text" placeholder="Email" />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password" color="#FFF">Senha</Label>
          <Input placeholder="Senha" name="password" id="password" type="password" />
        </FormGroup>

        <Button margin="20px 0">Entrar</Button>
      </Content>
      <View>
        <SignUpLabel>Registre-se</SignUpLabel>
      </View>
    </Container>
  );
};

export default SignIn;
