import {
  ERROR_RECEIVE_CUSTOMERS,
  RECEIVE_CUSTOMERS,
  REQUEST_CUSTOMERS,

  ERROR_RECEIVE_DELETE_CUSTOMER,
  RECEIVE_DELETE_CUSTOMER,
  REQUEST_DELETE_CUSTOMER,

} from './actionTypes';

const errorReceiveCustomers = () => ({
  type: ERROR_RECEIVE_CUSTOMERS,
});

const receiveCustomers = listOfCustomers => ({
  payload: listOfCustomers,
  type: RECEIVE_CUSTOMERS,
});

const requestCustomers = () => ({
  type: REQUEST_CUSTOMERS,
});

const errorReceiveDeleteCustomer = () => ({
  type: ERROR_RECEIVE_DELETE_CUSTOMER,
});

const receiveDeleteCustomer = customerId => ({
  deletedCustomerId: customerId,
  type: RECEIVE_DELETE_CUSTOMER,
});

const requestDeleteCustomer = () => ({
  type: REQUEST_DELETE_CUSTOMER,
});

const deleteCustomer = (id) => {
  return fetch(`http://localhost:8080/customer/delete/${id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'DELETE',
      },
  )
}

const getCustomers = () => {
  return fetch(
      `http://localhost:8080/customer/getAll`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'GET',
      },
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).catch(() => ([
    {
      "id": 1,
      "name": "Artem",
      "orders": [
        {
          "id": 1,
          "orderNumber": "111",
          "orderName": "sausages"
        }
      ]
    },
    {
      "id": 2,
      "name": "Bogdan",
      "orders": [
        {
          "id": 2,
          "orderNumber": "222",
          "orderName": "potatoes"
        }
      ]
    }
  ]));
};

const fetchCustomers = () => (dispatch) => {
  dispatch(requestCustomers());
  return getCustomers()
  .then(problems => dispatch(receiveCustomers(problems)))
  .catch(() => dispatch(errorReceiveCustomers()));
};

const fetchDeleteCustomer = (id) => (dispatch) => {
  dispatch(requestDeleteCustomer());
  return deleteCustomer(id)
  .then(() => dispatch(receiveDeleteCustomer(id)))
  .catch(() => dispatch(errorReceiveDeleteCustomer()));
};

export default {fetchCustomers, fetchDeleteCustomer};