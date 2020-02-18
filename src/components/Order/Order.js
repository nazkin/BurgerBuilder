import React from 'react';
import classes from './Order.css';
/**
* @author
* @function order
**/

const order = (props) => {
 
  return(
    <div className={classes.Order}>
        <p>Name: {props.name}</p>
        <p>Street: {props.address.street}</p>
        <p>Postal Code: {props.address.zip}</p>
        <p>Country: {props.address.Country}</p>
        <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
   )

 }

export default order;