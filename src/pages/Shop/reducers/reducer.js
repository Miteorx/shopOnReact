import {
  ERROR_RECEIVE_CUSTOMERS,
  RECEIVE_CUSTOMERS,
  REQUEST_CUSTOMERS,

  ERROR_RECEIVE_DELETE_CUSTOMER,
  RECEIVE_DELETE_CUSTOMER,
  REQUEST_DELETE_CUSTOMER
} from './actionTypes';

const initialState = {
  list: [],
  isFailed: false,
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ERROR_RECEIVE_CUSTOMERS: {
      return {
        ...state,
        isFailed: true,
        isFetching: false,
      };
    }

    case RECEIVE_CUSTOMERS: {
      return {
        ...state,
        isFetching: false,
        list: action.payload,
      };
    }

    case REQUEST_CUSTOMERS: {
      return {
        ...state,
        isFetching: true,
        isFailed: false,
      };
    }

    case ERROR_RECEIVE_DELETE_CUSTOMER: {
      return {
        ...state,
        isFailed: true,
        isFetching: false,
      };
    }

    case RECEIVE_DELETE_CUSTOMER: {
      const filteredCustomer = state.list.filter((customer) => customer.id !== action.deletedCustomerId)
      return {
        ...state,
        isFetching: false,
        list: filteredCustomer

      };
    }

    case REQUEST_DELETE_CUSTOMER: {
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