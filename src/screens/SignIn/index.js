import React from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Content, LogoTitle, SignUpLabel } from './styles';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Label from '../../components/Label';

const SignIn = ({ navigation }) => {
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

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <SignUpLabel>Registre-se</SignUpLabel>
      </TouchableOpacity>
    </Container>
  );
};

export default SignIn;
