import React from 'react';
import { View } from 'react-native';

import { StyledFormGroup } from './styles.js';

const FormGroup = ({ children }) => {
  return (
    <StyledFormGroup>
      {children}
    </StyledFormGroup>
  );
};

export default FormGroup;
