import React from 'react';
import classes from './Order.css';
/**
* @author
* @function order
**/

const order = (props) => {
 
  return(
    <div className={classes.Order}>
        <p>Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
   )

 }

export default order;