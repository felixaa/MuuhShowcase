import { REHYDRATE } from 'redux-persist/constants'

export type State = {
  initialRoute: ?string;
};

const initialState = {
  initialRoute: null
};

function navigation(state = initialState, action) {

  return state;
}


module.exports = navigation;
