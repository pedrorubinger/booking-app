import styled from 'styled-components/native';

export const StyledLabel = styled.Text`
  font-size: 13px;
  color: ${({ color }) => color || '#4f4f4f'};
  margin: 8px 0;
`;

export const RequiredSpan = styled.Text`
  color: red;
`;
