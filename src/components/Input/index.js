import React, { forwardRef } from 'react';

import { StyledInput } from './styles';

const Input = ({ ...rest }, ref) => {
  return (
    <StyledInput ref={ref} {...rest} />
  );
};

export default forwardRef(Input);
