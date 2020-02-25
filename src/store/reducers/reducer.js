import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_COST = {
    salad: 0.25,
    cheese: 0.50,
    meat: 1.35,
    bacon: 0.90
};

const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0, 
        cheese: 0
    },
    totalPrice: 2.50

}

const reducer = (state = initialState, action)=> {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return {
                //This double spread operator is necessary to copy the entire object
                ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }, 
                totalPrice: state.totalPrice + INGREDIENT_COST[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return{
                //The [action.ingredientName] is the action payload we are receiving from the component
                ...state, 
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                }, 
                totalPrice: state.totalPrice - INGREDIENT_COST[action.ingredientName]
            }
        default: 
            return state;
            
    }
}

export default reducer;