import Immutable from 'immutable';

const defaultState = new Immutable.List();

export default function testReducer(state = defaultState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
