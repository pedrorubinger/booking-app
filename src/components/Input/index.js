import React, { forwardRef } from 'react';

import { StyledInput } from './styles';

const Input = ({ corDeFundo, ...rest }, ref) => {
  return (
    <StyledInput ref={ref} corDeFundo={corDeFundo} {...rest} />
  );
};

export default forwardRef(Input);
