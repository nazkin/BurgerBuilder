import React from 'react';
import classes from './BuildControlCenter.css';

const buildControlCenter = (props) => (
    <div className={classes.BuildControlCenter}> 
        <div className={classes.Label}>{props.ingredientLabel}</div>
        <button className={classes.More}>More</button>
        <button className= {classes.Less}>Less</button>
    </div>
);

export default buildControlCenter;