import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'components/Button';
import Link from 'components/Link';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import actionWithCustomers from '../reducers/actionsWithCustomer'

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

  useEffect(() => {
    console.log("1")
    dispatch(actionWithCustomers.fetchCustomers());
  }, [])

  useEffect(() => {
    console.log("2")
    setList(store.list);
  }, [store.list])

  return (

      <div className={classes.container}>
        {canSeeList && listCustomer.map((item, index) => (
            <div>
              <Typography key={item.id}>
                {item.id}. {item.name}
              </Typography>
              <Button>edit</Button>
              <Button onClick={() => {
                dispatch(actionWithCustomers.fetchDeleteCustomer(item.id))
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