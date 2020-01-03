import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredientList = Object.keys(props.ingredients)
          .map(igKey => {
              return (

                 <li key={igKey}> {igKey}: {props.ingredients[igKey]} </li>
            )
    });

    return (
        
        <Aux>
            <h3>Your Order</h3>
            <p>Here are the components of your delicious burger...looking tasty</p>
            <ul>
                {ingredientList}
            </ul>
            <p>Total Price: <strong>${props.cost.toFixed(2)}</strong></p>
            <Button btnType ="Danger" clicked={props.purchaseCancel}>Cancel</Button>
            <Button btnType ="Success" clicked={props.purchaseContinue}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;