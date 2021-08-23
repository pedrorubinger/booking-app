import React from 'react';

import { BotaoEstilizado, TextoEstilizado } from './styles';

const Botao = (props) => {
  const { children, color, disabled, backgroundColor, margin, ...rest } = props;

  return (
    <BotaoEstilizado
      backgroundColor={backgroundColor}
      margin={margin}
      disabled={disabled}
      {...rest}
    >
      <TextoEstilizado color={color}>{children}</TextoEstilizado>
    </BotaoEstilizado>
  );
};

export default Botao;
