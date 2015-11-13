const SET = 'product-name/SET';
const SET_SUCCESS = 'product-name/SET_SUCCESS';
const SET_FAIL = 'product-name/SET_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        loading: true
      };
    case SET_SUCCESS:
      return {
        ...state,
        loading: false,
        productName: action.result
      };
    case SET_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}


export function set(productName) {
  return {
    types: [SET, SET_SUCCESS, SET_FAIL],
    promise: (client) => client.post('/storeProductName', {
      data: {
        productName
      }
    })
  };
}
