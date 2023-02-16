import {
  ERROR_RECEIVE_CREATE_CUSTOMER,
  RECEIVE_CREATE_CUSTOMER,
  REQUEST_CREATE_CUSTOMER,

} from './actionTypes';

const errorReceiveCreateCustomers = () => ({
  type: ERROR_RECEIVE_CREATE_CUSTOMER,
});

const receiveCreateCustomers = listOfCustomers => ({
  payload: listOfCustomers,
  type: RECEIVE_CREATE_CUSTOMER,
});

const requestCreateCustomers = () => ({
  type: REQUEST_CREATE_CUSTOMER,
});



const createCustomer = (customerName) => {
  const jsonRequest = {
    name: customerName
  };

  return fetch(`http://localhost:8080/customer/save`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        method: 'POST',
        body: JSON.stringify(jsonRequest)
      },
  )
}

const fetchCreateCustomer = (customerName) => (dispatch) => {
  dispatch(requestCreateCustomers());
  return createCustomer(customerName)
  .then(() => dispatch(receiveCreateCustomers(customerName)))
  .catch(() => dispatch(errorReceiveCreateCustomers()));
};

export default {fetchCreateCustomer}