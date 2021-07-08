import React from 'react';

import { StyledLabel, RequiredSpan } from './styles';

const Label = (props) => {
  const { children, required, color, ...rest } = props;

  return (
    <StyledLabel color={color} {...rest}>
      {children}
      {!!required && <RequiredSpan> *</RequiredSpan>}
    </StyledLabel>
  );
};

export default Label;
