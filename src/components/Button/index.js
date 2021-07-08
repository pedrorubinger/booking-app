import React from 'react';

import { StyledButton, StyledText } from './styles';

const Button = (props) => {
  const { children, color, backgroundColor, margin, ...rest } = props;

  return (
    <StyledButton
      backgroundColor={backgroundColor}
      margin={margin}
      {...rest}
    >
      <StyledText color={color}>{children}</StyledText>
    </StyledButton>
  );
};

export default Button;
