import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/Controls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_COST = {
    salad: 0.25,
    cheese: 0.50,
    meat: 1.35,
    bacon: 0.90
};

class BurgaBuilda extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {...};
    // }

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0, 
            meat: 0
        },
        totalPrice: 2.50, 
        canPurchase: false,
        isPurchasing: false
    }

    isPurchasingHandler = () => {
        this.setState({isPurchasing: true});
    }

    purchaseStateController = (updatedIngredients) => {
        const ingredients = {
            ...updatedIngredients
        }
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({canPurchase: sum > 0});
    }
    cancelPurchaseHandler = () => {
        this.setState({isPurchasing: false})
    }

    continuePurchaseHandler = () => {
        alert("You are going to continue to checkout");
    }
    
    
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updateCount;

        const priceChange = INGREDIENT_COST[type];
        const oldPrice = this.state.totalPrice;
        const updatePrice = oldPrice + priceChange;

        this.setState({totalPrice: updatePrice, ingredients: updateIngredients});
        this.purchaseStateController(updateIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        } else {
            const updateCount = oldCount - 1;
            const updateIngredients = {
                ...this.state.ingredients
            };
            updateIngredients[type] = updateCount;
    
            const priceChange = INGREDIENT_COST[type];
            const oldPrice = this.state.totalPrice;
            const updatePrice = oldPrice - priceChange;
            this.setState({totalPrice: updatePrice, ingredients: updateIngredients});
            this.purchaseStateController(updateIngredients);
        }

    }

    render() {
        const infoFilter = {
            ...this.state.ingredients
        };
        for(let key in infoFilter){
            infoFilter[key] = infoFilter[key] <= 0;
        }
        //will return: {salad: true, bacon: false, ...}
        
        return(
           <Aux>
              <Modal
               show        = {this.state.isPurchasing}
               modalClosed = {this.cancelPurchaseHandler}>
                  <OrderSummary
                   purchaseContinue = {this.continuePurchaseHandler}
                   purchaseCancel   = {this.cancelPurchaseHandler}
                   ingredients      = {this.state.ingredients}
                   cost             = {this.state.totalPrice} />
              </Modal>
              <Burger ingredients = {this.state.ingredients}/> 
              <BuildControls 
                addedIngredient   = {this.addIngredientHandler}
                removedIngredient = {this.removeIngredientHandler}
                infoFilter        = {infoFilter}
                price             = {this.state.totalPrice}
                purchaseable      = {this.state.canPurchase}
                ordered           = {this.isPurchasingHandler}
                />
           </Aux>
        );
    }
}

export default BurgaBuilda;