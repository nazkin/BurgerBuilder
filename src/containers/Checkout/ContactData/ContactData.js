import React, { Component } from 'react';
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axiosrequests";
import Spinner from "../../../components/Spinner/Spinner";
/**
* @author
* @class ContactData
**/

class ContactData extends Component {
 state = {
     name: "",
     email: "",
     address: {
         street: "",
         zip: ""
     }, 
     loading: false
 }

 handleOrders = (e)=> {
    e.preventDefault();
    console.log(this.props.ingredients);

         this.setState({
            loading: true
        });
        const orderObject = {
            ingredients: this.state.ingredients, 
            price: this.props.price, 
            deliveryMethod: 'fastest', 
            customer: {
                name: 'Naz', 
                address: {
                    street: '100 test rd',
                    zip: '48618',
                    Country: 'Canada'
                },
                email: 'test@test.com'
            }
        }
        axios.post('/order.json', orderObject)
            .then(response => {
                this.setState({
                    laoding: false    
                });
                this.props.history.push("/");
            })
            .catch(err=> {
                this.setState({
                    laoding: false,             
                });
                console.log(err);
            });
 }
 render() {
        let form = (
            <form>
                <h3>Enter your contact information</h3>
                <label>Name</label>
                <input className={classes.Input} type="text"  name="name" placeholder="Enter your name"/>
                <label>E-mail</label>
                <input className={classes.Input} type="email" name="email" placeholder="Enter your email"/>
                <label>Street</label>
                <input className={classes.Input} type="text"  name="street" placeholder="Enter your street"/>
                <label>Postal Code</label>
                <input className={classes.Input} type="text"  name="zip" placeholder="Enter your postal code"/>
                <Button clicked={this.handleOrders} btnType="Success" type="submit">Order</Button>
            </form>
            );
        if(this.state.loading){
            form = <Spinner />;
        }

  return(
   <div className={classes.ContactData}>
        {form}
   </div>
    )
   }
 }



export default ContactData;