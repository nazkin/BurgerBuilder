import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/checkoutSummary/CheckoutSummary';
import {Route, Redirect} from "react-router-dom";
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

/**
* @author
* @class Checkout
**/

class Checkout extends Component {
  // the ingredients in the state are dummy and will be replaced via routing

 checkoutCancelledHandler = () => {
  this.props.history.goBack();
}

checkoutContinuedHandler = () => {
  this.props.history.replace('/checkout/contact-data');
}
 render() {
    const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
  return(
    
   <div>
     {purchasedRedirect}
     <CheckoutSummary
      checkoutCancelled = {this.checkoutCancelledHandler}
      checkoutContinued = {this.checkoutContinuedHandler}
      ingredients={this.props.ings}/>
     <Route path={this.props.match.path +"/contact-data" }
            //using render instead of component allows me to pass props to contact data
            // this will allow me to send a complete POST request to my server
          component= {ContactData}
     />
   </div>
    )
   }
 }

const mapStateToProps = (state)=> {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  }
}


export default connect(mapStateToProps)(Checkout);