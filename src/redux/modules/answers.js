const STORE = 'answers/STORE';
const STORE_SUCCESS = 'answers/STORE_SUCCESS';
const STORE_FAIL = 'answers/STORE_FAIL';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case STORE:
      // state[action.id - 1] = {id: action.id - 1, value: action.value};
      return {
        ...state
      };
    case STORE_SUCCESS:
      return {
        ...state
      };
    case STORE_FAIL:
      return {
        ...state
      };
    default:
      return state;
  }
}

export function storeAnswer(data) {
  return {
    types: [STORE, STORE_SUCCESS, STORE_FAIL],
    promise: (client) => client.post('/storeAnswer', {
      data
    })
  };
}
