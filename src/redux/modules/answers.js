const GET = 'answers/GET';
const GET_SUCCESS = 'answers/GET_SUCCESS';
const GET_FAIL = 'answers/GET_FAIL';
const STORE = 'answers/STORE';
const STORE_SUCCESS = 'answers/STORE_SUCCESS';
const STORE_FAIL = 'answers/STORE_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET:
      return {
        ...state,
        loading: true
      };
    case GET_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        answers: action.result
      };
    case GET_FAIL:
      return {
        ...state,
        loading: false
      };
    case STORE:
      return {
        ...state,
        loading: true
      };
    case STORE_SUCCESS:
      return {
        ...state,
        loaded: true,
        loading: false,
        answers: action.result
      };
    case STORE_FAIL:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.answers && globalState.answers.loaded;
}

export function load() {
  return {
    types: [GET, GET_SUCCESS, GET_FAIL],
    promise: (client) => client.get('/getAnswers')
  };
}

export function storeAnswer(data) {
  return {
    types: [STORE, STORE_SUCCESS, STORE_FAIL],
    promise: (client) => client.post('/storeAnswer', {
      data
    })
  };
}
