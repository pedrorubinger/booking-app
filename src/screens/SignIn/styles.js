import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  display: flex;
  padding: 0 20px;
  padding-top: 35px;
  height: 100%;
  background-color: #457B9D;
  justify-content: center;
`;

export const Content = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
`;

export const SignUpLabel = styled.Text`
  color: #FFF;
  text-align: center;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: bold;
`;

export const LogoTitle = styled.Text`
  /* font-family: 'Qwigley'; */
  color: #FFFFFF;
  font-size: 40px;
  text-align: center;
  margin-bottom: 15px;
`;
