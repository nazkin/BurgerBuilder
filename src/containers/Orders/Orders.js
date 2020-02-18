import React, { Component } from 'react'
import Order from "../../components/Order/Order";
import axios from "../../axiosrequests";
import withErrorHandler from '../../hoc/errorHandler/errorHandler';
/**
* @author
* @class Orders
**/

class Orders extends Component {
 state = {
     orders: [],
     loading: true
 }

 componentDidMount(){
    axios.get('/order.json')
        .then(res=>{
            const fetchedOrders=[];
            for (let key in res.data){
                fetchedOrders.push({
                   ...res.data[key],
                   id: key 
                });
            }
         
            this.setState({loading: false, orders: fetchedOrders});
        }).catch(err=> {
            this.setState({loading: false});
            console.log(err);
        });
 }
 render() {
  return(
   <div>
       {this.state.orders.map(order => (
            <Order key={order.id} name={order.customer.name} address= {order.customer.address}price={order.price} />
       ))}
      
   </div>
    )
   }
 }



export default withErrorHandler(Orders, axios);