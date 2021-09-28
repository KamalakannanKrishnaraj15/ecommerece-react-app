import UserActionTypes from './user.types';

const initialState = {
  currentUser: null,
  isFetching: false,
  errorMessage: null,
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case UserActionTypes.EMAIL_SING_IN_START:
    case UserActionTypes.GOOGLE_SIGN_IN_START: 
    case UserActionTypes.SIGN_UP_START: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case UserActionTypes.SIGN_IN_SUCCESS: {
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: null,
        isFetching: false,
      };
    }
    case UserActionTypes.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        currentUser: null,
        errorMessage: null,
        isFetching: false,
      };
    }
    case UserActionTypes.SIGN_IN_FAILURE: 
    case UserActionTypes.SIGN_OUT_FAILURE: 
    case UserActionTypes.SIGN_UP_FAILURE: {
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
