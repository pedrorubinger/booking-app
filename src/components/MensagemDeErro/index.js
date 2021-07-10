import React from 'react';

import { MensagemCustomizada } from './styles.js';

const MensagemDeErro = ({ message = 'Dados inválidos!' }) => {
  return (
    <MensagemCustomizada>{message}</MensagemCustomizada>
  );
};

export default MensagemDeErro;
