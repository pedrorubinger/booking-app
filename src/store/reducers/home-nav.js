const types = {
  ALTERNAR_NAVEGACAO: 'home-nav/ALTERNAR_NAVEGACAO',
};
const estadoInicial = {
  itemAtivo: 1,
};

const reducer = (state = estadoInicial, action) => {
  switch(action.type) {
    case types.ALTERNAR_NAVEGACAO:
      return { ...state, itemAtivo: action.payload };
    default:
      return state;
  }
};

/**
 * 
 * @param {Number} itemAtivo - Id (Integer) do item de navegação ativo.
 */
export const alternarNavegacao = (itemAtivo) => ({
  type: types.ALTERNAR_NAVEGACAO,
  payload: itemAtivo,
});

export default reducer;
