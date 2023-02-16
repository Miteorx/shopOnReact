import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'components/Button';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import actions from '../reducers/actions'
import actionsFromCreate from 'pages/CreateCustomer/reducers/actions'
import * as PAGES from 'constants/pages';
import Link from "../../../components/Link";

const getClasses = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Shop = ({
  authorities,
}) => {
  const classes = getClasses();
  const store = useSelector(({reducer}) => reducer);
  const dispatch = useDispatch();

  const [listCustomer, setList] = useState([]);

  const canSeeList = useAccessValidate({
    ownedAuthorities: authorities,
    neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
  });
  const [updated, setUpdate] = useState(false);

  useEffect(() => {
    console.log("1")
    dispatch(actions.fetchCustomers());
    setUpdate(true);
  }, [])

  useEffect(() => {
    console.log("2")
    if (updated === true) {
      console.log("inside")
      dispatch(actions.fetchCustomers());
      setUpdate(false);
    }
    setList(store.list);
  }, [store.list])

  return (

      <div className={classes.container}>
        <div>
          <Link to={location => ({
            ...location,
            pathname: `/${PAGES.CREATE_CUSTOMER}`,
            search: `${location.search}`,
          })
          }>
            <Button variant="outlined">Create new customer</Button>
          </Link>
        </div>


        {canSeeList && listCustomer.map((item, index) => (
            <div>
              <Typography key={item.id}>
                {item.id}. {item.name}
              </Typography>
              <Button>edit</Button>
              <Button onClick={() => {
                dispatch(actions.fetchDeleteCustomer(item.id))
                console.log("Deleted : " + item.name)
              }}>delete</Button>
            </div>

        ))}
        {!canSeeList && (
            <Typography>
              Не могу ничего показать :(
            </Typography>
        )}
      </div>
  )
};

export default Shop;