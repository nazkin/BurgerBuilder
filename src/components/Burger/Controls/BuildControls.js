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
        <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        {
            controllerValues.map(control => {

                return <BuildControlCenter 

                key={control.label}
                ingredientLabel={control.label}
                added = {()=>props.addedIngredient(control.type)}
                removed = {()=> props.removedIngredient(control.type)}
                filtered = {props.infoFilter[control.type]}
                /> ;
            })
        }
        <button
         onClick = {props.ordered}
         disabled = {!props.purchaseable}
         className={classes.OrderButton}>
        
            PLACE ORDER NOW !!!</button>
    </div>
)

export default buildControls;