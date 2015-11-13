const LOAD = 'matrix/LOAD';
const LOAD_SUCCESS = 'matrix/LOAD_SUCCESS';
const LOAD_FAIL = 'matrix/LOAD_FAIL';

const LOAD_BY_ANSWERS = 'matrix/LOAD_BY_ANSWERS';
const LOAD_BY_ANSWERS_SUCCESS = 'matrix/LOAD_BY_ANSWERS_SUCCESS';
const LOAD_BY_ANSWERS_FAIL = 'matrix/LOAD_BY_ANSWERS_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
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
        matrix: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case LOAD_BY_ANSWERS:
      return {
        ...state,
        loading: true
      };
    case LOAD_BY_ANSWERS_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        matrixByAnswers: action.result
      };
    case LOAD_BY_ANSWERS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        errorByAnswers: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.matrix && globalState.matrix.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/matrix')
  };
}

export function loadByAnswers(answers) {
  return {
    types: [LOAD_BY_ANSWERS, LOAD_BY_ANSWERS_SUCCESS, LOAD_BY_ANSWERS_FAIL],
    promise: (client) => client.post('/matrix', {
      data: {
        answers: answers
      }
    })
  };
}
