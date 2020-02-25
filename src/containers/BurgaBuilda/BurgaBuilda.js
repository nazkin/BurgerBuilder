import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/Controls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axiosrequests';
import Spinner from '../../components/Spinner/Spinner';
import ErrorHandler from '../../hoc/errorHandler/errorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';



class BurgaBuilda extends Component {


    state = {
        isPurchasing: false, 
        loading: false
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
            return sum > 0
    }


    cancelPurchaseHandler = () => {
        this.setState({isPurchasing: false})
    }

    continuePurchaseHandler = () => {
        // const queryParams = [];
        // //Loop through my state.ingredients object
        // //Retrieve each ingredient, encode it in our url and add to queryParams array
        // //We are essentially creating a URI query manually and passing it to a route
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push("price="+this.state.totalPrice);
        // //returns [bacon=1, salad=1, etc]
        // const queryString = queryParams.join("&");
        // //returns bacon=1&salad=1 etc
    //    this.props.history.push({
    //        pathname: "/checkout",
    //        search: "?"+ queryString
    //    }); 
       
       this.props.history.push('/checkout');
    }
    
    render() {
        const infoFilter = {
            ...this.props.ings
        };
        for(let key in infoFilter){
            infoFilter[key] = infoFilter[key] <= 0;
        }
        //will return: {salad: true, bacon: false, ...}
        let summaryOfOrder =     <OrderSummary
                                         purchaseContinue = {this.continuePurchaseHandler}
                                         purchaseCancel   = {this.cancelPurchaseHandler}
                                         ingredients      = {this.props.ings}
                                         cost             = {this.props.price} />;

        if(this.state.loading === true){
           summaryOfOrder =  <Spinner />;
        }
        return(
           <Aux>
              <Modal
               show        = {this.state.isPurchasing}
               modalClosed = {this.cancelPurchaseHandler}>
                   {/* spinner or order summary depending on loading state */}
                   {summaryOfOrder} 
              </Modal>
              <Burger ingredients = {this.props.ings}/> 
              <BuildControls 
                addedIngredient   = {this.props.onIngredientAdded}
                removedIngredient = {this.props.onIngredientRemoved}
                infoFilter        = {infoFilter}
                price             = {this.props.price}
                purchaseable      = {this.purchaseStateController(this.props.ings)}
                ordered           = {this.isPurchasingHandler}
                />
           </Aux>
        );
    }
}

const mapStateToProps = (state)=>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps =(dispatch)=> {
    return{
        onIngredientAdded: (name)=> dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: name}),
        onIngredientRemoved: (name)=> dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: name})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgaBuilda, axios));