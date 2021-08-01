const types = {
  DEFINIR_AMBIENTES: 'ambientes/DEFINIR_AMBIENTES',
};
const estadoInicial = {
  listaDeAmbientes: []
};

const reducer = (state = estadoInicial, action) => {
  switch(action.type) {
    case types.DEFINIR_AMBIENTES:
      return { ...state, listaDeAmbientes: action.payload };
    default:
      return state;
  }
};

/**
 * @param {Array} listaDeAmbientes - Lista de ambientes existentes.
 */
export const atualizarAmbientes = (listaDeAmbientes) => ({
  type: types.DEFINIR_AMBIENTES,
  payload: listaDeAmbientes,
});

export default reducer;
