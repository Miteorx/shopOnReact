import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Button from 'components/Button';
import TextField from 'components/TextField';
import Typography from 'components/Typography';
import useAccessValidate from 'hooks/useAccessValidate';
import actions from '../reducers/actions'
import * as PAGES from "../../../constants/pages";
import Link from "../../../components/Link";

const getClasses = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

const CreateCustomer = ({
  authorities,
}) => {
  const classes = getClasses();

  const canSeeList = useAccessValidate({
    ownedAuthorities: authorities,
    neededAuthorities: ['МОЖНО_ВОТ_ЭТУ_ШТУКУ'],
  });

  const dispatch = useDispatch();

  const [customerName, setCustomerName] = useState('');

  useEffect(() => {
    console.log(customerName);
  }, [customerName])

  return (
      <div className={classes.container}>
        <TextField
            label="Select Customer name"
            variant="standard"
            value={customerName}
            onChange={event => setCustomerName(event.target.value)}
        /><br/>
        <Link to={location => ({
          ...location,
          pathname: `/${PAGES.SHOP}`,
          search: `${location.search}`,
        })}>
          <Button variant="outlined" onClick={() => {
            dispatch(actions.fetchCreateCustomer(customerName))
          }}>Create</Button>
        </Link>
        {!canSeeList && (
            <Typography>
              Не могу ничего показать :(
            </Typography>
        )}
      </div>
  )
};

export default CreateCustomer;