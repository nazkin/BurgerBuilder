import React from 'react';
import classes from './BuildControlCenter.css';

const buildControlCenter = (props) => (
    <div className={classes.BuildControlCenter}> 
        <div className={classes.Label}>{props.ingredientLabel}</div>
        {/* + button */}
        <button
        onClick = {props.added} 
        className={classes.More}>

        More</button>
        {/* - button */}
        <button
        disabled = {props.filtered} 
        onClick = {props.removed}
        className= {classes.Less}>
       
        Less</button>
    </div>
);

export default buildControlCenter;