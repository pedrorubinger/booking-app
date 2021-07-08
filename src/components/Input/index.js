import React from 'react';

import { StyledInput } from './styles';

const Input = (props) => {
  const { value = '', ...rest } = props;

  return (
    <StyledInput value={value} {...rest} />
  );
};

export default Input;
