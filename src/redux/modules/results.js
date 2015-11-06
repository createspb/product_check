const LOAD = 'results/LOAD';
const LOAD_SUCCESS = 'results/LOAD_SUCCESS';
const LOAD_FAIL = 'results/LOAD_FAIL';
const REMOVE = 'results/REMOVE';
const REMOVE_SUCCESS = 'results/REMOVE_SUCCESS';
const REMOVE_FAIL = 'results/REMOVE_FAIL';

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
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case REMOVE:
      return {
        ...state,
        loading: true
      };
    case REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case REMOVE_FAIL:
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
  return globalState.results && globalState.results.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/results')
  };
}

export function remove(id) {
  return {
    types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
    promise: (client) => client.del('/results/', {
      data: { id }
    })
  };
}
