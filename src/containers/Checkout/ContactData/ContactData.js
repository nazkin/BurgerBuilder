import React, { Component } from 'react';
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../axiosrequests";
import Spinner from "../../../components/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import {connect} from "react-redux";
import withErrorHandler from '../../../hoc/errorHandler/errorHandler';
import * as actions from '../../../store/actions/index';
/**
* @author
* @class ContactData
**/

class ContactData extends Component {
 state = {
    orderForm: {
        name: {
            inputtype: "input",
            elementconfig: {
                type: "text",
                placeholder: "Enter your name"
            }, 
            value: ""
        },       
        street: {
            inputtype: "input",
            elementconfig: {
                type: "text",
                placeholder: "Enter your street"
            },
            value: ""
        },
        zip: {
            inputtype: "input",
            elementconfig: {
                type: "text",
                placeholder: "Enter your postal code"
            },
            value: ""
        },
        Country: {
            inputtype: "input",
            elementconfig: {
                type: "text",
                placeholder: "Enter your country"
            },
            value: ""
        },       
        email:{
            inputtype: "input",
            elementconfig: {
                type: "email",
                placeholder: "Enter your email"
            },
            value: ""
        },
        deliveryMethod: {
            inputtype: "select",
            elementconfig: {
                options: [{value: "fastest", displayvalue: "Fastest"},{value: "regular", displayvalue: "Regular"}]
            },
            value:"fastest"
        }
    }
    // loading: false
 }
    inputChangedHandler = (e, inputIdentity)=> {
        console.log(e.target.value);
        const formUpdatedA = {
            ...this.state.orderForm
        };
        const formUpdatedB ={
            ...formUpdatedA[inputIdentity]
        };
        formUpdatedB.value = e.target.value;
        formUpdatedA[inputIdentity]= formUpdatedB;
        this.setState({
            orderForm: formUpdatedA
        });
    }

 handleOrders = (e)=> {
    e.preventDefault();
    console.log(this.props.ingredients);

        //  this.setState({
        //     loading: true
        // });
        const formData= {};
        for(let formElementId in this.state.orderForm){
            formData[formElementId] = this.state.orderForm[formElementId].value;
        }
        const orderObject = {
            price: this.props.price,
            orderData: formData
        }
        this.props.onBurgerOrder(orderObject);
 }
 render() {
        const formElementsArr = [];
        for(let key in this.state.orderForm){
            formElementsArr.push({
                id: key, 
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.handleOrders}> 
                {
                    formElementsArr.map(el=> (
                        <Input  key={el.id}
                                inputtype={el.config.inputtype}
                                elementconfig={el.config.elementconfig}
                                value={el.config.value}
                                changed={(e)=> this.inputChangedHandler(e, el.id)}/>
                    ))
                }
                <Button btnType="Success" type="submit">Order</Button>
            </form>
            );
        if(this.props.loading){
            form = <Spinner />;
        }

  return(
   <div className={classes.ContactData}>
        {form}
   </div>
    )
   }
 }
const mapStateToProps = (state)=> {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch=> {
    return{
        onBurgerOrder: (orderData)=> dispatch(actions.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));