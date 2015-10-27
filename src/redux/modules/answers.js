const STORE = 'answers/STORE';

const initialState = {
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case STORE:
      state[action.id] = {id: action.id, value: action.value};
      return {
        ...state
      };
    default:
      return state;
  }
}

export function storeAnswer(data) {
  return {
    type: STORE,
    ...data
  };
}
