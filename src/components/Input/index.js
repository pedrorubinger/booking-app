import React, { forwardRef } from 'react';
import { MaskedTextInput} from 'react-native-mask-text';

import { StyledInput } from './styles';

const Input = ({ corDeFundo, hasMask, hasError, ...rest }, ref) => {
  if (hasMask) {
    return (
      <MaskedTextInput
        ref={ref}
        style={{
          backgroundColor: corDeFundo || '#FFFFFF',
          height: 40,
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 6,
          borderColor: hasError ? 'red' : '#FFF'
        }}
        {...rest}
      />
    );
  }

  return (
    <StyledInput
      ref={ref}
      corDeFundo={corDeFundo}
      {...rest} />
  );
};

export default forwardRef(Input);
