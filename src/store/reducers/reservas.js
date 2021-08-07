const types = {
  DEFINIR_RESERVAS: 'reservas/DEFINIR_RESERVAS',
};
const estadoInicial = {
  listaDeReservas: []
};

const reducer = (state = estadoInicial, action) => {
  switch(action.type) {
    case types.DEFINIR_RESERVAS:
      return { ...state, listaDeReservas: action.payload };
    default:
      return state;
  }
};

/**
 * @param {Array} listaDeReservas - Lista de reservas existentes.
 */
export const atualizarReservas = (listaDeReservas) => ({
  type: types.DEFINIR_RESERVAS,
  payload: listaDeReservas,
});

export default reducer;
