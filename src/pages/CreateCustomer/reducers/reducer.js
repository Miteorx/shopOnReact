import {
  ERROR_RECEIVE_CREATE_CUSTOMER,
  RECEIVE_CREATE_CUSTOMER,
  REQUEST_CREATE_CUSTOMER,

} from './actionTypes';

const initialState = {
  list: [],
  isFailed: false,
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR_RECEIVE_CREATE_CUSTOMER: {
      return {
        ...state,
        isFailed: true,
        isFetching: false,
      };
    }

    case RECEIVE_CREATE_CUSTOMER: {
      return {
        ...state,
        isFetching: false,
        list: action.payload,
      };
    }

    case REQUEST_CREATE_CUSTOMER: {
      return {
        ...state,
        isFetching: true,
        isFailed: false,
      };
    }

    default:
      return state;
  }
}