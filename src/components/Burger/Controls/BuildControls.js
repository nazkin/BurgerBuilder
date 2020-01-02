import React from 'react';
import classes from './BuildControls.css';
import BuildControlCenter from './BuildControlCenter/BuildControlCenter';

const controllerValues = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {
            controllerValues.map(control => {
                return <BuildControlCenter key={control.label} ingredientLabel={control.label} /> ;
            })
        }
    </div>
)

export default buildControls;