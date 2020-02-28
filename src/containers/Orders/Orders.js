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
//  state = {
//      orders: [],
//      loading: true
//  }

 componentDidMount(){
     this.props.onFetchOrders();
    // axios.get('/order.json')
    //     .then(res=>{
    //         const fetchedOrders=[];
    //         for (let key in res.data){
    //             fetchedOrders.push({
    //                ...res.data[key],
    //                id: key 
    //             });
    //         }
         
    //         this.setState({loading: false, orders: fetchedOrders});
    //     }).catch(err=> {
    //         this.setState({loading: false});
    //         console.log(err);
    //     });
 }
 render() {
     let orders = <Spinner />;
     if(!this.props.loading){
         orders = (this.props.orders.map(order => (
                <Order key={order.id}
                       price={order.price} />)
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
        loading: state.order.loading
    }
}
const mapDispatchToProps = (dispatch)=> {
    return {
        onFetchOrders: ()=> {dispatch(actions.fetchOrders())}
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));