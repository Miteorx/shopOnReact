import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  BrowserRouter,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import IntlProvider from 'components/IntlProvider';
import Header from 'components/Header';
import PageInitial from 'pageProviders/Initial';
import PageLogin from 'pageProviders/Login';
import PageShop from 'pageProviders/Shop';
import PageCreateCustomer from 'pageProviders/CreateCustomer'
import * as PAGES from 'constants/pages';
import {
  fetchUser,
} from '../actions/user';

const App = () => {
  const [state, setState] = useState({
    componentDidMount: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    setState(prevState => ({
      ...prevState,
      componentDidMount: true,
    }));
  }, []);

  return (
      <BrowserRouter>
        <IntlProvider>
          <Header/>
          {state.componentDidMount && (
              <Switch>
                <Route path={`/${PAGES.LOGIN}`}>
                  <PageLogin/>
                </Route>
                <Route path={`/${PAGES.INITIAL}`}>
                  <PageInitial/>
                </Route>
                <Route path={`/${PAGES.SHOP}`}>
                  <PageShop/>
                </Route>
                <Route path={`/${PAGES.CREATE_CUSTOMER}`}>
                  <PageCreateCustomer/>
                </Route>

                <Redirect from="*" to={`/${PAGES.INITIAL}`}/>
              </Switch>
          )}
        </IntlProvider>
      </BrowserRouter>
  );
};

export default App;
