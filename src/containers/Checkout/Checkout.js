import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/checkoutSummary/CheckoutSummary';
import {Route} from "react-router-dom";
import ContactData from './ContactData/ContactData';
/**
* @author
* @class Checkout
**/

class Checkout extends Component {
  // the ingredients in the state are dummy and will be replaced via routing
 state = {
   ingredients: null,
   totalPrice: 0
 }
componentWillMount(){
  const query = new URLSearchParams(this.props.location.search);
  const ingredients = {};
  let price = 0;
  for(let param of query.entries()){
    if(param[0]==="price"){
      price = param[1];
    }else{
      ingredients[param[0]] = +param[1];
    }
  
  }
  this.setState({
    ingredients: ingredients, 
    totalPrice: price
  });
}

 checkoutCancelledHandler = () => {
  this.props.history.goBack();
}

checkoutContinuedHandler = () => {
  this.props.history.replace('/checkout/contact-data');
}
 render() {
  return(
   <div>
     <CheckoutSummary
      checkoutCancelled = {this.checkoutCancelledHandler}
      checkoutContinued = {this.checkoutContinuedHandler}
      ingredients={this.state.ingredients}/>
     <Route path={this.props.match.path +"/contact-data" }
            //using render instead of component allows me to pass props to contact data
            // this will allow me to send a complete POST request to my server
            render = {(props)=> (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
     />
   </div>
    )
   }
 }



export default Checkout;