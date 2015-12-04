const SEND = 'feedback/SEND';
const SEND_SUCCESS = 'feedback/SEND_SUCCESS';
const SEND_FAIL = 'feedback/SEND_FAIL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SEND:
      return {
        sending: true,
      };
    case SEND_SUCCESS:
      return {
        sending: false,
        result: action.result
      };
    case SEND_FAIL:
      return {
        sending: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function send(data) {
  return {
    types: [SEND, SEND_SUCCESS, SEND_FAIL],
    promise: (client) => client.post('/send', {
      data: {
        ...data
      }
    })
  };
}
