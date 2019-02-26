import { REHYDRATE } from 'redux-persist/constants'

export type State = {
  initialRoute: ?string;
};

const initialState = {
  initialRoute: null,
  statusBar: true
};

function navigation(state = initialState, action) {

  if (action.type == 'TOGGLE_STATUS_BAR') {
    return {
      ...state,
      statusBar: action.hidden
    }
  }

  return state;
}


module.exports = navigation;
