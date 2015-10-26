const LOAD = 'questions/LOAD';
const LOAD_SUCCESS = 'questions/LOAD_SUCCESS';
const LOAD_FAIL = 'questions/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function questions(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        questions: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.questions && globalState.questions.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/questions')
  };
}
