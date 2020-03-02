import React, { Component } from 'react'
import Order from "../../components/Order/Order";
import axios from "../../axiosrequests";
import withErrorHandler from '../../hoc/errorHandler/errorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/Spinner/Spinner';

/**
* @author
* @class Orders
**/

class Orders extends Component {


 componentDidMount(){
     this.props.onFetchOrders(this.props.token);
  
 }
 render() {
     let orders = <Spinner />;
     if(!this.props.loading){
         orders = (this.props.orders.map(order => {
             if(order.userId == this.props.userId){
                return(
                    <Order key={order.id}
                           price={order.price} 
                           />)
             }
        }
    ))
         
}
  return(
   <div>
        {orders}   
   </div>
    )
   }
 }
const mapStateToProps = (state)=> {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        onFetchOrders: (token)=> {dispatch(actions.fetchOrders(token))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));